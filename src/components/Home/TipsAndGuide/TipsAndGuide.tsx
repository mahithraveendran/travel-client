import DrdSection from "@/components/shared/DrdSection";
import RootContainer from "@/components/shared/RootContainer";
import { FaFlagCheckered } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { RiInformation2Fill } from "react-icons/ri";

const TipsAndGuide = () => {
  return (
    <div className="pb-20">
      <DrdSection
        name="Tips and Guide"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, debitis!"
      />
      <RootContainer>
        <div className="flex items-center justify-between gap-8">
          <div className="py-10 px-6 flex items-center justify-center border w-full">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <FaCircleCheck className="text-6xl" />
              </div>
              <h1 className="text-xl font-bold mt-4">
                Choose Your Destination
              </h1>
              <p>
              Travel Trek is a travel agency that specializes in creating custom travel experiences for our clients. We offer personalized travel packages that cater to your specific needs and desires. Our team of travel experts will work with you to create the perfect itinerary that will make your dream vacation a reality. Whether you are looking for a relaxing beach getaway, an adventurous trek through the mountains, or a cultural exploration of a new city, we have the knowledge and expertise to make it happen. Contact us today to start planning your dream vacation!

              </p>
            </div>
          </div>
          <div className="py-10 px-6 flex items-center justify-center border w-full">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <RiInformation2Fill className="text-6xl" />
              </div>
              <h1 className="text-xl font-bold mt-4">Request a travel</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                iste, veritatis numquam rerum dignissimos laborum culpa ut,
                officia facilis distinctio blanditiis? Possimus ratione ab
                suscipit vitae deserunt provident explicabo recusandae?
              </p>
            </div>
          </div>
          <div className="py-10 px-6 flex items-center justify-center border w-full">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <FaFlagCheckered className="text-6xl" />
              </div>
              <h1 className="text-xl font-bold mt-4">
                Enjoy Your Dream Destination
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                iste, veritatis numquam rerum dignissimos laborum culpa ut,
                officia facilis distinctio blanditiis? Possimus ratione ab
                suscipit vitae deserunt provident explicabo recusandae?
              </p>
            </div>
          </div>
        </div>
      </RootContainer>
    </div>
  );
};

export default TipsAndGuide;
