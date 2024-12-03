"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/providers/sidebar-store-provider";

type Props = {
    children: React.ReactNode;
};

export const Wrapper = ({ children }: Props) => {
    const { collapsed } = useSidebar((state) => state);
    return (
        <aside
            className={cn(
                "fixed left-0 z-50 flex h-full w-60 flex-col border-r border-[#2d2e35] bg-background",
                collapsed && "w-[70px]",
            )}
        >
            {children}
        </aside>
    );
};