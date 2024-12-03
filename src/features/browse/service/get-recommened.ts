import { db } from "@/lib/db";
import { User } from "@prisma/client";

import { getSelf } from "@/features/auth/service/get-self";

export const getRecommended = async () => {
    let userId: string | null = null;

    try {
        const self = await getSelf();
        userId = self.id;
    } catch (error) {
        userId = null;
    }

    let users: User[];

    if (userId) {
        users = await db.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            id: userId,
                        },
                    },
                    {
                        NOT: {
                            followedBy: {
                                some: {
                                    followerId: userId,
                                },
                            },
                        },
                    },
                ],
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    } else {
        users = await db.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    return users;
};
