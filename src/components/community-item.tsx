import { handleBlock } from "@/actions/block";
import { cn } from "@/lib/utils";
import { MinusCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import stc from "string-to-color";
import { Hint } from "./hint";
import { Button } from "./ui/button";

type Props = {
    hostName: string;
    viewerName: string;
    participantName?: string;
    participantIdentity: string;
};

export const CommunityItem = ({
    hostName,
    viewerName,
    participantName,
    participantIdentity,
}: Props) => {
    const [isPending, startTransition] = useTransition();

    const isSelf = participantName === viewerName;
    const isHost = viewerName === hostName;

    const color = stc(participantName || "");

    const onBlock = () => {
        if (!participantName || isSelf || !isHost) {
            return;
        }

        startTransition(() => {
            handleBlock(participantIdentity)
                .then(() => toast.success(`Blocked ${participantName}`))
                .catch(() => toast.error(`Failed to block ${participantName}`));
        });
    };

    return (
        <div
            className={cn(
                "group flex w-full items-center justify-between rounded-md p-2 text-sm hover:bg-white/5",
                isPending && "pointer-events-none opacity-50",
            )}
        >
            <p style={{ color }}>{participantName}</p>
            {isHost && !isSelf && (
                <Hint label="Block">
                    <Button
                        variant="ghost"
                        className="size-auto p-1 opacity-0 transition group-hover:opacity-100"
                        disabled={isPending}
                        onClick={onBlock}
                    >
                        <MinusCircle className="text-muted-foreground" />
                    </Button>
                </Hint>
            )}
        </div>
    );
};
