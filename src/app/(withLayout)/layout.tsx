import Footer from "../components/footer/Footer";
import Mobile from "../components/navbar/Mobile";
import Navbar from "../components/navbar/Navbar";
import ClientOnly from "../components/shared/ClientOnly";
import "../globals.css";

export default function commonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClientOnly>
        <Navbar />
      </ClientOnly>
      <Mobile />
      {children}
      <Footer />
    </>
  );
}
