"use client";

import { Prisma } from "@prisma/client";

import { UserItem, UserItemSkeleton } from "./user-item";

import { useSidebar } from "@/providers/sidebar-store-provider";

type Props = {
    data: Prisma.FollowGetPayload<{ include: { following: true } }>[];
};

export const Following = ({ data }: Props) => {
    const { collapsed } = useSidebar((state) => state);

    if (!data.length) {
        return null;
    }

    return (
        <div>
            {!collapsed && (
                <div className="mb-4 pl-6">
                    <p className="text-sm text-muted-foreground">Following</p>
                </div>
            )}

            <ul className="space-y-2 px-2">
                {data.map((follow) => (
                    <li key={follow.id}>
                        <UserItem
                            username={follow.following.username}
                            imageUrl={follow.following.imageUrl}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const FollowingSkeleton = () => {
    return (
        <ul className="px-2 pt-2 lg:pt-0">
            {[...Array(3)].map((_, index) => (
                <UserItemSkeleton key={index} />
            ))}
        </ul>
    );
};
