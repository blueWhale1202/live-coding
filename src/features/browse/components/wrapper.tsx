"use client";

import { FollowingSkeleton } from "./following";
import { RecommendedSkeleton } from "./recommended";
import { ToggleSkeleton } from "./toggle";

import { useIsClient } from "usehooks-ts";
import { useSidebar } from "../hooks/use-sidebar";

import { cn } from "@/lib/utils";

type Props = {
    children: React.ReactNode;
};

export const Wrapper = ({ children }: Props) => {
    const { collapsed } = useSidebar();

    const isClient = useIsClient();

    if (!isClient) {
        return (
            <aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2d2e35] bg-background lg:w-60">
                <ToggleSkeleton />
                <FollowingSkeleton />
                <RecommendedSkeleton />
            </aside>
        );
    }

    return (
        <aside
            className={cn(
                "fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2d2e35] bg-background lg:w-60",
                collapsed && "lg:w-[70px]",
            )}
        >
            {children}
        </aside>
    );
};
