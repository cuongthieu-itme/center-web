import { clsx, type ClassValue } from "clsx"
import dayjs from "dayjs"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date to D-M-YYYY format
 * @param date Date to format (Date object, string, or timestamp)
 * @returns Formatted date string in D-M-YYYY format
 */
export function formatDate(date: string | number | Date): string {
  return dayjs(date).format("DD/MM/YYYY")
}
