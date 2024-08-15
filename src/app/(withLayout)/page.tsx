"use client";
import AboutUs from "../components/home/AboutUs";
import CarSection from "../components/home/CarSection";
import HeroSection from "../components/home/HeroSection";
import { useAuth } from "../provider/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <>
      <HeroSection user={user} />
      <CarSection />
      <AboutUs />
    </>
  );
}
