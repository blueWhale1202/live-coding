"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { handleFollow, handleUnfollow } from "@/actions/follow";
import { toast } from "sonner";

type Props = {
    isFollowing: boolean;
    userId: string;
};

export const Actions = ({ isFollowing, userId }: Props) => {
    const [isPending, startTransition] = useTransition();

    const onFollow = () => {
        startTransition(() => {
            handleFollow(userId).catch((error) => {
                toast.error(error.message);
            });
        });
    };

    const onUnfollow = () => {
        startTransition(() => {
            handleUnfollow(userId).catch((error) => {
                toast.error(error.message);
            });
        });
    };

    const onClick = isFollowing ? onUnfollow : onFollow;

    return (
        <Button variant="primary" disabled={isPending} onClick={onClick}>
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    );
};
