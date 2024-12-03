"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";

import { createSidebarStore, SidebarStore } from "@/stores/sidebar-store";
import { useStore } from "zustand";

export type SidebarStoreApi = ReturnType<typeof createSidebarStore>;

export const SidebarStoreContext = createContext<SidebarStoreApi | undefined>(
    undefined,
);

export const SidebarStoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<SidebarStoreApi>();
    if (!storeRef.current) {
        storeRef.current = createSidebarStore();
    }

    return (
        <SidebarStoreContext.Provider value={storeRef.current}>
            {children}
        </SidebarStoreContext.Provider>
    );
};

export const useSidebar = <T,>(selector: (store: SidebarStore) => T): T => {
    const sidebarStoreContext = useContext(SidebarStoreContext);
    if (!sidebarStoreContext) {
        throw new Error(
            "useSidebarStore must be used within SidebarStoreProvider",
        );
    }

    return useStore(sidebarStoreContext, selector);
};
