import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container";
import styles from "./other.module.css";

export default function OtherService() {
  return (
    <section>
      <Container>
        <div className="pb-2">
          <h2 className="mt-16 pb-2 mb-5 border-b border-b-red-600 text-3xl font-bold">
            Other Services
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4 pt-8 pb-14">
          <div className="">
            <div className="relative">
              <Image
                src="/images/other.jpg"
                width={300}
                height={200}
                alt="other"
                className="rounded"
              />
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <ShieldCheck
                  size={40}
                  color="#fff"
                  className="bg-red-600 p-1 rounded"
                />
              </div>
            </div>
            <div className="pt-7">
              <h3 className="text-2xl font-bold">Passenger transport</h3>
            </div>
            <div className="pt-2">
              <p className="text-base">
                We offer passenger transport to and from Podgorica and Tivat
                airport, as well as to destinations of our client&apos;s
                preferences.
              </p>
            </div>
          </div>
          <div className="">
            <div className="relative">
              <Image
                src="/images/other.jpg"
                width={300}
                height={200}
                alt="other"
                className="rounded"
              />
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <ShieldCheck
                  size={40}
                  color="#fff"
                  className="bg-red-600 p-1 rounded"
                />
              </div>
            </div>
            <div className="pt-7">
              <h3 className="text-2xl font-bold">Passenger transport</h3>
            </div>
            <div className="pt-2">
              <p className="text-base">
                We offer passenger transport to and from Podgorica and Tivat
                airport, as well as to destinations of our client&apos;s
                preferences.
              </p>
            </div>
          </div>
          <div className="">
            <div className="relative">
              <Image
                src="/images/other.jpg"
                width={300}
                height={200}
                alt="other"
                className="rounded"
              />
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <ShieldCheck
                  size={40}
                  color="#fff"
                  className="bg-red-600 p-1 rounded"
                />
              </div>
            </div>
            <div className="pt-7">
              <h3 className="text-2xl font-bold">Passenger transport</h3>
            </div>
            <div className="pt-2">
              <p className="text-base">
                We offer passenger transport to and from Podgorica and Tivat
                airport, as well as to destinations of our client&apos;s
                preferences.
              </p>
            </div>
          </div>
          <div className="">
            <div className="relative">
              <Image
                src="/images/other.jpg"
                width={300}
                height={200}
                alt="other"
                className="rounded"
              />
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <ShieldCheck
                  size={40}
                  color="#fff"
                  className="bg-red-600 p-1 rounded"
                />
              </div>
            </div>
            <div className="pt-7">
              <h3 className="text-2xl font-bold">Passenger transport</h3>
            </div>
            <div className="pt-2">
              <p className="text-base">
                We offer passenger transport to and from Podgorica and Tivat
                airport, as well as to destinations of our client&apos;s
                preferences.
              </p>
            </div>
          </div>
        </div>
      </Container>
      {/*bottom section*/}
      <div className={styles.indexBottom}>
        <div className={styles.about_bg}>
          <Container>
            <div className={styles.max_width_about}>
              <div>
                <h2 className="mt-20 mb-7 font-bold text-4xl">
                  Select your car
                </h2>
                <p className="text-xl">
                  We have a large number of cars, premium and standard class.
                  It&apos;s up to you to choose, and we do the whole procedure.
                  You get an immediate answer to your doubts, and you can choose
                  between the latest models, Toyota, Volkswagen, Mercedes,
                  Škoda, Peugeot, Seat, Reno, easily and simply, thanks to the
                  Enjoy platform.
                </p>

                <Link href="/rent-car">
                  <Button className="mt-7 mb-16 bg-red-700 text-white rounded text-xl font-medium">
                    Read More
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
