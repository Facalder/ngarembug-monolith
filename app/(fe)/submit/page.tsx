"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SubmitPage() {
    return (
        <div className="container mx-auto max-w-2xl py-12 px-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold">Recommend a Cafe</h1>
                <p className="text-muted-foreground mt-2">
                    Know a gem that we missed? Help the community by suggesting it.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Submission Form</CardTitle>
                    <CardDescription>
                        Please provide as much detail as possible. Our team will review your submission.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="rounded-lg border border-dashed p-12 text-center">
                        <p className="text-muted-foreground">Form Placeholder</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            (Requires generic-entry-form or similar component integration)
                        </p>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button disabled>Submit for Review</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
