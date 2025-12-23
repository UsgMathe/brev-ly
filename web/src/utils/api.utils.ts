import { isAxiosError } from "axios";
import { toast } from "sonner";

interface ApiErrorToastOptions {
  title?: string;
  description?: string;
}
export function apiErrorToast(error: unknown, options?: ApiErrorToastOptions) {
  if (isAxiosError(error)) {
    const title = options?.title || "Erro";
    const description = error.response?.data.message || options?.description;
    toast.error(title, { description });

    return error;
  }
}
