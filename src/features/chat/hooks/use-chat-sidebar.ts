import { parseAsBoolean, parseAsStringEnum, useQueryStates } from "nuqs";
import { useCallback } from "react";

export enum ChatVariant {
    CHAT = "CHAT",
    COMMUNITY = "COMMUNITY",
}

export const useChatSidebar = () => {
    const [{ collapsed, variant }, setSidebar] = useQueryStates({
        variant: parseAsStringEnum<ChatVariant>(
            Object.values(ChatVariant),
        ).withDefault(ChatVariant.CHAT),
        collapsed: parseAsBoolean.withDefault(false),
    });

    const onExpand = useCallback(() => {
        setSidebar({ collapsed: false });
    }, []);

    const onCollapse = useCallback(() => {
        setSidebar({ collapsed: true });
    }, []);

    const onChangeVariant = useCallback((variant: ChatVariant) => {
        setSidebar({ variant });
    }, []);

    return {
        collapsed,
        onExpand,
        onCollapse,
        variant,
        onChangeVariant,
    };
};
