"use client";

import { User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

import { useSidebar } from "../hooks/use-sidebar";

type Props = {
    users: User[];
};

export const Recommended = ({ users }: Props) => {
    const { collapsed } = useSidebar();

    const showLabel = !collapsed && users.length > 0;

    return (
        <div>
            {showLabel && (
                <div className="mb-4 pl-6">
                    <p className="text-sm text-muted-foreground">Recommended</p>
                </div>
            )}

            <ul className="space-y-2 px-2">
                {users.map((user) => (
                    <li key={user.id}>
                        <UserItem
                            username={user.username}
                            imageUrl={user.imageUrl}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const RecommendedSkeleton = () => {
    return (
        <ul className="px-2">
            {[...Array(3)].map((_, index) => (
                <UserItemSkeleton key={index} />
            ))}
        </ul>
    );
};
