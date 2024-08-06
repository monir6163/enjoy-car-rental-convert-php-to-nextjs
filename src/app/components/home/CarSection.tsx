import Container from "../shared/Container";
import SlickSlider from "./SlickSlider";

const CarSection = () => {
  return (
    <section className="mb-2">
      <Container>
        <h2 className="mt-16 mb-5 pb-5 font-bold text-3xl border-b-2 border-red-600">
          Our Cars
        </h2>
        <SlickSlider />
      </Container>
      {/* slick slider */}
    </section>
  );
};

export default CarSection;
