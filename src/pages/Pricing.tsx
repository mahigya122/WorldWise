const Pricing = () => {
  return (
    <section className="min-h-[calc(100vh-80px)] px-6 py-20 bg-zinc-900 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        <div className="relative group order-2 md:order-1">
          <div className="absolute -inset-2 bg-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538"
            alt="pricing"
            className="relative w-full h-[500px] object-cover rounded-2xl shadow-2xl border border-white/10"
          />
        </div>

        <div className="order-1 md:order-2">
          <h1 className="text-5xl font-black mb-8 tracking-tighter uppercase leading-tight">
            Simple pricing.<br/>
            <span className="text-blue-500 underline decoration-4 underline-offset-8">Just $9/month.</span>
          </h1>

          <p className="text-lg text-gray-400 leading-8 mb-6">
            We believe in transparency. No hidden fees, no complex tiers. 
            One price for full access to all features, including AI-assisted 
            journaling and unlimited map pins.
          </p>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-gray-300">
              <span className="text-blue-500 font-bold">✓</span> Unlimited travel pins
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <span className="text-blue-500 font-bold">✓</span> AI Highlight generation
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <span className="text-blue-500 font-bold">✓</span> Secure cloud storage
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

