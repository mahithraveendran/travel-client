"use client";

import SearchBox from "@/components/Home/Hero/SearchBox";
import DrdPagination from "@/components/Home/Travel/DrdPagination";
import SingleTravelCard from "@/components/Home/Travel/SingleTravelCard";
import DrdLoader from "@/components/shared/DrdLoader";
import DrdSection from "@/components/shared/DrdSection";
import PageStarter from "@/components/shared/PageStarter";
import RootContainer from "@/components/shared/RootContainer";
import { travelPaginationPerPage } from "@/constant/paginationControl";
import { useGetTripQuery } from "@/lib/redux/Feature/trip/tripApi";
import { selectTripQueries, setPage } from "@/lib/redux/Feature/trip/tripSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import { ITrip } from "@/types";
import { Divider, Empty } from "antd";

const TravelsPage = () => {
  const tripQueries = useAppSelector(selectTripQueries);

  const { data: travels, isLoading, isError } = useGetTripQuery(tripQueries);

  console.log({ travels, isLoading, isError });

  if (isLoading)
    return (
      <div className="z-20">
        <PageStarter name="All Travels">
          <RootContainer>
            <SearchBox />
          </RootContainer>
        </PageStarter>
        <div className="pt-20 pb-10 bg-drd-light-green">
          <RootContainer>
            <DrdSection name="View Our Travel" />
            <DrdLoader className="h-[300px]" />
          </RootContainer>
        </div>
        <Divider />
      </div>
    );

  return (
    <div className="z-20">
      <PageStarter name="All Travels">
        <RootContainer>
          <SearchBox />
        </RootContainer>
      </PageStarter>
      <div className=" pb-10 bg-drd-light-green">
        <RootContainer>
          <DrdSection name="View Our Travel" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {travels?.data?.length > 0 &&
              travels?.data?.map((travel: ITrip) => (
                <SingleTravelCard key={travel.id} travel={travel} />
              ))}
          </div>
          {travels?.data?.length === 0 && (
            <div className="text-center flex items-center justify-center">
              <Empty
                description={
                  <span className="text-red-400 font-bold">
                    No Travel Found
                  </span>
                }
              />
              ;
            </div>
          )}
        </RootContainer>
      </div>
      <Divider />
      <div className="pb-8 flex items-center justify-center">
        <DrdPagination
          metaData={travels?.meta}
          setPage={setPage}
          paginationPerPage={travelPaginationPerPage}
        />
      </div>
    </div>
  );
};

export default TravelsPage;
