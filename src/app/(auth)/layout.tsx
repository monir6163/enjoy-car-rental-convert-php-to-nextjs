import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import "../globals.css";

export default function commonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={` w-full h-full m-0 p-0 overflow-x-hidden`}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
