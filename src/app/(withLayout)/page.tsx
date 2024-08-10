import AboutUs from "../components/home/AboutUs";
import CarSection from "../components/home/CarSection";
import HeroSection from "../components/home/HeroSection";
import DataTransfer from "../components/shared/DataTransfer";

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
    },
  ];
  return (
    <>
      <DataTransfer data={products} />
      <HeroSection />
      <CarSection />
      <AboutUs />
    </>
  );
}
