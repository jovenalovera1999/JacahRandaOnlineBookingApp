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

interface EditUserModalProps {
  selectedUser: UserColumns | null;
  isOpen: boolean;
  reloadUserReferences: boolean;
  onUserUpdated: (
    status: "success" | "failed" | "warning" | "others",
    message: string
  ) => void;
  onReloadUserReferences: () => void;
  onClose: () => void;
}

export default function EditUserModal({
  selectedUser,
  isOpen,
  reloadUserReferences,
  onUserUpdated,
  onReloadUserReferences,
  onClose,
}: EditUserModalProps) {
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

  const handleLoadUserReferences = useCallback(async () => {
    try {
      const { status, data } = await UserService.loadUserReferences();

      if (status !== 200) {
        console.error(
          "Unexpected status error during load user references at EditUserModal.tsx: ",
          status
        );
        return;
      }

      setRoles(data.roles);
    } catch (error) {
      console.error(
        "Unexpected server error during load user references at EditUserModal.tsx: ",
        error
      );
    }
  }, []);

  const handleUpdateUser = async (e: FormEvent) => {
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

      const { status, data } = await UserService.updateUser(
        selectedUser?.user_id!,
        payload
      );

      if (status !== 200) {
        console.error(
          "Unexpected status error during add user at EditUserModal.tsx: ",
          status
        );
        return;
      }

      onUserUpdated("success", data.message);
      onReloadUserReferences();

      setErrors({});
    } catch (error: any) {
      if (error.response && error.response.status !== 422) {
        console.error(
          "Unexpected server error during add user at EditUserModal.tsx: ",
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
    if (isOpen) handleLoadUserReferences();
  }, [isOpen, reloadUserReferences, handleLoadUserReferences]);

  useEffect(() => {
    if (isOpen && selectedUser) {
      setName(selectedUser.name);
      setAddress(selectedUser.address ?? "");
      setContactNumber(selectedUser.contact_number ?? "");
      setEmail(selectedUser.email ?? "");
      setUsername(selectedUser.username ?? "");
      setRole(selectedUser.role.role_id.toString());
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
      <Modal title="Edit User" isOpen={isOpen} onClose={onClose}>
        {roles.length > 0 ? (
          <>
            <Form onSubmit={handleUpdateUser}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-100 pb-4 mb-4">
                <div className="col-span-2 md:col-span-1 w-full">
                  <div className="mb-5">
                    <FloatingLabelInputField
                      label="Name"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoFocus
                      errors={errors.name}
                    />
                  </div>
                  <div className="mb-5">
                    <FloatingLabelInputField
                      label="Address"
                      type="text"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      errors={errors.address}
                    />
                  </div>
                  <div>
                    <FloatingLabelInputField
                      label="Contact Number"
                      type="text"
                      name="contact_number"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      required
                      errors={errors.contact_number}
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
                      onChange={(e) => setEmail(e.target.value)}
                      errors={errors.email}
                    />
                  </div>
                  <div className="mb-5">
                    <FloatingLabelInputField
                      label="Username"
                      type="text"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      errors={errors.username}
                    />
                  </div>
                  <div>
                    <FloatingLabelSelectField
                      label="Role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      errors={errors.role}
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option value={role.role_id} key={role.role_id}>
                          {role.role}
                        </option>
                      ))}
                    </FloatingLabelSelectField>
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
                    isLoading={isStoring}
                    isLoadingChildren={
                      <>
                        <Spinner size="xs" />
                        <span>Saving User Account...</span>
                      </>
                    }
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <Spinner size="lg" />
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
