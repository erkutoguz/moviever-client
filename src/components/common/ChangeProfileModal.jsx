/* eslint-disable no-unused-vars */
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
import { useAppContext } from "../../context/appContext";
import { useState } from "react";
import EditIcon from "../../assets/icons/EditIcon";

const ChangeProfileModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    userProfilePicture,
    user,
    changeProfilePicture,
    removeProfilePicture,
  } = useAppContext();
  const [isHovered, setHovered] = useState(false);
  const [newProfile, setNewProfile] = useState("");

  const changeProfilePictureButton = () => {
    const formData = new FormData();
    formData.append("image", newProfile);
    return changeProfilePicture(formData);
  };

  return (
    <div>
      {userProfilePicture !== "null" ? (
        <div
          className="relative cursor-pointer"
          onClick={onOpen}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Avatar
            aria-label="change-profile-button"
            name={user}
            as="button"
            className={`transition-transform w-24 h-24 text-large `}
            color="secondary"
            isBordered
            src={userProfilePicture}
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
      ) : (
        <div
          className="relative cursor-pointer"
          onClick={onOpen}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Avatar
            aria-label="change-profile-button"
            name={user}
            as="button"
            className={`transition-transform w-24 h-24 text-large `}
            color="secondary"
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
      )}

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
                Change Profile Picture
              </ModalHeader>
              <ModalBody>
                <input
                  type="file"
                  accept="image/*"
                  className="mb-4 border border-gray-300 rounded-md p-2"
                  onChange={(e) => {
                    setNewProfile(e.target.files[0]);
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
                  color="danger"
                  aria-label="close-modal-button"
                  variant="light"
                  onPress={() => {
                    removeProfilePicture().then((res) => {
                      onClose();
                    });
                  }}
                >
                  Remove
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    changeProfilePictureButton().then((res) => {
                      onClose();
                    });
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

export default ChangeProfileModal;
