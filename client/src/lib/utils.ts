import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phoneNumber: string): string {
  // Format: XXX-XXX-XXXX
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return phoneNumber;
}

export function smoothScrollTo(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}

// Utility function to handle email submission
export async function submitContactForm(formData: any) {
  // In a real implementation, this would send data to the server
  // For now, we'll simulate a successful submission
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Form submitted successfully!' });
    }, 1000);
  });
}
