import bgImage from "../assets/bg.jpg";

const Home = () => {
  return (
    <div className="w-full bg-white">
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src={bgImage}
          className="object-cover object-center h-full w-full brightness-50 opacity-90"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-6xl font-bold mb-4 text-center">You travel the world.</h1>
          <h1 className="text-6xl font-bold mb-8 text-center">
            WorldWise keeps track of your adventures.
          </h1>
          <p className="text-xl text-center max-w-2xl">
            A world map that tracks your footsteps into every city you can think
            of.
          </p>
          <p className="text-xl text-center max-w-2xl mt-2">
            Never forget your wonderful experiences, and show your friends how
            you have wandered the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
