import { notFound } from "next/navigation";

import { Actions } from "@/features/username/components/actions";

import { isBlockedByUser } from "@/features/username/service/check-blocked";
import { isFollowingUser } from "@/features/username/service/check-following";

import { getUserByUsername } from "@/features/username/service/get-user-by-username";

type Props = {
    params: {
        username: string;
    };
};

export default async function UserPage({ params }: Props) {
    const { username } = params;
    const user = await getUserByUsername(username);

    if (!user) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    if (isBlocked) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-y-4">
            <p>Username: {user.username}</p>
            <p>userId: {user.id}</p>
            <p>Is following: {`${isFollowing}`}</p>
            <p>Blocked by this user: {`${isBlocked}`}</p>

            <Actions userId={user.id} isFollowing={isFollowing} />
        </div>
    );
}
