import { Link } from "react-router-dom";
import bgImage from "../assets/bg.jpg";

const Home = () => {
  return (
    <div className="w-full bg-[#09090b] relative overflow-hidden">
      {/* Dreamy Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse-soft" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse-soft" />
      
      <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center">
        <img
          src={bgImage}
          alt="Travel Background"
          className="absolute inset-0 object-cover object-center h-full w-full brightness-[0.2] scale-110 blur-[2px]"
        />
        
        <div className="relative z-10 flex flex-col items-center justify-center text-white px-6 text-center">
          <div className="mb-4 inline-block px-4 py-1.5 glass rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">
             Discover Your Soul's Journey
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] uppercase">
            Travel the world.<br/>
            <span className="aurora-text">Capture the Dream.</span>
          </h1>
          
          <p className="text-lg md:text-xl max-w-2xl text-gray-400 font-medium leading-relaxed mb-12 italic">
            "A world map that tracks your footsteps into every dream you've lived. 
            Never let a single sunset fade from your memory."
          </p>

          <Link
            to="/login"
            className="group relative px-12 py-5 bg-white text-black font-black rounded-2xl text-sm uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10">Start Your Adventure</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
