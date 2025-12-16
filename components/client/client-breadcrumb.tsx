"use client";

import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItemProps {
    label: string;
    href: string;
    active?: boolean;
}

interface ClientBreadcrumbProps {
    items: BreadcrumbItemProps[];
    className?: string;
}

export function ClientBreadcrumb({ items, className }: ClientBreadcrumbProps) {
    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {items.map((item) => (
                    <React.Fragment key={item.href}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {item.active ? (
                                <BreadcrumbPage className="capitalize">
                                    {item.label.replace(/_/g, " ").toLowerCase()}
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={item.href} className="capitalize">
                                    {item.label.replace(/_/g, " ").toLowerCase()}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
