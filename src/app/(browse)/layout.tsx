import { Navbar } from "@/features/browse/components/navbar";

type Props = {
    children: React.ReactNode;
};

export default function BrowseLayout({ children }: Props) {
    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">{children}</div>
        </>
    );
}
