import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import { prisma } from "@/prisma";

function getUserIdFromSession(session: any): string | null {
  return (session?.user as any)?.id ?? null;
}

// GET /api/stores -> list stores của current user
export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = getUserIdFromSession(session);

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Guard: session có userId nhưng DB không còn user (hay gặp sau reset DB)
  const userExists = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!userExists) {
    return NextResponse.json(
      { message: "Session không hợp lệ, hãy đăng nhập lại" },
      { status: 401 }
    );
  }

  const memberships = await prisma.storeMember.findMany({
    where: { userId },
    include: { store: true },
    orderBy: { createdAt: "asc" },
  });

  const stores = memberships.map((m) => ({
    id: m.store.id,
    name: m.store.name,
    slug: m.store.slug,
    domain: m.store.domain,
    role: m.role,
    createdAt: m.store.createdAt,
  }));

  return NextResponse.json({ stores });
}

// POST /api/stores -> create store + create StoreMember(OWNER)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = getUserIdFromSession(session);

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userExists = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!userExists) {
    return NextResponse.json(
      { message: "Session không hợp lệ, hãy đăng nhập lại" },
      { status: 401 }
    );
  }

  const body = await req.json().catch(() => null);

  const name = (body?.name ?? "").toString().trim();
  let domainInput = (body?.domain ?? "").toString().trim(); // subdomain: store-domain
  // bạn có thể gửi thêm slug riêng nếu muốn:
  // let slugInput = (body?.slug ?? "").toString().trim();

  if (!name) {
    return NextResponse.json(
      { message: "Store name là bắt buộc" },
      { status: 400 }
    );
  }

  const base = slugify(domainInput || name);
  if (!base) {
    return NextResponse.json(
      { message: "Store domain không hợp lệ" },
      { status: 400 }
    );
  }

  // validate cơ bản cho subdomain
  if (!/^[a-z0-9-]{3,50}$/.test(base)) {
    return NextResponse.json(
      { message: "Store domain không hợp lệ (3-50 ký tự, a-z0-9-)" },
      { status: 400 }
    );
  }

  // đảm bảo domain unique: base, base-1, base-2...
  let finalDomain = base;
  let i = 1;
  while (
    await prisma.store.findUnique({
      where: { domain: finalDomain },
      select: { id: true },
    })
  ) {
    finalDomain = `${base}-${i++}`;
  }

  // slug dùng cho URL nội bộ: ưu tiên giống domain (dễ hiểu)
  const baseSlug = slugify(name) || finalDomain;

  let finalSlug = baseSlug;
  let j = 1;
  while (
    await prisma.store.findUnique({
      where: { slug: finalSlug },
      select: { id: true },
    })
  ) {
    finalSlug = `${baseSlug}-${j++}`;
  }

  try {
    const store = await prisma.$transaction(async (tx) => {
      const createdStore = await tx.store.create({
        data: {
          name,
          slug: finalSlug,
          domain: finalDomain,
        },
      });

      await tx.storeMember.create({
        data: {
          userId,
          storeId: createdStore.id,
          role: "OWNER",
        },
      });

      return createdStore;
    });

    return NextResponse.json(
      {
        message: "Tạo store thành công",
        store: {
          id: store.id,
          name: store.name,
          slug: store.slug,
          domain: store.domain,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    // Unique constraint / race condition vẫn có thể xảy ra rất hiếm
    console.error("Create store error:", err);
    return NextResponse.json(
      { message: "Không tạo được store, vui lòng thử lại" },
      { status: 500 }
    );
  }
}
