/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";

function AddWatchlistModal({ movieId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [watchlists, setWatchlists] = useState([]);
  const { fetchUserWatchlists, addMovieToWatchlist } = useAppContext();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchUserWatchlists().then((res) => {
        setWatchlists(res.data);
      });
    }
  }, [isOpen]);

  return (
    <div>
      <Button
        aria-label="add-watchlist-button"
        color="primary"
        variant="bordered"
        className=""
        onPress={onOpen}
      >
        + Add to Watchlist
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
                Add To Watchlist
              </ModalHeader>
              <ModalBody>
                <p>Select watchlist to add</p>
                {watchlists.length > 0 ? (
                  <CheckboxGroup
                    defaultValue={[watchlists[0]]}
                    value={selected}
                    onValueChange={setSelected}
                  >
                    {watchlists.map((w, i) => {
                      return (
                        <Checkbox key={i} value={w.id}>
                          {w.watchlistName}
                        </Checkbox>
                      );
                    })}
                  </CheckboxGroup>
                ) : (
                  <p>create watchlist</p>
                )}
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
                    await addMovieToWatchlist(selected, movieId);
                    onClose();
                  }}
                  aria-label="open-modal-button"
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddWatchlistModal;
