/* eslint-disable no-unused-vars */
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useAppContext } from "../../context/appContext";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const CreateWatchlistModal = ({ updateWatchlists }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { createWatchlist } = useAppContext();
  const [watchlistName, setWatchlistName] = useState("");
  return (
    <div>
      <Button
        aria-label="add-watchlist-button"
        color="primary"
        variant="bordered"
        className=""
        onPress={onOpen}
      >
        + Create Watchlist
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
                Create Watchlist
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Watchlist name"
                  value={watchlistName}
                  onChange={(e) => setWatchlistName(e.target.value)}
                  autoFocus
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  aria-label="close-modal-button"
                  variant="light"
                  onPress={() => {
                    setWatchlistName("");
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    createWatchlist(watchlistName).then((res) => {
                      if (updateWatchlists) {
                        updateWatchlists();
                      }
                      onClose();
                    });
                  }}
                  aria-label="open-modal-button"
                >
                  Craete Watchlist
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateWatchlistModal;
