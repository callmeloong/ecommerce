import { EmptyData } from "@/components/shared/empty-data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Products() {
    return <><EmptyData action={<Link href={`products/create`}><Button><PlusCircle /> Create fisrt product</Button></Link>} /></>
}