"use client";

import { useEffect } from "react";

import { useMediaQuery } from "usehooks-ts";
import { useSidebar } from "../hooks/use-sidebar";

import { cn } from "@/lib/utils";

type Props = {
    children: React.ReactNode;
};

export const Container = ({ children }: Props) => {
    const { collapsed, onCollapse, onExpand } = useSidebar();
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
