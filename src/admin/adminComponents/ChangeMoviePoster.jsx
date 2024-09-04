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

const ChangeMoviePoster = ({ pictureUrl, setPoster }) => {
  const [isHovered, setHovered] = useState(false);
  const [image, setImage] = useState();
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
                    setPoster(image);
                    onClose();
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
    </div>
  );
};

export default ChangeMoviePoster;
