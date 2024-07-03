import UpdateTravelForm from "@/components/Home/Travel/form/TripUpdateForm";

interface IEditTripPageProps {
  searchParams: {
    tripId: string;
  };
}

const EditTripPage = ({ searchParams }: IEditTripPageProps) => {
  console.log({ searchParams });
  const { tripId } = searchParams;

  return (
    <div>
      <UpdateTravelForm tripId={tripId} />
    </div>
  );
};

export default EditTripPage;
