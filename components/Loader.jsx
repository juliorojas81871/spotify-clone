import { LeapFrog } from "@uiball/loaders";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="h-screen bg-black">
      <div
        className="pt-40 flex flex-col items-center space-y-4"
      >
        <span className="relative w-[400px] h-[250px] lg:w-[550px] lg:h-[240px]">
          <Image
            src="/assets/spotify-login.jpg"
            fill
            objectFit="contain"
            className="animate-pulse"
          />
        </span>
        <LeapFrog size={50} color="#15883e" />
      </div>
    </div>
  );
};

export default Loader;
