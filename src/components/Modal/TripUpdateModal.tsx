import { Modal } from "antd";
import UpdateTravelForm from "../Home/Travel/form/TripUpdateForm";

interface ITripUpdateModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  tripId: string | null;
}

const TripUpdateModal = ({
  isModalOpen,
  setIsModalOpen,
  tripId,
}: ITripUpdateModalProps) => {
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        style={{
          maxWidth: "900px",
          width: "100%",
        }}
        width={700}
      >
        <UpdateTravelForm tripId={tripId} />
      </Modal>
    </>
  );
};

export default TripUpdateModal;
