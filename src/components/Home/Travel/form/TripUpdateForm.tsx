"use client";

import fallbackImage from "@/asset/images/fallbackImage.jpg";
import DrdDashboardTitle from "@/components/Dashboard/shared/DrdDashboardTitle";
import DrdActivitiesInput from "@/components/Form/DrdActivitiesInput";
import DrdDateRangePicker from "@/components/Form/DrdDateRangePicker";
import DrdForm from "@/components/Form/DrDForm";
import DrdImageUpload from "@/components/Form/DrdImageUpload";
import DrdInput from "@/components/Form/DrdInput";
import DrdSelect from "@/components/Form/DrdSelect";
import DrdTextArea from "@/components/Form/DrdTextArea";
import { useUpdateTripMutation } from "@/lib/redux/Feature/admin/trips/adminTipApi";
import { useGetTripByIdQuery } from "@/lib/redux/Feature/trip/tripApi";
import { TravelType } from "@/types";
import { uploadAndGetImageUrl } from "@/utils/uploadImage";
import { updateTravelSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

//generate a select options for travel type
const travelTypeOptions = Object.keys(TravelType).map((key) => ({
  label: key,
  value: TravelType[key as keyof typeof TravelType],
}));

const UpdateTravelForm = ({
  tripId,
  editBy,
}: {
  tripId: string | null;
  editBy?: "user" | "admin";
}) => {
  // react hook
  const [images, setImages] = useState<any>([]);
  const [defaultData, setDefaultData] = useState<any>({});

  // next js hook
  const router = useRouter();

  // redux
  const [updateTravel, updateTravelStatus] = useUpdateTripMutation();
  const {
    data: travelData,
    isLoading,
    isError,
  } = useGetTripByIdQuery(tripId, { skip: !tripId });

  useEffect(() => {
    if (!isLoading && travelData) {
      const defaultValues = {
        destination: travelData?.data?.destination,
        type: travelData?.data?.type,
        startDate: dayjs(travelData?.data?.startDate),
        endDate: dayjs(travelData?.data?.endDate),
        budget: String(travelData?.data?.budget),
        description: travelData?.data?.description,
        activities: travelData?.data?.activities,
        image: travelData?.data?.image,
      };
      setDefaultData(defaultValues);
      console.log({ fetchedData: defaultValues });
    }
  }, [tripId, travelData, isLoading]);

  const handlePostTravel = async (values: FieldValues) => {
    const formattedStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
    const formattedEndDate = dayjs(values.endDate).format("YYYY-MM-DD");

    const imageUploadPromises = images.map((image: any) =>
      uploadAndGetImageUrl(image)
    );
    const imgUrls = await Promise.all(imageUploadPromises);

    values.budget = Number(values.budget);

    if (imgUrls && imgUrls.length > 0) {
      values.image = imgUrls[0];
      values.photos = imgUrls;
    }

    const postTravelData = {
      ...values,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    try {
      const updateRes = await updateTravel({
        id: tripId,
        trip: postTravelData,
      }).unwrap();

      if (updateRes?.success) {
        toast.success("Travel posted successfully");
        if (editBy === "user") {
          router.push("/dashboard/user/my-posted-travel");
        } else {
          router.push("/dashboard/admin/trip-management");
        }
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to post travel");
    }
  };

  return (
    <div>
      <DrdDashboardTitle name="Update a Trip" />
      {!isLoading && Object.keys(defaultData).length > 0 && (
        <div>
          <div className="border rounded-md p-8 max-w-[600px] w-full bg-drd-light-green mx-auto">
            <h1 className="text-center text-2xl mb-4 font-bold">Update Trip</h1>
            <DrdForm
              onSubmit={handlePostTravel}
              defaultValues={defaultData}
              resolver={zodResolver(updateTravelSchema)}
            >
              <div className="w-full flex items-center justify-between gap-4 flex-col md:flex-row ">
                <DrdInput
                  name="destination"
                  label="Destination"
                  type="text"
                  placeholder="Enter your destination"
                  required
                />
                <DrdSelect
                  name="type"
                  options={travelTypeOptions}
                  placeholder="Select a type"
                  label="Travel type"
                  required
                />
              </div>
              <div className="w-full flex items-center justify-between gap-4 flex-col md:flex-row ">
                <DrdDateRangePicker
                  name="startDate"
                  label="Start Date"
                  required
                />
                <DrdDateRangePicker name="endDate" label="End Date" required />
              </div>
              <div>
                <DrdInput
                  name="budget"
                  label="Budget"
                  type="number"
                  placeholder="Enter your budget"
                  required
                />
              </div>

              <DrdTextArea
                name="description"
                label="Description"
                placeholder="Enter your Description"
                required
              />

              <div className="mb-4">
                <DrdActivitiesInput
                  name="activities"
                  label="Activities"
                  placeholder="Enter an activity"
                  required
                />
              </div>

              <div className="mb-4 flex justify-between gap-4 items-center">
                <DrdImageUpload setImages={setImages} />
                <Image
                  src={defaultData?.image || fallbackImage.src}
                  alt="travel image"
                  width={150}
                  height={150}
                  className="rounded-md border p-2"
                />
              </div>

              <div>
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  size="large"
                  disabled={updateTravelStatus?.isLoading}
                  loading={updateTravelStatus?.isLoading}
                >
                  Update
                </Button>
              </div>
            </DrdForm>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateTravelForm;
