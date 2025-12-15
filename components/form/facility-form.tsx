"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

import { EntryActionPanel } from "@/components/entry-action-panel";
import { FormLayout } from "@/components/form-layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateSlug } from "@/lib/slug";
import { mutationFetcher } from "@/lib/swr";
import { type Facility, facilitySchema } from "@/schemas/facilities.dto";

interface FacilityFormProps {
    initialData?: Facility & { id: string; contentStatus?: string };
}

export function FacilityForm({ initialData }: FacilityFormProps) {
    const router = useRouter();
    const [submitStatus, setSubmitStatus] = useState<"DRAFT" | "PUBLISHED" | null>(null);

    // Dynamic SWR key based on create vs edit mode
    const FACILITIES_ENDPOINT = "/facilities";
    const key = initialData?.id
        ? `${FACILITIES_ENDPOINT}/${initialData.id}`
        : FACILITIES_ENDPOINT;

    const { trigger, isMutating } = useSWRMutation(key, mutationFetcher);

    const form = useForm<Facility>({
        resolver: zodResolver(facilitySchema),
        defaultValues: {
            name: initialData?.name || "",
            slug: initialData?.slug || "",
            description: initialData?.description || "",
        },
    });

    const name = form.watch("name");

    // Auto-generate slug when name changes
    useEffect(() => {
        if (name) {
            const slug = generateSlug(name);
            form.setValue("slug", slug, { shouldValidate: true });
        }
    }, [name, form]);

    const onSubmit = async (values: Facility, status: "DRAFT" | "PUBLISHED") => {
        setSubmitStatus(status);

        try {
            const method = initialData?.id ? "PUT" : "POST";
            const payload = { ...values, contentStatus: status };

            await trigger({ method, body: payload });

            toast.success(
                status === "PUBLISHED"
                    ? "Fasilitas berhasil dipublikasikan!"
                    : "Fasilitas berhasil disimpan sebagai draft!",
                {
                    description:
                        status === "PUBLISHED"
                            ? `Fasilitas "${values.name}" telah dipublikasikan.`
                            : `Fasilitas "${values.name}" disimpan sebagai draft.`,
                }
            );

            router.refresh();
            router.push("/dashboard/facilities");
        } catch (error) {
            console.error(error);
            toast.error("Gagal memproses permintaan", {
                description: "Terjadi kesalahan saat memproses permintaan.",
            });
        } finally {
            setSubmitStatus(null);
        }
    };

    const handleCancel = () => router.back();

    return (
        <FormLayout>
            <FormLayout.Form>
                <Form {...form}>
                    <form className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Detail Fasilitas</CardTitle>
                                <CardDescription>
                                    Isi informasi detail mengenai fasilitas yang tersedia.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 mt-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Fasilitas</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isMutating}
                                                    placeholder="Contoh: Wifi, Parkir Luas"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Nama fasilitas yang akan ditampilkan.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />



                                {/* Slug is auto-generated from name */}
                                <input type="hidden" {...form.register("slug")} />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Deskripsi</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    value={field.value ?? ""}
                                                    rows={4}
                                                    disabled={isMutating}
                                                    placeholder="Deskripsi singkat mengenai fasilitas..."
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Penjelasan tambahan mengenai fasilitas (opsional).
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </form>
                </Form>
            </FormLayout.Form>

            <FormLayout.Actions>
                <EntryActionPanel
                    isLoading={isMutating}
                    loadingDraft={isMutating && submitStatus === "DRAFT"}
                    loadingPublish={isMutating && submitStatus === "PUBLISHED"}
                    onCancel={handleCancel}
                    onSubmitDraft={form.handleSubmit((values) =>
                        onSubmit(values, "DRAFT")
                    )}
                    onSubmitPublish={form.handleSubmit((values) =>
                        onSubmit(values, "PUBLISHED")
                    )}
                />
            </FormLayout.Actions>
        </FormLayout>
    );
}
