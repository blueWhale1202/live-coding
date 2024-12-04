"use client";

import { useMediaQuery } from "usehooks-ts";
import { useCreatorSidebar } from "../hooks/use-sidebar-creator";

import { cn } from "@/lib/utils";
import { useEffect } from "react";

type Props = {
    children: React.ReactNode;
};

export const Container = ({ children }: Props) => {
    const { collapsed, onCollapse, onExpand } = useCreatorSidebar();
    const isMobile = useMediaQuery("(max-width: 1024px)");

    useEffect(() => {
        if (isMobile) {
            onCollapse();
        } else {
            onExpand();
        }
    }, [isMobile, onCollapse, onExpand]);

    return (
        <div className={cn("ml-[70px] flex-1", !collapsed && "lg:ml-60")}>
            {children}
        </div>
    );
};
