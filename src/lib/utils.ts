import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
    .min(6, "Password must be at least 6 characters")
    .max(10, "Password must be at most 10 characters"),
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

// const carSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   transmission: { type: String, enum: ['Automatic', 'Manual'], required: true },
//   fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], required: true },
//   seats: { type: Number, required: true },
//   doors: { type: Number, required: true },
//   image: { type: String, required: true }, // URL of the car image
//   price: {
//     oneToThreeDays: { type: Number, required: true },
//     fourToSevenDays: { type: Number, required: true },
//     eightToFifteenDays: { type: Number, required: true },
//     fifteenPlusDays: { type: Number, required: true },
//     basePrice: { type: Number, required: true } // Starting price
//   },
//   availableOnRequest: {
//     type: [String], // e.g., ["Navigation", "Wi-Fi", "Child seat"]
//   },
//   amenities: {
//     abs: { type: Boolean, default: false },
//     remoteLock: { type: Boolean, default: false },
//     airConditioner: { type: Boolean, default: false },
//     electricWindows: { type: Boolean, default: false },
//     cdPlayer: { type: Boolean, default: false },
//     // Add other amenities as needed
//   }
// });

// const Car = mongoose.model('Car', carSchema);

//rental car data

export const rentalCarData = [
  {
    id: 1,
    name: "Toyota Yaris",
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    doors: 5,
    image: "/images/slider/6.png",
    gallery_images: [
      "/images/slider/6.png",
      "/images/slider/5.png",
      "/images/slider/4.png",
      "/images/slider/3.png",
      "/images/slider/2.png",
      "/images/slider/1.png",
    ],
    price: {
      oneToThreeDays: 75,
      fourToSevenDays: 60,
      eightToFifteenDays: 55,
      fifteenPlusDays: 50,
      basePrice: 50,
    },
    availableOnRequest: ["Navigation", "Wi-Fi", "Child seat"],
    amenities: {
      abs: true,
      remoteLock: true,
      airConditioner: true,
      electricWindows: true,
      cdPlayer: true,
    },
  },
  {
    id: 2,
    name: "Toyota Land Cruiser",
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    doors: 5,
    image: "/images/slider/5.png",
    gallery_images: [
      "/images/slider/6.png",
      "/images/slider/5.png",
      "/images/slider/4.png",
      "/images/slider/3.png",
      "/images/slider/2.png",
      "/images/slider/1.png",
    ],
    price: {
      oneToThreeDays: 100,
      fourToSevenDays: 80,
      eightToFifteenDays: 75,
      fifteenPlusDays: 70,
      basePrice: 70,
    },
    availableOnRequest: ["Navigation", "Wi-Fi", "Child seat"],
    amenities: {
      abs: true,
      remoteLock: true,
      airConditioner: true,
      electricWindows: true,
      cdPlayer: true,
    },
  },
  {
    id: 3,
    name: "Toyota Yaris Cross",
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    doors: 5,
    image: "/images/slider/4.png",
    gallery_images: [
      "/images/slider/6.png",
      "/images/slider/5.png",
      "/images/slider/4.png",
      "/images/slider/3.png",
      "/images/slider/2.png",
      "/images/slider/1.png",
    ],
    price: {
      oneToThreeDays: 150,
      fourToSevenDays: 120,
      eightToFifteenDays: 110,
      fifteenPlusDays: 100,
      basePrice: 100,
    },
    availableOnRequest: ["Navigation", "Wi-Fi", "Child seat"],
    amenities: {
      abs: true,
      remoteLock: true,
      airConditioner: true,
      electricWindows: true,
      cdPlayer: true,
    },
  },
  {
    id: 4,
    name: "Toyota Corolla",
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    doors: 5,
    image: "/images/slider/3.png",
    gallery_images: [
      "/images/slider/6.png",
      "/images/slider/5.png",
      "/images/slider/4.png",
      "/images/slider/3.png",
      "/images/slider/2.png",
      "/images/slider/1.png",
    ],
    price: {
      oneToThreeDays: 200,
      fourToSevenDays: 160,
      eightToFifteenDays: 150,
      fifteenPlusDays: 140,
      basePrice: 140,
    },
    availableOnRequest: ["Navigation", "Wi-Fi", "Child seat"],
    amenities: {
      abs: true,
      remoteLock: true,
      airConditioner: true,
      electricWindows: true,
      cdPlayer: true,
    },
  },
  {
    id: 5,
    name: "Toyota C HR",
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    doors: 5,
    image: "/images/slider/2.png",
    gallery_images: [
      "/images/slider/6.png",
      "/images/slider/5.png",
      "/images/slider/4.png",
      "/images/slider/3.png",
      "/images/slider/2.png",
      "/images/slider/1.png",
    ],
    price: {
      oneToThreeDays: 250,
      fourToSevenDays: 200,
      eightToFifteenDays: 185,
      fifteenPlusDays: 170,
      basePrice: 170,
    },
    availableOnRequest: ["Navigation", "Wi-Fi", "Child seat"],
    amenities: {
      abs: true,
      remoteLock: true,
      airConditioner: true,
      electricWindows: true,
      cdPlayer: true,
    },
  },
  {
    id: 6,
    name: "Toyota bZ4X",
    transmission: "Automatic",
    fuelType: "Electric",
    seats: 5,
    doors: 5,
    image: "/images/slider/1.png",
    gallery_images: [
      "/images/slider/6.png",
      "/images/slider/5.png",
      "/images/slider/4.png",
      "/images/slider/3.png",
      "/images/slider/2.png",
      "/images/slider/1.png",
    ],
    price: {
      oneToThreeDays: 300,
      fourToSevenDays: 240,
      eightToFifteenDays: 220,
      fifteenPlusDays: 200,
      basePrice: 200,
    },
    availableOnRequest: ["Navigation", "Wi-Fi", "Child seat"],
    amenities: {
      abs: true,
      remoteLock: true,
      airConditioner: true,
      electricWindows: true,
      cdPlayer: true,
    },
  },
];
