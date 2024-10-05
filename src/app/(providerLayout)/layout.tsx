import "@mantine/core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/footer/Footer";
import Mobile from "../components/navbar/Mobile";
import Navbar from "../components/navbar/Navbar";
import "../globals.css";

export default function ProviderLayout({
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
