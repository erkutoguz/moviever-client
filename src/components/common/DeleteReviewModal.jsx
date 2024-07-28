/* eslint-disable react/prop-types */
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import deleteIcon from "../../assets/icons/delete-icon.png";
import { useAppContext } from "../../context/appContext";

function DeleteReviewModal({ movieId, reviewId, updateReviews }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { deleteReview } = useAppContext();
  return (
    <div>
      <Button
        onPress={onOpen}
        aria-label="delete-review-button"
        className="bg-transparent"
      >
        <img src={deleteIcon} alt="delete-icon" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Review
              </ModalHeader>
              <ModalBody>
                <p>Do you want to delete your review?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  aria-label="close-modal-button"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    await deleteReview(movieId, reviewId);
                    await updateReviews();
                    onClose();
                  }}
                  aria-label="open-modal-button"
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default DeleteReviewModal;
