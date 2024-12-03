"use client";

import { useSidebar } from "@/providers/sidebar-store-provider";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useEffect } from "react";

type Props = {
    children: React.ReactNode;
};

export const Container = ({ children }: Props) => {
    const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
    const isMobile = useMediaQuery("(max-width: 1024px)");

    useEffect(() => {
        if (isMobile) {
            onCollapse();
        } else {
            onExpand();
        }
    }, [isMobile, onCollapse, onExpand]);
    return (
        <div className={cn("ml-[70px] flex-1", collapsed && "lg:ml-60")}>
            Container
        </div>
    );
};
