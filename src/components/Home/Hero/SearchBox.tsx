"use client";
import DrdDateRangePicker from "@/components/Form/DrdDateRangePicker";
import DrdForm from "@/components/Form/DrDForm";
import DrdInput from "@/components/Form/DrdInput";
import DrdSelect from "@/components/Form/DrdSelect";
import {
  resetTripQueries,
  selectTripQueries,
  setDestination,
  setEndDates,
  setSearchTerm,
  setStartDates,
  setType,
} from "@/lib/redux/Feature/trip/tripSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { FaLocationDot } from "react-icons/fa6";

import { TravelType } from "@/types";
import dayjs from "dayjs";

// adventure, leisure, business
// const travelTypes = [
//   { value: "adventure", label: "Adventure" },
//   { value: "leisure", label: "Leisure" },
//   { value: "business", label: "Business" },
// ];

// generate travel types from the enum
const travelTypes = Object.values(TravelType).map((type) => ({
  value: type,
  label: type,
}));

const SearchBox = () => {
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const travelQueries = useAppSelector(selectTripQueries);

  const router = useRouter();

  const handleSearchTravels = async (data: FieldValues) => {
    if (!data?.startDates && !data?.destination && !data?.type) {
      // trigger for get all data from the server
      dispatch(resetTripQueries());
    }

    console.log(data);

    let formattedDate = "";

    if (data?.startDates) {
      // const startDate = data?.startDates["$d"];
      // const customDate = startDate.toLocaleDateString("en-US");
      // const [month, day, year] = customDate.split("/");
      // const formattedDateNew = `${year}-${month.padStart(
      //   2,
      //   "0"
      // )}-${day.padStart(2, "0")}`;

      // formattedDate = formattedDateNew;
      formattedDate = dayjs(data?.startDates).format("YYYY-MM-DD");
    }

    if (data?.endDates) {
      dispatch(setEndDates(dayjs(data?.endDates).format("YYYY-MM-DD")));
    }

    if (data?.destination) {
      dispatch(setDestination(data.destination));
    }

    if (data?.type) {
      dispatch(setType(data.type));
    }

    if (formattedDate) {
      dispatch(setStartDates(formattedDate));
    }

    if (data?.searchTerm) {
      dispatch(setSearchTerm(data.searchTerm));
    }

    if (pathname !== "/travels") {
      router.push("/travels");
    }
  };

  return (
    <div
      className="bg-white bg-opacity-80 w-full mx-auto mt-4 px-10 py-6 rounded-3xl text-drd-green"
      data-aos="fade-up"
    >
      <DrdForm
        onSubmit={handleSearchTravels}
        defaultValues={{
          destination: travelQueries.destination,
          // startDates: dayjs(travelQueries.startDates),
          type: travelQueries.type,
        }}
      >
        <div className=" flex flex-col lg:flex-row items-center justify-between md:gap-8">
          <div className="flex flex-col lg:flex-row items-center md:items-end justify-center md:gap-8">
            <div className="w-full lg:w-auto">
              <DrdInput
                placeholder="Search Destination"
                name="destination"
                type="text"
                label="Destination"
                prefix={<FaLocationDot color="#3a643b" />}
              />
            </div>
            <div className="w-full lg:w-auto">
              <DrdDateRangePicker name="startDates" label="Start Date" />
            </div>
            <div className="w-full lg:w-auto">
              <DrdDateRangePicker name="endDates" label="End Date" />
            </div>
            <div className="w-full lg:w-auto">
              <DrdSelect
                name="type"
                options={travelTypes}
                label="Travel Types"
                placeholder="Select Type"
              />
            </div>
            <div className="w-full lg:w-auto">
              {pathname === "/travels" && (
                <DrdInput
                  name="searchTerm"
                  label="Search"
                  type="text"
                  placeholder="e.g fun"
                />
              )}
            </div>
          </div>
          <Button
            className="w-full lg:w-auto"
            type="primary"
            size="large"
            htmlType="submit"
            icon={<SearchOutlined />}
          >
            Search
          </Button>
        </div>
      </DrdForm>
    </div>
  );
};

export default SearchBox;
