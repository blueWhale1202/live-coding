"use client";

import { Prisma, Stream, User } from "@prisma/client";

import { LiveKitRoom } from "@livekit/components-react";

import { getUserByUsername } from "@/features/username/service/get-user-by-username";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Video } from "./video";

type UserWithStream = Prisma.PromiseReturnType<typeof getUserByUsername> & {
    user: User;
};

type Props = {
    user: UserWithStream;
    stream: Stream;
    isFollowing: boolean;
};

export const StreamPlayer = ({ user, stream, isFollowing }: Props) => {
    const { token, name, identity } = useViewerToken(user.id);

    if (!token || !name || !identity) {
        return <div>Cannot watch the stream</div>;
    }

    return (
        <>
            <LiveKitRoom
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                className="grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6"
            >
                <div className="hidden-scrollbar col-span-1 space-y-4 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
                    <Video hostName={user.username} hostIdentity={user.id} />
                </div>
            </LiveKitRoom>
        </>
    );
};
