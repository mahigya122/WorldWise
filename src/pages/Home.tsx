import bgImage from "../assets/bg.jpg";

const Home = () => {
  return (
    <div className="w-full p-2  bg-white ">
      <div className="relative w-full h-[90vh] overflow-hidden rounded-lg">
        <img
          src={bgImage}
          className="object-cover object-center h-full w-full brightness-50 opacity-90"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4 ">You travel the world.</h1>
          <h1 className="text-5xl font-bold mb-4 ">
            WorldWise keeps track of your adventures.
          </h1>
          <p className="text-xl">
            A world map that tracks your footsteps into every city you can think
            of.{" "}
          </p>
          <p className="text-xl">
            Never forget your wonderful experiences, and show your friends how
            you have wandered the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
