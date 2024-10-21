import Breadcrumb from "@/app/components/shared/Breadcrumb";

export default function page({ params }: any) {
  const { slug } = params as { slug: string };
  return (
    <>
      <Breadcrumb label={"Rent a Car"} />

      <section className="py-10">
        <h1 className="text-3xl font-bold text-center mb-10">
          Rent a Car - {slug}
        </h1>
        <div className="container mx-auto">
          <p className="text-center text-lg">
            This is the car rental page for {slug}.
          </p>
        </div>
      </section>
    </>
  );
}
