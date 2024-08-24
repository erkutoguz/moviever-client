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
  Pagination,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import CreateWatchlistModal from "./CreateWatchlistModal";

function AddWatchlistModal({ movieId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [watchlists, setWatchlists] = useState([]);
  const [page, setPage] = useState(0);
  const [initialData, setInitialData] = useState([]);
  const { fetchUserWatchlistsPreview, addMovieToWatchlist } = useAppContext();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchUserWatchlistsPreview(page).then((res) => {
        setWatchlists(res.data.watchlistPreviews);
        setInitialData(res.data);
      });
    }
  }, [isOpen]);

  const updateWatchlist = () => {
    fetchUserWatchlistsPreview(page).then((res) => {
      setWatchlists(res.data.watchlistPreviews);
      setInitialData(res.data);
    });
  };

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
        <ModalContent className="text-textColor">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-textColor">
                Add To Watchlist
              </ModalHeader>
              <ModalBody>
                <p>Select watchlist to add</p>
                <CreateWatchlistModal updateWatchlists={updateWatchlist} />
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
                    <Pagination
                      total={initialData.totalPages}
                      initialPage={1}
                      className="mt-8"
                      size="sm"
                      onChange={(p) => {
                        setPage(p - 1);
                      }}
                    />
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
