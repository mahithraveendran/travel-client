"use client";
import DrdCheckBox from "@/components/Form/DrdCheckBox";
import DrdForm from "@/components/Form/DrDForm";
import DrdInput from "@/components/Form/DrdInput";
import DrdTextArea from "@/components/Form/DrdTextArea";
import { selectUser } from "@/lib/redux/Feature/auth/authSlice";
import {
  useCheckTravelBuddyRequestQuery,
  useSendTravelBuddyRequestMutation,
} from "@/lib/redux/Feature/trip/tripApi";
import { useAppSelector } from "@/lib/redux/hooks";
import { requestValidationSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

const TravelRequestForm = ({ travelId }: { travelId: string }) => {
  const user = useAppSelector(selectUser);

  // send travel buddy request
  const [sendTravelBuddyRequest, travelBuddyStatus] =
    useSendTravelBuddyRequestMutation();

  // check travel buddy request
  const checkTravelBuddyRequestData = useCheckTravelBuddyRequestQuery(
    travelId,
    { skip: !user?.id || !travelId }
  );

  console.log({ checkTravelBuddyRequestData });

  // router
  const router = useRouter();

  const [defaultValues, setDefaultValues] = useState({
    name: user?.name,
    email: user?.email,
    comment: "",
    agree: false,
  });

  const handleTravelRequestSubmit = async (values: FieldValues) => {
    // if (!checkTravelBuddyRequestData?.data?.success) {
    //   // show error message
    //   toast.error(
    //     checkTravelBuddyRequestData?.data?.message ||
    //       "You can't send travel request to yourself"
    //   );
    //   return;
    // }

    try {
      const travelRequestRes = await sendTravelBuddyRequest({
        id: travelId,
        data: { userId: user?.id },
      }).unwrap();

      if (travelRequestRes?.success) {
        // show success message
        toast.success("Travel request sent successfully");

        // redirect to travel page
        router.push(`/travels/${travelId}`);
      }
    } catch (error: any) {
      // show error message
      toast.error(error?.data?.message || "Failed to send travel request");
      console.log({ error });
    }
  };

  // default values not set initial render
  useEffect(() => {
    setDefaultValues({
      name: user?.name,
      email: user?.email,
      comment: "",
      agree: false,
    });
  }, [user, travelId]);

  return (
    <>
      {!checkTravelBuddyRequestData?.data?.success ? (
        <div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-drd-green py-10">
            Travel Request Form
          </h1>
          <DrdForm
            onSubmit={handleTravelRequestSubmit}
            defaultValues={defaultValues}
            resolver={zodResolver(requestValidationSchema)}
          >
            <div className="flex items-center justify-between gap-4">
              <DrdInput name="name" label="Name" type="text" disabled />
              <DrdInput name="email" label="Email" type="email" disabled />
            </div>
            <div>
              <DrdTextArea name="comment" label="Comment" required />
            </div>
            <div>
              <DrdCheckBox
                name="agree"
                label="Accept Terms and Conditions"
                required
              />
            </div>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={travelBuddyStatus.isLoading}
              disabled={travelBuddyStatus.isLoading}
            >
              Submit
            </Button>
          </DrdForm>
        </div>
      ) : (
        <div className="text-red-500 text-center flex items-center justify-center h-full">
          <div>
            <h2>
              Already sent travel request, Please try with other travel buddy.
            </h2>
            <Link href="/dashboard/user/travel-request-history">
              <Button type="primary" size="large" block className="mt-4">
                See your Requests
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TravelRequestForm;
