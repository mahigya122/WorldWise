const Pricing = () => {
  return (
    <section className="min-h-screen px-6 py-16 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

      <div>
      <h1 className="text-5xl font-bold text-zinc-900 mb-6">
        Our Pricing
      </h1>

      <p className="text-lg text-zinc-600 leading-8">
        Flexible pricing plans built for startups, teams, and enterprises
        with transparent and scalable options.
      </p>
      </div>

      <div>
        <img
        src="https://images.unsplash.com/photo-1504384308090-c894fdcc538"
        alt="pricing"
        className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
        />
      </div>
      </div>
    </section>
  );
}

export default Pricing;

