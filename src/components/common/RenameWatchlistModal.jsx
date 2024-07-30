/* eslint-disable react/prop-types */
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
import renameIcon from "../../assets/icons/rename-icon.png";

const RenameWatchlistModal = ({
  watchlistId,
  currentName,
  updateWatchlists,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { renameWatchlist } = useAppContext();
  const [watchlistName, setWatchlistName] = useState(currentName);

  return (
    <div>
      <Button
        aria-label="rename-watchlist-button"
        color="primary"
        className="bg-transparent mt-8 px-0 max-w-4 min-w-4"
        onPress={onOpen}
      >
        <img src={renameIcon} className="" alt="rename-icon" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        placement={"center"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Rename Your Watchlist
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder={currentName}
                  value={watchlistName}
                  onChange={(e) => {
                    setWatchlistName(e.target.value);
                  }}
                />
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
                    // eslint-disable-next-line no-unused-vars
                    renameWatchlist(watchlistId, watchlistName).then((res) => {
                      console.log(res);
                      updateWatchlists();
                      onClose();
                    });
                  }}
                  aria-label="open-modal-button"
                >
                  Change name
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RenameWatchlistModal;
