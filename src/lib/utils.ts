import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const loginZodSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const carSliderData = [
  {
    id: 1,
    name: "Toyota Yaris",
    system: "Automatic",
    price: 100,
    image: "/images/slider/6.png",
  },
  {
    id: 2,
    name: "Toyota Land Cruiser",
    system: "Automatic",
    price: 120,
    image: "/images/slider/5.png",
  },
  {
    id: 3,
    name: "Toyota Yaris Cross",
    system: "Automatic",
    price: 150,
    image: "/images/slider/4.png",
  },
  {
    id: 4,
    name: "Toyota Corolla",
    system: "Automatic",
    price: 200,
    image: "/images/slider/3.png",
  },
  {
    id: 5,
    name: "Toyota C HR",
    system: "Automatic",
    price: 250,
    image: "/images/slider/2.png",
  },
  {
    id: 6,
    name: "Toyota bZ4X",
    system: "Automatic",
    price: 300,
    image: "/images/slider/1.png",
  },
];
