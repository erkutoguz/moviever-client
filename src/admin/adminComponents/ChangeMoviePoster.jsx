/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import EditIcon from "../../assets/icons/EditIcon";
import { useAppContext } from "../../context/appContext";

const ChangeMoviePoster = ({ pictureUrl, movieId }) => {
  const [isHovered, setHovered] = useState(false);
  const { updateMoviePoster } = useAppContext();
  const [image, setImage] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <div
        onClick={onOpen}
        className="relative cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Avatar
          aria-label="change-movie-poster-button"
          as="button"
          className={`transition-transform w-24 h-24 text-large `}
          color="secondary"
          src={pictureUrl}
          isBordered
        />
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-500 rounded-full ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute lg:inset-0 -top-1 -right-1 flex justify-center items-center transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "lg:opacity-0"
          }`}
        >
          <EditIcon className="w-6" />
        </div>
      </div>
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
              <ModalHeader className="flex flex-col gap-1 text-textColor">
                Change Movie Poster
              </ModalHeader>
              <ModalBody>
                <input
                  type="file"
                  accept="image/*"
                  required
                  className="mb-4 border border-gray-300 rounded-md p-2 text-textColor"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
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
                  onClick={() => {
                    if (image !== null) {
                      const formdata = new FormData();
                      formdata.append("poster", image);
                      updateMoviePoster(formdata, movieId)
                        .then((res) => {
                          setShowPopup(true);
                          setTimeout(() => {
                            setShowPopup(false);
                          }, 2000);
                          onClose();
                        })
                        .catch((e) => {
                          setErrorMessage("Something went wrong");
                        });
                    }
                  }}
                  aria-label="open-modal-button"
                >
                  Change
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {showPopup && (
        <div className="fixed top-24 z-50 right-0 sm:right-2 md:right-4 xl:right-8 bg-green-500 text-white p-4 rounded shadow-lg">
          <p>Movie poster successfully updated!</p>
        </div>
      )}
      {errorMessage && (
        <div className="fixed top-24 z-50 right-0 sm:right-2 md:right-4 xl:right-8 bg-red-500 text-white p-4 rounded shadow-lg">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ChangeMoviePoster;
