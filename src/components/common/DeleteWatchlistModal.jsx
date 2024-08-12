/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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

const DeleteWatchlistModal = ({ watchlistId, updateWatchlists }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { deleteWatchlist } = useAppContext();

  return (
    <div>
      <Button
        aria-label="rename-watchlist-button"
        color="primary"
        className="bg-transparent px-0 max-w-5 min-w-5"
        onPress={onOpen}
      >
        <DeleteIcon className="text-red-500 w-5" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        placement={"center"}
      >
        <ModalContent className="text-textColor">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Watchlist
              </ModalHeader>
              <ModalBody>
                <p>Do you want to delete your watchlist?</p>
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
                    await deleteWatchlist(watchlistId).then((res) => {
                      updateWatchlists();
                      onClose();
                    });
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

export default DeleteWatchlistModal;
