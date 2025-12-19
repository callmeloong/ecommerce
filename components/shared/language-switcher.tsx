'use client'

import { Globe } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { routing } from "@/i18n/routing";
import { setUserLocale } from "@/i18n/service";

export function LanguageSwitcher() {
    const { locales } = routing;
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon"><Globe /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {locales.map(e => <DropdownMenuRadioItem key={e} value={e} onClick={async () => await setUserLocale(e)}>{e}</DropdownMenuRadioItem>)}
        </DropdownMenuContent>
    </DropdownMenu>
}