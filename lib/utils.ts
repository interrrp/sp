import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function isEmpty(str: string) {
  return str.trim() === "";
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
