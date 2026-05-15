const Product = () => {
  return (
    <section className="min-h-[calc(100vh-80px)] px-6 py-20 bg-zinc-900 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        
        <div>
          <h1 className="text-5xl font-black mb-8 tracking-tighter uppercase leading-tight">
            Track your <br/>
            <span className="text-blue-500 underline decoration-4 underline-offset-8">Adventures</span>
          </h1>

          <p className="text-lg text-gray-400 leading-8 mb-6">
            WorldWise is designed for the modern traveler. We believe that every city, 
            every street corner, and every sunset has a story worth remembering.
          </p>

          <p className="text-lg text-gray-400 leading-8">
            Our platform provides an interactive world map where you can pin your 
            locations, write detailed journal entries, and attach your feelings to 
            each specific spot on the globe.
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-2 bg-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475"
            alt="product"
            className="relative w-full h-[500px] object-cover rounded-2xl shadow-2xl border border-white/10"
          />
        </div>
      </div>
    </section>
  );
};

export default Product;