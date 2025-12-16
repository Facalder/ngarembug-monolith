import { Container } from "@/components/container-layout";

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header className="sticky top-0 z-20 bg-background left-0 w-full">
                <Container size="lg" className="border-b flex items-center p-4 h-16">
                    <h1 className="font-bold text-xl">Ngarembug</h1>
                </Container>
            </header>
            <main className="min-h-screen z-10">
                <Container size="lg" className="py-6">
                    {children}
                </Container>
            </main>
        </>
    );
}
