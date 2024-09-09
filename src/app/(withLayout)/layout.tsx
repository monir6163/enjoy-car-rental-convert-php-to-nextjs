import Footer from "../components/footer/Footer";
import Mobile from "../components/navbar/Mobile";
import Navbar from "../components/navbar/Navbar";

export default function commonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Mobile />
      {children}
      <Footer />
    </>
  );
}
