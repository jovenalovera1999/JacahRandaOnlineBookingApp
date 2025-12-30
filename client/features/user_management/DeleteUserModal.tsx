"use client";

import Button from "@/components/ui/Button";
import FloatingLabelInputField from "@/components/ui/FloatingLabelInputField";
import FloatingLabelSelectField from "@/components/ui/FloatingLabelSelectField";
import Form from "@/components/ui/Form";
import { Modal } from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import { RoleColumns } from "@/interfaces/RoleInterface";
import { UserColumns, UserFieldsErrors } from "@/interfaces/UserInterface";
import UserService from "@/services/UserService";
import { FormEvent, useCallback, useEffect, useState } from "react";

interface DeleteUserModalProps {
  selectedUser: UserColumns | null;
  isOpen: boolean;
  onUserDeleted: (
    status: "success" | "failed" | "warning" | "others",
    message: string
  ) => void;
  onReloadUsers: () => void;
  onClose: () => void;
}

export default function DeleteUserModal({
  selectedUser,
  isOpen,
  onUserDeleted,
  onReloadUsers,
  onClose,
}: DeleteUserModalProps) {
  // States
  const [roles, setRoles] = useState<RoleColumns[]>([]);

  const [isStoring, setIsStoring] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<UserFieldsErrors>({});

  const handleDestroyUser = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsStoring(true);

      const payload = {
        name: name,
        address: address,
        contact_number: contactNumber,
        email: email,
        username: username,
        role: role,
      };

      const { status, data } = await UserService.destroyUser(
        selectedUser?.user_id!
      );

      if (status !== 200) {
        console.error(
          "Unexpected status error during add user at DeleteUserModal.tsx: ",
          status
        );
        return;
      }

      onUserDeleted("success", data.message);
      onReloadUsers();

      onClose();
    } catch (error: any) {
      if (error.response && error.response.status !== 422) {
        console.error(
          "Unexpected server error during add user at DeleteUserModal.tsx: ",
          error
        );
        return;
      }

      setErrors(error.response.data.errors);
    } finally {
      setIsStoring(false);
    }
  };

  useEffect(() => {
    if (isOpen && selectedUser) {
      setName(selectedUser.name);
      setAddress(selectedUser.address ?? "");
      setContactNumber(selectedUser.contact_number ?? "");
      setEmail(selectedUser.email ?? "");
      setUsername(selectedUser.username ?? "");
      setRole(selectedUser.role.role);
    }
  }, [isOpen, selectedUser]);

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setAddress("");
      setContactNumber("");
      setEmail("");
      setUsername("");
      setRole("");
    }
  }, [isOpen]);

  return (
    <>
      <Modal title="Delete User" isOpen={isOpen} onClose={onClose}>
        <Form onSubmit={handleDestroyUser}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-100 pb-4 mb-4">
            <div className="col-span-2 md:col-span-1 w-full">
              <div className="mb-5">
                <FloatingLabelInputField
                  label="Name"
                  type="text"
                  name="name"
                  value={name}
                  readOnly
                />
              </div>
              <div className="mb-5">
                <FloatingLabelInputField
                  label="Address"
                  type="text"
                  name="address"
                  value={address}
                  readOnly
                />
              </div>
              <div>
                <FloatingLabelInputField
                  label="Contact Number"
                  type="text"
                  name="contact_number"
                  value={contactNumber}
                  readOnly
                />
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 w-full">
              <div className="mb-5">
                <FloatingLabelInputField
                  label="Email"
                  type="text"
                  name="email"
                  value={email}
                  readOnly
                />
              </div>
              <div className="mb-5">
                <FloatingLabelInputField
                  label="Username"
                  type="text"
                  name="username"
                  value={username}
                  readOnly
                />
              </div>
              <div>
                <FloatingLabelInputField
                  label="Role"
                  type="text"
                  name="role"
                  value={role}
                  readOnly
                />
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!isStoring && (
              <div className="col-span-1">
                <Button
                  tag="button"
                  onClick={onClose}
                  className="bg-white border-gray-100 text-gray-800 hover:bg-gray-100 focus:ring-0"
                >
                  Close
                </Button>
              </div>
            )}

            <div
              className={`${
                isStoring ? "col-span-1 md:col-span-2" : "col-span-1"
              }`}
            >
              <Button
                tag="button"
                type="submit"
                className="bg-red-600 hover:bg-red-700"
                isLoading={isStoring}
                isLoadingChildren={
                  <>
                    <Spinner size="xs" />
                    <span>Deleting User Account...</span>
                  </>
                }
              >
                Delete
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}
