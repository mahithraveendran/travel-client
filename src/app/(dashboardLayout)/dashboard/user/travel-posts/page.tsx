"use client";

import DrdDashboardTitle from "@/components/Dashboard/shared/DrdDashboardTitle";
import DrdActivitiesInput from "@/components/Form/DrdActivitiesInput";
import DrdDateRangePicker from "@/components/Form/DrdDateRangePicker";
import DrdForm from "@/components/Form/DrDForm";
import DrdImageUpload from "@/components/Form/DrdImageUpload";
import DrdInput from "@/components/Form/DrdInput";
import DrdSelect from "@/components/Form/DrdSelect";
import DrdTextArea from "@/components/Form/DrdTextArea";
import { useCreateTripMutation } from "@/lib/redux/Feature/trip/tripApi";
import { TravelType } from "@/types";
import { uploadAndGetImageUrl } from "@/utils/uploadImage";
import { postTravelSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

//generate a select options for travel type
const travelTypeOptions = Object.keys(TravelType).map((key) => ({
  label: key,
  value: TravelType[key as keyof typeof TravelType],
}));

const TravelPosts = () => {
  const [images, setImages] = useState<any>([]);

  const [postTravel, postTravelStatus] = useCreateTripMutation();

  const router = useRouter();

  const { control } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "activities",
  });

  // handle post travel
  const handlePostTravel = async (values: FieldValues) => {
    const formattedStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
    const formattedEndDate = dayjs(values.endDate).format("YYYY-MM-DD");

    // // Upload all images and get their URLs
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

    console.log({ postTravelData });

    try {
      const postRes = await postTravel(postTravelData).unwrap();

      console.log(postRes);

      if (postRes?.success) {
        toast.success("Travel posted successfully");

        // router.push(`/travels/${postRes?.data?.id}`);
        router.push(`/dashboard/user/my-posted-travel`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to post travel");
      console.log(error);
    }
  };

  // default value for travel with some random value
  // const defaultValues = {
  //   destination: "This destination is for testing purpose",
  //   type: "ADVENTURE",
  //   budget: "654546456",
  //   description: "This is a description for testing purpose",
  //   startDate: dayjs("2022-09-09"),
  //   endDate: dayjs("2022-09-10"),
  //   activities: ["Activity 1", "Activity 2"],
  // };

  return (
    <div>
      <DrdDashboardTitle name="Post a Travels" />
      <div className="border rounded-md p-8 max-w-[600px] w-full bg-drd-light-green mx-auto">
        <h1 className="text-center text-2xl mb-4 font-bold">
          Travel Post Form
        </h1>
        <DrdForm
          onSubmit={handlePostTravel}
          resolver={zodResolver(postTravelSchema)}
          // defaultValues={defaultValues}
        >
          <div className="w-full flex items-center justify-between gap-4 flex-col md:flex-row ">
            <DrdInput
              name="destination"
              label="Destination"
              type="text"
              placeholder="Enter your budget"
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
            <DrdDateRangePicker name="startDate" label="Start Date" required />
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

          <div className="mb-4">
            <DrdImageUpload setImages={setImages} multiple={3} />
          </div>

          <div>
            <Button
              type="primary"
              block
              htmlType="submit"
              size="large"
              disabled={postTravelStatus?.isLoading}
              loading={postTravelStatus?.isLoading}
            >
              Post
            </Button>
          </div>
        </DrdForm>
      </div>
    </div>
  );
};

export default TravelPosts;
