import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;
    console.log(body);

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email và mật khẩu là bắt buộc" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Email đã tồn tại" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);
    console.log({
      email,
      password: hashedPassword,
      name,
    });

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return NextResponse.json({ message: "Đăng ký thành công" });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
