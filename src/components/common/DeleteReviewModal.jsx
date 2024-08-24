/* eslint-disable no-unused-vars */
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
import { useAppContext } from "../../context/appContext";
import DeleteIcon from "../../assets/icons/DeleteIcon";

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
        <DeleteIcon className="text-red-500 w-5" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent className="text-textColor">
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
                  onPress={() => {
                    deleteReview(movieId, reviewId).then((res) => {
                      updateReviews();
                    });
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
