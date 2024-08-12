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

const RemoveMovieFromWatchlistModal = ({
  watchlistId,
  movieId,
  updateMovies,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { removeMovieFromWatchlist } = useAppContext();
  return (
    <div className="absolute top-0 right-0">
      <Button
        onPress={onOpen}
        aria-label="delete-review-button"
        className="bg-transparent"
      >
        <DeleteIcon className="text-danger-600" />
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
                Remove Movie From Watchlist
              </ModalHeader>
              <ModalBody>
                <p>Do you want to remove this movie from watchlist?</p>
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
                    removeMovieFromWatchlist(watchlistId, movieId).then(
                      (res) => {
                        updateMovies(movieId);
                        onClose();
                      }
                    );
                  }}
                  aria-label="open-modal-button"
                >
                  Remove
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RemoveMovieFromWatchlistModal;
