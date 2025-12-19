import { env } from "@/env";

export function buildShortenedUrl(slug: string) {
  return `${env.SERVER_BASE_URL}/${slug}`
}