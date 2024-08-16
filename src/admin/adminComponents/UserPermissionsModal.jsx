/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import AuthIcon from "../../assets/icons/AuthIcon";
import { useAppContext } from "../../context/appContext";
import { useState } from "react";
import LockIcon from "../../assets/icons/LockIcon";
import UnlockIcon from "../../assets/icons/UnlockIcon";

const UserPermissionsModal = ({ updateUsers, userId, status }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newStatus, setNewStatus] = useState(status);
  const { updateUserStatus } = useAppContext();

  return (
    <div>
      <Button
        onPress={onOpen}
        aria-label="delete-review-button"
        className="bg-transparent"
      >
        <AuthIcon className="text-starColor w-5" />
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
                User Permissions
              </ModalHeader>
              <ModalBody className="flex flex-col items-center">
                <Switch
                  isSelected={newStatus}
                  onValueChange={setNewStatus}
                  startContent={<UnlockIcon />}
                  endContent={<LockIcon />}
                >
                  {newStatus ? <p>Active</p> : <p>Passive</p>}
                </Switch>
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
                    updateUserStatus(userId, newStatus)
                      .then((res) => {
                        updateUsers();
                      })
                      .then((res) => {
                        onClose();
                      });
                  }}
                  aria-label="open-modal-button"
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserPermissionsModal;
