"use client";
import { useAuth } from "@/app/provider/AuthContext";
import HeroContainer from "../shared/HeroContainer";
import CarReserveFrom from "./CarReserveFrom";
import CarSlider from "./CarSlider";

const HeroSection = () => {
  const { user } = useAuth() as any;
  return (
    <section className="indexTop relative md:mt-[60px] ">
      <div className="background_Image">
        <HeroContainer>
          <div className="max_width relative">
            <div className="indexTop_Left z-10 relative">
              <h1 className="text-4xl mt-20 px-4 md:px-0 font-bold text-white">
                Enjoy Your Ride. {user?.data?.data?.fullname}
              </h1>
              <CarSlider />
            </div>
            <div className="indexTop_Right px-4 md:px-0">
              <CarReserveFrom />
            </div>
          </div>
        </HeroContainer>
      </div>
    </section>
  );
};

export default HeroSection;
