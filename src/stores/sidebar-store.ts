import { createStore } from "zustand";

type State = {
    collapsed: boolean;
};

type Actions = {
    onExpand: () => void;
    onCollapse: () => void;
};

export type SidebarStore = State & Actions;

export const defaultState: State = {
    collapsed: false,
};

export const createSidebarStore = (initState: State = defaultState) => {
    return createStore<SidebarStore>((set) => ({
        ...initState,
        onExpand: () => set({ collapsed: false }),
        onCollapse: () => set({ collapsed: true }),
    }));
};
