import SingleTravelTextDetails from "@/components/Home/Travel/SingleTravel/SingleTravelTextDetails";
import TravelRequestForm from "@/components/Home/Travel/TravelRequest/TravelRequestForm";
import DrdSection from "@/components/shared/DrdSection";
import PageStarter from "@/components/shared/PageStarter";
import RootContainer from "@/components/shared/RootContainer";
import { config } from "@/config";
import { getServerSideData } from "@/utils/getServerSideData";

interface ITravelRequestPageProps {
  searchParams: {
    travelId: string;
  };
}

const TravelRequestPage = async ({ searchParams }: ITravelRequestPageProps) => {
  const { travelId } = searchParams;

  const travelData = await getServerSideData(
    `${config.apiUrl}/trips/${travelId}`
  );

  return (
    <div className="">
      <PageStarter name="Travel Request page">
        <h1 className="text-xl text-drd-yellow text-center mt-4 uppercase">
          {travelData?.data?.destination}
        </h1>
      </PageStarter>
      <div className="pt-20 pb-10">
        <RootContainer>
          <div>
            <DrdSection name="Travel Request" />
          </div>
          <div className="py-10 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <SingleTravelTextDetails travel={travelData?.data} />
              </div>
              <div className="border w-full p-8 bg-drd-light-green mx-auto">
                <TravelRequestForm travelId={travelData?.data?.id} />
              </div>
            </div>
          </div>
        </RootContainer>
      </div>
    </div>
  );
};

export default TravelRequestPage;
