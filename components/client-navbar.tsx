
"use client";

import {
    Bookmark02Icon, // Kept because it's used conditionally
    Fan01Icon,
    Globe02Icon, // Kept because it's used conditionally
    Menu01Icon,
    Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/container-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export function ClientNavbar() {
    const isLoggedIn = false; // Mock auth state

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <Container
                size="lg"
                className="flex h-16 items-center justify-between gap-2"
            >
                {/* Left: Logo & Nav */}
                <div className="flex items-center gap-8 shrink-0">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/images/ngarembug_logo.svg"
                            alt="Ngarembug Logo"
                            width={32}
                            height={32}
                            className="size-28 md:size-48"
                        />
                        <span className="sr-only">Ngarembug</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/apps"
                            className="font-semibold text-foreground hover:text-primary transition-colors"
                        >
                            Apps
                        </Link>
                        <Link
                            href="/sites"
                            className="font-semibold text-muted-foreground hover:text-primary transition-colors"
                        >
                            Sites
                        </Link>
                    </nav>
                </div>

                {/* Center: Search Bar */}
                <div className="flex flex-1 w-full mx-2 md:mx-4 relative">
                    <div className="relative w-full">
                        <HugeiconsIcon
                            icon={Search01Icon}
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                        />
                        <Input
                            placeholder="Search on iOS..."
                            className="w-full pl-9 pr-9 bg-muted/50 border-transparent hover:bg-muted focus-visible:bg-background focus-visible:border-ring rounded-xl h-10 transition-colors"
                        />
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0">
                    {isLoggedIn ? (
                        <>
                            <div className="hidden md:flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                >
                                    <HugeiconsIcon icon={Bookmark02Icon} className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 text-muted-foreground"
                                >
                                    <HugeiconsIcon icon={Globe02Icon} className="h-5 w-5" />
                                </Button>
                            </div>

                            <Button
                                variant="default"
                                size="sm"
                                className="hidden md:inline-flex rounded-full px-4 h-9 font-semibold"
                            >
                                Get Pro
                            </Button>

                            <Avatar className="h-9 w-9 border cursor-pointer ml-1">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </>
                    ) : (
                        <div className="hidden md:flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="font-semibold text-muted-foreground hover:text-foreground">
                                Log in
                            </Button>
                            <Button size="sm" className="rounded-full px-5 font-semibold">
                                Sign up for free
                            </Button>
                        </div>
                    )}

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="secondary" size="icon-lg" className="md:hidden ml-1">
                                <HugeiconsIcon icon={Menu01Icon} className="size-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="top"
                            className="inset-x-0 top-16 bottom-0 h-[calc(100dvh-64px)] p-6 bg-background shadow-none border-t"
                        >
                            <SheetHeader className="flex flex-row items-center justify-between p-0 mb-6 space-y-0">
                                <SheetTitle className="text-xl font-medium text-left">Menu</SheetTitle>
                                {/* Close button is handled by Sheet primitive but we can ensure consistent styling */}
                            </SheetHeader>
                            <div className="flex flex-col h-full">
                                <nav className="flex flex-col gap-6">
                                    <Link
                                        href="/apps"
                                        className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
                                    >
                                        Apps
                                    </Link>
                                    <Link
                                        href="/sites"
                                        className="text-2xl font-bold text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Sites
                                    </Link>
                                </nav>
                                <div className="mt-auto pb-8 flex flex-col gap-4">
                                    {isLoggedIn ? (
                                        <>
                                            <div className="flex items-center gap-3 py-2">
                                                <Avatar className="h-10 w-10 border">
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-base">My Account</span>
                                                    <span className="text-xs text-muted-foreground">Manage profile</span>
                                                </div>
                                            </div>
                                            <Button variant="default" size="lg" className="w-full rounded-full font-semibold">
                                                Get Pro
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                variant="ghost"
                                                size="lg"
                                                className="w-full justify-start px-0 text-lg font-semibold h-auto hover:bg-transparent hover:underline"
                                            >
                                                Masuk
                                            </Button>
                                            <Button size="lg" className="w-full rounded-full font-bold text-base bg-foreground text-background hover:bg-foreground/90 py-6">
                                                Buat Akun
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </Container>
        </header>
    );
}

