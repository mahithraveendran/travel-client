import UpdateTravelForm from "@/components/Home/Travel/form/TripUpdateForm";

interface IEditTripPageProps {
  searchParams: {
    tripId: string;
    editBy: "user" | "admin";
  };
}

const EditTravelPage = ({ searchParams }: IEditTripPageProps) => {
  console.log({ searchParams });
  const { tripId, editBy } = searchParams;

  return (
    <div>
      <UpdateTravelForm tripId={tripId} editBy={editBy} />
    </div>
  );
};

export default EditTravelPage;
