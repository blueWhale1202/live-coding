import { WifiOff } from "lucide-react";

type Props = {
    label: string;
};

export const LoadingVideo = ({ label }: Props) => {
    return (
        <div className="flex h-full flex-col items-center justify-center space-y-4">
            <WifiOff className="size-10 text-muted-foreground" />
            <p className="capitalize text-muted-foreground">{label}</p>
        </div>
    );
};
