"use server";

import { revalidatePath } from "next/cache";

import { blockUser } from "@/features/username/service/block-user";
import { unblockUser } from "@/features/username/service/unblock-user";

export const handleBlock = async (id: string) => {
    const blockedUser = await blockUser(id);

    revalidatePath("/");

    if (blockedUser) {
        revalidatePath(`/${blockedUser.blocked.username}`);
    }

    return blockedUser;
};

export const handleUnblock = async (id: string) => {
    const unblockedUser = await unblockUser(id);

    revalidatePath("/");

    if (unblockedUser) {
        revalidatePath(`/${unblockedUser.blocked.username}`);
    }

    return unblockedUser;
};
