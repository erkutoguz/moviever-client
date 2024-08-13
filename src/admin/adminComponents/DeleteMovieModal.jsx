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
import DeleteIcon from "../../assets/icons/DeleteIcon";
import { useAppContext } from "../../context/appContext";

//UPDATE USERS

const DeleteMovieModal = ({ updateMovies, movieId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { deleteMovieById } = useAppContext();
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
                Delete Movie
              </ModalHeader>
              <ModalBody>
                <p>Do you want to delete movie? with ıd {movieId}</p>
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
                    await deleteMovieById(movieId);
                    await updateMovies();
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
};

export default DeleteMovieModal;
