import { ZodError, ZodSchema } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "@/lib/swr";

export interface FormSubmitOptions {
  endpoint: string;
  initialId?: string;
  redirectTo: string;
  entityName: string;
}

export function useFormSubmit(options: FormSubmitOptions) {
  const router = useRouter();
  const [submitStatus, setSubmitStatus] = useState<
    "DRAFT" | "PUBLISHED" | null
  >(null);

  const key = options.initialId
    ? `${options.endpoint}/${options.initialId}`
    : options.endpoint;

  const { trigger, isMutating } = useSWRMutation(key, mutationFetcher);

  const handleValidationError = (error: unknown) => {
    if (error instanceof ZodError) {
      const firstError = error.issues[0];
      toast.error("Validasi gagal", {
        description: `${firstError.path.join(".")}: ${firstError.message}`,
      });
    } else if (error instanceof Error) {
      toast.error("Validasi gagal", {
        description: error.message,
      });
    }
  };

  const handleSubmit = async (
    values: unknown,
    status: "DRAFT" | "PUBLISHED",
    schema: ZodSchema,
  ) => {
    setSubmitStatus(status);
    try {
      const validatedValues = schema.parse(values);
      const method = options.initialId ? "PUT" : "POST";
      const payload = { ...(validatedValues as Record<string, unknown>), contentStatus: status };

      await trigger({ method, body: payload });

      toast.success(
        status === "PUBLISHED"
          ? `${options.entityName} berhasil dipublikasikan!`
          : `${options.entityName} berhasil disimpan sebagai draft!`,
        {
          description: `${status === "PUBLISHED" ? "Dipublikasikan" : "Disimpan"}`,
        },
      );

      router.push(options.redirectTo);
      router.refresh();
    } catch (error) {
      if (error instanceof ZodError) {
        handleValidationError(error);
      } else {
        toast.error("Gagal memproses permintaan", {
          description:
            error instanceof Error
              ? error.message
              : "Terjadi kesalahan saat menyimpan data.",
        });
      }
    } finally {
      setSubmitStatus(null);
    }
  };

  return {
    isMutating,
    submitStatus,
    handleSubmit,
    handleValidationError,
  };
}
