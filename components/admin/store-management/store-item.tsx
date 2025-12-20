
import { Ellipsis, PenLine, Plus, PlusCircle, Trash } from "lucide-react";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TStoreItem } from "@/types/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
    store: TStoreItem
}

export default function StoreItem({ store }: Props) {
    const router = useRouter()
    return <Item variant="outline">
        <ItemMedia>
            <Avatar className="size-10">
                <AvatarImage src="https://github.com/evilrabbit.png" />
                <AvatarFallback>ER</AvatarFallback>
            </Avatar>
        </ItemMedia>
        <ItemContent>
            <ItemTitle><Link href={`/${store.slug}/dashboard`}>{store.name}</Link></ItemTitle>
            <ItemDescription>Last seen 5 months ago</ItemDescription>
        </ItemContent>
        <ItemActions>
            <Button
                size="icon-sm"
                variant="outline"
                className="rounded-full"
                aria-label="Invite"
            >
                <PenLine />
            </Button>

            <Button
                size="icon-sm"
                variant="destructive"
                className="rounded-full"
                aria-label="Invite"
            >
                <Trash />
            </Button>
        </ItemActions>
    </Item>
}