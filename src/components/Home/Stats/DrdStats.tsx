import bgImage from "@/asset/images/home/world-map.jpg";
import RootContainer from "@/components/shared/RootContainer";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";
import { FaPlaneDeparture } from "react-icons/fa6";
import { GiAirBalloon, GiWorld } from "react-icons/gi";

const DrdStats = () => {
  return (
    <div
      className="relative py-8 "
      style={{
        backgroundImage: `url('${bgImage.src}')`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-drd-dark-green  opacity-80"></div>
      <RootContainer className="z-30 relative">
        <div className="text-white flex items-center justify-center lg:justify-between gap-4 flex-wrap lg:flex-nowrap  min-h-[500px]">
          <div className="text-center space-y-6 text-xl font-bold flex flex-col items-center justify-center hover:border hover:bg-drd-green p-4 rounded-md ease-in-out hover:ease-in-out duration-300">
            <FaPlaneDeparture className="text-5xl text-drd-light-yellow text-center" />
            <h3>900+</h3>
            <p className="font-normal">Travel Packages</p>
          </div>
          <div className="text-center space-y-6 text-xl font-bold flex flex-col items-center justify-center hover:border hover:bg-drd-green p-4 rounded-md ease-in-out hover:ease-in-out duration-300">
            <GiWorld className="text-5xl text-drd-light-yellow text-center" />
            <h3>300+</h3>
            <p className="font-normal">Branches all over</p>
          </div>
          <div className="text-center space-y-6 text-xl font-bold flex flex-col items-center justify-center hover:border hover:bg-drd-green p-4 rounded-md ease-in-out hover:ease-in-out duration-300">
            <BsFillEmojiSunglassesFill className="text-5xl text-drd-light-yellow text-center" />
            <h3>600+</h3>
            <p className="font-normal">Our Expert Agent</p>
          </div>
          <div className="text-center space-y-6 text-xl font-bold flex flex-col items-center justify-center hover:border hover:bg-drd-green p-4 rounded-md ease-in-out hover:ease-in-out duration-300">
            <GiAirBalloon className="text-5xl text-drd-light-yellow text-center" />
            <h3>200+</h3>
            <p className="font-normal">Successful Travels</p>
          </div>
        </div>
      </RootContainer>
    </div>
  );
};

export default DrdStats;
