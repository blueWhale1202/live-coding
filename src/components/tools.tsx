"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import {
    AlarmClockCheck,
    BookOpen,
    DraftingCompass,
    ListCollapse,
    MessageCircleMore,
    SquareArrowOutUpRight,
    SquareTerminal,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export const Tools = () => {
    return (
        <div className="mt-auto">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className={cn(
                            "h-12 w-full cursor-pointer group-data-[state=open]:bg-accent",
                        )}
                    >
                        <ListCollapse />
                        <SquareArrowOutUpRight className="ml-auto" />
                    </Button>
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
