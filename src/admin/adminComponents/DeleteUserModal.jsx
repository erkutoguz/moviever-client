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
import DeleteUserIcon from "../../assets/icons/DeleteUserIcon";
import { useAppContext } from "../../context/appContext";

const DeleteUserModal = ({ updateUsers, userId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { deleteUserById } = useAppContext();
  return (
    <div>
      <Button
        onPress={onOpen}
        aria-label="delete-review-button"
        className="bg-transparent"
      >
        <DeleteUserIcon className="text-red-500 w-5" />
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
                Delete User
              </ModalHeader>
              <ModalBody>
                <p>Do you want to delete user?</p>
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
                    await deleteUserById(userId);
                    await updateUsers(userId);
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

export default DeleteUserModal;
