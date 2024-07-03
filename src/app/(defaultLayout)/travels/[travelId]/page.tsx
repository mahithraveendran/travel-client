import travelImage from "@/asset/images/auth/login-img.jpg";
import ImageSlider from "@/components/Home/Travel/SingleTravel/ImageSlider";
import SingleTravelTextDetails from "@/components/Home/Travel/SingleTravel/SingleTravelTextDetails";
import DrdSection from "@/components/shared/DrdSection";
import PageStarter from "@/components/shared/PageStarter";
import RootContainer from "@/components/shared/RootContainer";
import { config } from "@/config";
import { getServerSideData } from "@/utils/getServerSideData";
import { Image } from "antd";
import dynamic from "next/dynamic";
import Link from "next/link";

const TravelSteps = dynamic(
  () => import("@/components/Home/Travel/SingleTravel/TravelSteps"),
  { ssr: false }
);

const TravelRequest = dynamic(
  () => import("@/components/Home/Travel/SingleTravel/TravelRequest"),
  { ssr: false }
);

interface ITravelDetailsPageProps {
  params: {
    travelId: string;
  };
}

const TravelDetailsPage = async ({ params }: ITravelDetailsPageProps) => {
  const { travelId } = params;

  const travelData = await getServerSideData(
    `${config.apiUrl}/trips/${travelId}`
  );

  return (
    <div className="pb-20">
      <PageStarter name="Travel Details page">
        <h1 className="text-xl text-drd-yellow text-center mt-4 uppercase">
          {travelData?.data?.destination}
        </h1>
      </PageStarter>
      <div className="pt-10">
        <RootContainer>
          <div className="flex items-center justify-center md:justify-between flex-wrap md:flex-nowrap">
            <DrdSection name="Travel details" />
            <div className="text-center">
              <Link href={`/travel-request?travelId=${travelData?.data?.id}`}>
                <TravelRequest />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 pt-8 pb-16">
            <Image
              src={travelData?.data?.image || travelImage.src}
              style={{
                width: "100%",
                height: "100%",
              }}
              alt="travel image"
            />
            <SingleTravelTextDetails travel={travelData?.data} />
          </div>
          <TravelSteps travel={travelData?.data} />
          <DrdSection name="Travel Memories" />
          <div>
            <ImageSlider />
          </div>
        </RootContainer>
      </div>
    </div>
  );
};

export default TravelDetailsPage;
