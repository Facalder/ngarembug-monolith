import { Container } from "@/components/container-layout";

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    <>
        <main className="min-h-screen">
            <Container size="lg">
                {children}
            </Container>
        </main>
    </>
}