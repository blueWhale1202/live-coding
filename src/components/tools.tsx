"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BookOpen } from "lucide-react";

export const Tools = () => {
    return (
        <div className="mt-auto">
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent
                    side="right"
                    align="end"
                    className="w-48 border-[#2d2e35] bg-background"
                >
                    <DropdownMenuLabel>Tools</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-2.5">
                        <a href={process.env.NEXT_PUBLIC_COURSE_URL!}>
                            <BookOpen />
                            Courses
                        </a>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
