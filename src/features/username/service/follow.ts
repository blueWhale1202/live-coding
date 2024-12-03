import { getSelf } from "@/features/auth/service/get-self";
import { db } from "@/lib/db";

export const isFollowingUser = async (id: string) => {
    try {
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where: { id },
        });

        if (!otherUser) {
            throw new Error("User not found");
        }

        if (otherUser.id === self.id) {
            return true;
        }

        const followed = await db.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id,
            },
        });

        return !!followed;
    } catch (error) {
        return false;
    }
};

export const followUser = async (id: string) => {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where: { id },
    });

    if (!otherUser) {
        throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
        throw new Error("You can't follow yourself");
    }

    const followed = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        },
    });

    if (followed) {
        throw new Error("You are already following this user");
    }

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id,
        },
        include: {
            following: true,
        },
    });

    return follow;
};

export const unfollowUser = async (id: string) => {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
        where: { id },
    });

    if (!otherUser) {
        throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
        throw new Error("You can't unfollow yourself");
    }

    const followed = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        },
    });

    if (!followed) {
        throw new Error("You are not following this user");
    }

    const follow = await db.follow.delete({
        where: {
            id: followed.id,
        },
        include: {
            following: true,
        },
    });

    return follow;
};

export const getFollowers = async () => {
    try {
        const self = await getSelf();

        const followedUsers = await db.follow.findMany({
            where: {
                followerId: self.id,
            },
            include: {
                following: true,
            },
        });

        return followedUsers;
    } catch (error) {
        return [];
    }
};
