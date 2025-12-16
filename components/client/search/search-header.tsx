"use client";

import { useSearchParams } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { REGION_OPTIONS } from "@/globals/data-options";

export function SearchHeader() {
    const searchParams = useSearchParams();
    const regionAlias = searchParams.get("region");
    const region = REGION_OPTIONS.find((r) => r.alias === regionAlias);
    const title = region ? `Cafe di ${region.label}` : "Cafe Terbaik Untukmu";

    return (
        <div className="flex flex-col gap-4 py-8 border-b">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/search">Pencarian</BreadcrumbLink>
                    </BreadcrumbItem>
                    {region && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{region.label}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </>
                    )}
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">{title}</h1>
                <p className="text-muted-foreground text-lg">
                    Temukan tempat nongkrong terbaik dengan fasilitas lengkap
                </p>
            </div>
        </div>
    );
}
