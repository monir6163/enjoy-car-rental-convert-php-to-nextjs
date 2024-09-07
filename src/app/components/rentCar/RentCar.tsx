import { rentalCarData } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container";

export default function RentCar() {
  return (
    <section>
      <Container>
        <div className="pb-2">
          <h2 className="mt-16 pb-2 mb-5 border-b border-b-red-600 text-3xl font-bold">
            Car Rental
          </h2>
        </div>
        <div className="pb-10 pt-2">
          <div>
            <h3 className="text-2xl font-semibold">Why Enjoy?</h3>
            <p className="pt-2 text-xl">
              We have a large number of cars, premium and standard class.
              It&apos;s up to you to choose, and we do the whole procedure. You
              get an immediate answer to your doubts, and you can choose between
              the latest models, Toyota, Volkswagen, Mercedes, Škoda, Peugeot,
              Seat, Reno, easily and simply, thanks to the Enjoy platform.
            </p>
            <p className="pt-2 text-xl">
              Click on the desired car and experience the summer adventure you
              have planned.
            </p>
            <p className="pt-2 text-xl">
              Because everything is quick and easy with us.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 pb-14">
          {rentalCarData.map((car, i) => (
            <div key={i} className="hover:shadow-lg rounded-[20px]">
              <div className="block w-full bg-white ml-auto mr-auto border border-gray-300 rounded-[20px] full_card">
                <div className="w-[40%] bg-[#cc0505] h-[25px] flex justify-center items-center price_border">
                  <p className="text-white text-sm">From 50</p>
                </div>
                <div className="ml-auto mr-auto pt-2 w-full max-w-[300px]">
                  <Image
                    src="/images/slider/1.png"
                    alt="car"
                    width={300}
                    height={200}
                    className="w-full h-[200px] object-center max-w-[300px] object-contain "
                  />
                </div>
                <div className="pl-5 pr-5">
                  <div className="text-xl text-black pt-4">{car?.name}</div>
                  <div className="text-xs red_color pb-2">Automatic</div>
                  <div className="flex justify-between text-black text-sm pt-2">
                    <div>1-3 days</div>
                    <div>500</div>
                  </div>
                  <div className="bg-[#e6e6e6] w-full h-[1px]"></div>
                  <div className="flex justify-between text-black text-sm pt-2">
                    <div>1-3 days</div>
                    <div>500</div>
                  </div>
                  <div className="bg-[#e6e6e6] w-full h-[1px]"></div>
                  <div className="flex justify-between text-black text-sm pt-2">
                    <div>1-3 days</div>
                    <div>500</div>
                  </div>
                  <div className="bg-[#e6e6e6] w-full h-[1px]"></div>
                  <div className="flex justify-between text-black text-xs pt-2">
                    <div>1-3 days</div>
                    <div>500</div>
                  </div>

                  <div className="pt-5 pb-5 details_btn">
                    <Link href={`rent-car/${car?.slug}`} className="w-full">
                      <button className="bg-white text-[#cc0505] border border-red-600 rounded-[10px] flex justify-center items-center text-sm cursor-pointer w-full font-semibold h-[40px]">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
