import { Container } from "@/components/container-layout";

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="min-h-screen">
            <Container padding="sm" size="lg">
                {children}
            </Container>
        </main>
    )
}