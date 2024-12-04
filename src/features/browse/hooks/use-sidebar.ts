import { parseAsBoolean, useQueryState } from "nuqs";
import { useCallback } from "react";

export const useSidebar = () => {
    const [collapsed, setCollapsed] = useQueryState(
        "collapsed-sidebar",
        parseAsBoolean.withDefault(false),
    );

    const onCollapse = useCallback(() => setCollapsed(true), [setCollapsed]);
    const onExpand = useCallback(() => setCollapsed(false), [setCollapsed]);

    return {
        collapsed,
        onCollapse,
        onExpand,
    };
};
