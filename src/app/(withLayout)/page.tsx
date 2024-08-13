import axiosInstance from "@/lib/axiosApi/axiosInstance";
import AboutUs from "../components/home/AboutUs";
import CarSection from "../components/home/CarSection";
import HeroSection from "../components/home/HeroSection";

const fecthData = async () => {
  try {
    const response = await axiosInstance.get("/api/cars");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default function Home() {
  const data = fecthData();
  return (
    <>
      <HeroSection />
      <CarSection />
      <AboutUs />
    </>
  );
}
