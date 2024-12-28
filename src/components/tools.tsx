"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Hint } from "@/components/hint";
import {
    AlarmClockCheck,
    BookOpen,
    DraftingCompass,
    ListCollapse,
    MessageCircleMore,
    SquareArrowOutUpRight,
    SquareTerminal,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { useSidebar } from "@/stores/use-sidebar";
import { useState } from "react";
import { useIsClient, useMediaQuery } from "usehooks-ts";

export const Tools = () => {
    const { collapsed } = useSidebar();

    const isClient = useIsClient();
    const isMobile = useMediaQuery("(max-width: 1024px)");

    const [open, setOpen] = useState(false);

    const label = "More tools";

    if (!isClient) {
        return null;
    }

    return (
        <div className="mt-auto">
            <DropdownMenu open={open} onOpenChange={() => setOpen(false)}>
                <DropdownMenuTrigger asChild className="group p-3">
                    <div className="w-full">
                        {collapsed && (
                            <Hint label={label} side="right" asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="group-data-[state=open]:bg-accent"
                                    onClick={() => setOpen(true)}
                                >
                                    <SquareArrowOutUpRight />
                                </Button>
                            </Hint>
                        )}
                        {!collapsed && !isMobile && (
                            <Button
                                asChild
                                variant="ghost"
                                onClick={() => setOpen(true)}
                                className={cn(
                                    "h-12 w-full cursor-pointer group-data-[state=open]:bg-accent",
                                    collapsed
                                        ? "justify-center"
                                        : "justify-start",
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex w-full items-center",
                                        collapsed && "justify-center",
                                    )}
                                >
                                    <ListCollapse />
                                    {!collapsed && (
                                        <p className="truncate">More</p>
                                    )}
                                    <SquareArrowOutUpRight className="ml-auto" />
                                </div>
                            </Button>
                        )}
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="right"
                    align="end"
                    className="w-48 border-[#2d2e35] bg-background"
                >
                    <DropdownMenuLabel>Tools</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-2.5" asChild>
                        <Link href={process.env.NEXT_PUBLIC_COURSE_URL!}>
                            <BookOpen />
                            Courses
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-2.5" asChild>
                        <Link href={process.env.NEXT_PUBLIC_FORUM_URL!}>
                            <MessageCircleMore />
                            Forum
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-2.5" asChild>
                        <Link href={process.env.NEXT_PUBLIC_TASK_MANAGER_URL!}>
                            <AlarmClockCheck />
                            Task Manager
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-2.5" asChild>
                        <Link href={process.env.NEXT_PUBLIC_DRAW_APP_URL!}>
                            <DraftingCompass />
                            Drawing App
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-2.5" asChild>
                        <Link href={process.env.NEXT_PUBLIC_EDITOR_URL!}>
                            <SquareTerminal />
                            Code Editor
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
