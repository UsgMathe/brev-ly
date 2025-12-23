import { env } from "@/env";

export const buildShortenedUrl = (slug: string) => `${env.VITE_FRONTEND_URL}/${slug}`;
