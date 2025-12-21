"use client"

import * as React from "react"
import { ChevronDown, ChevronsUpDown, Plus } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useStoreManager } from "@/hooks/use-store-manager"
import { useParams } from "next/navigation"
import StoreDialog from "../admin/store-management/store-dialog"
import Link from "next/link"

export function StoreSwitcher() {
    const { data, isLoading } = useStoreManager()
    if (!data) return;
    const { stores } = data;
    const params = useParams();
    const { isMobile } = useSidebar()
    const storeSlug = params.store
    const activeStore = stores.find(item => item.slug === storeSlug)!

    if (!stores.length) {
        return null
    }


    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                {/* <activeStore.logo className="size-4" /> */}
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{activeStore.name}</span>
                                <span className="truncate text-xs">{activeStore.domain}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-muted-foreground text-xs flex justify-between">
                            Stores
                            <Link href="/stores">View all</Link>
                        </DropdownMenuLabel>
                        {stores.map((team, index) => (
                            <DropdownMenuItem
                                key={team.name}
                                // onClick={() => setActiveTeam(team)}
                                className="gap-2 p-2"
                            >
                                <div className="flex size-6 items-center justify-center rounded-md border">
                                    {/* <team.logo className="size-3.5 shrink-0" /> */}
                                </div>
                                {team.name}
                                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <StoreDialog trigger={<DropdownMenuItem onSelect={e => e.preventDefault()} className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                <Plus className="size-4" />
                            </div>
                            <div className="text-muted-foreground font-medium">Add team</div>
                        </DropdownMenuItem>} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
