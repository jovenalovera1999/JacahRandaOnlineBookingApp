"use client";

import AddUserModal from "@/features/user_management/AddUserModal";
import DeleteUserModal from "@/features/user_management/DeleteUserModal";
import EditUserModal from "@/features/user_management/EditUserModal";
import UsersTable from "@/features/user_management/UsersTable";
import { useReload } from "@/hooks/useReload";
import { useToastMessage } from "@/hooks/useToastMessage";
import { UserColumns } from "@/interfaces/UserInterface";
import { useState } from "react";

export default function UserManagementPage() {
  // Hooks
  const { reload, handleReload } = useReload();
  const { showToastMessage } = useToastMessage();

  // States
  const [selectedUser, setSelectedUser] = useState<UserColumns | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModal] = useState(false);

  // Edit User Modal Functions
  const handleOpenEditUserModal = (userSelected: UserColumns | null) => {
    setSelectedUser(userSelected);
    setIsEditUserModalOpen(true);
  };

  const handleCloseEditUserModal = () => {
    setSelectedUser(null);
    setIsEditUserModalOpen(false);
  };

  // Delete User Modal Functions
  const handleOpenDeleteUserModal = (userSelected: UserColumns | null) => {
    setSelectedUser(userSelected);
    setIsDeleteUserModal(true);
  };

  const handleCloseDeleteUserModal = () => {
    setSelectedUser(null);
    setIsDeleteUserModal(false);
  };

  return (
    <>
      <h1 className="text-3xl text-gray-800 font-semibold mb-4">
        User Management
      </h1>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        reloadUserReferences={reload}
        onUserAdded={(status, message) => showToastMessage(status, message)}
        onReloadUserReferences={handleReload}
        onClose={() => setIsAddUserModalOpen(false)}
      />

      <EditUserModal
        selectedUser={selectedUser}
        isOpen={isEditUserModalOpen}
        reloadUserReferences={reload}
        onUserUpdated={(status, message) => showToastMessage(status, message)}
        onReloadUserReferences={handleReload}
        onClose={handleCloseEditUserModal}
      />

      <DeleteUserModal
        selectedUser={selectedUser}
        isOpen={isDeleteUserModalOpen}
        onUserDeleted={(status, message) => showToastMessage(status, message)}
        onReloadUsers={handleReload}
        onClose={handleCloseDeleteUserModal}
      />

      <UsersTable
        reloadUsers={reload}
        onAddUser={() => setIsAddUserModalOpen(true)}
        onEditUser={handleOpenEditUserModal}
        onDeleteUser={handleOpenDeleteUserModal}
      />
    </>
  );
}
