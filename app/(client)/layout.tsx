import { ClientNavbar } from "@/components/client-navbar";
import { Container } from "@/components/container-layout";

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ClientNavbar />
            <main className="min-h-screen z-10">
                <Container size="lg" className="py-6">
                    {children}
                </Container>
            </main>
        </>
    );
}
