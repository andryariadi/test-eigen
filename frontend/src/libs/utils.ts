import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNewsDate(isoDate: string): string {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export const stripHtmlTags = (html: string | null) => {
  if (typeof window === "undefined") {
    // Untuk server-side
    return html ? html.replace(/<[^>]*>?/gm, "") : "";
  } else {
    // Untuk client-side
    const doc = new DOMParser().parseFromString(html ?? "", "text/html");
    return doc.body.textContent || "";
  }
};
