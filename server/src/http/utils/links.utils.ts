import { env } from "@/env";

export function mountShortenedUrl(slug: string) {
  return `${env.SERVER_BASE_URL}/${slug}`
}