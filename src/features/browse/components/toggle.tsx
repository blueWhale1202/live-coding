"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/providers/sidebar-store-provider";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export const Toggle = () => {
    const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

    const label = collapsed ? "Expand" : "Collapse";

    return (
        <>
            {collapsed && (
                <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
                    <Hint label={label} side="right" asChild>
                        <Button
                            variant="ghost"
                            className="h-auto p-2"
                            onClick={onExpand}
                        >
                            <ArrowRightFromLine />
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && (
                <div className="mb-2 flex w-full items-center p-3 pl-6">
                    <p className="font-semibold text-primary">For you</p>
                    <Hint label={label} side="right" asChild>
                        <Button
                            className="ml-auto h-auto p-2"
                            variant="ghost"
                            onClick={onCollapse}
                        >
                            <ArrowLeftFromLine />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    );
};