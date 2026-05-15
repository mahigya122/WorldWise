import { Link } from "react-router-dom";
import bgImage from "../assets/bg.jpg";

const Home = () => {
  return (
    <div className="w-full bg-zinc-900">
      <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden">
        <img
          src={bgImage}
          alt="Travel Background"
          className="object-cover object-center h-full w-full brightness-[0.3]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-center tracking-tighter leading-tight">
            YOU TRAVEL THE WORLD.<br/>
            <span className="text-blue-500">WORLDWISE KEEPS TRACK.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-center max-w-2xl text-gray-300 leading-relaxed mb-10">
            A world map that tracks your footsteps into every city you can think
            of. Never forget your wonderful experiences, and show your friends 
            how you have wandered the world.
          </p>

          <Link
            to="/login"
            className="px-10 py-4 bg-blue-600 text-white font-black rounded-lg text-lg uppercase tracking-[0.2em] hover:bg-blue-500 hover:scale-105 transition-all shadow-2xl shadow-blue-500/40"
          >
            Start Tracking Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
