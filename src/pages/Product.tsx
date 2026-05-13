
const Product = () => {
  return (
    <section className="min-h-screen px-6 py-16 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        <div>
          <h1 className="text-5xl font-bold text-zinc-900 mb-6">
            Our Products
          </h1>

          <p className="text-lg text-zinc-600 leading-8">
            We build modern digital products focused on performance,
            scalability, and user experience. Our platform helps teams
            manage workflows efficiently and improve productivity across
            projects.
          </p>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475"
            alt="product"
            className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Product;