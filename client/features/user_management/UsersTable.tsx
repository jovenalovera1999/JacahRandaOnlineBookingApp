"use client";

import ActionButtonDropdown from "@/components/ui/ActionButtonDropdown";
import Button from "@/components/ui/Button";
import FloatingLabelInputField from "@/components/ui/FloatingLabelInputField";
import Spinner from "@/components/ui/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/Table";
import {
  useFullDateFormat,
  useFullDateTimeFormat,
} from "@/hooks/useDateTimeFormat";
import { useDebounce } from "@/hooks/useDebounce";
import { UserColumns } from "@/interfaces/UserInterface";
import UserService from "@/services/UserService";
import { useCallback, useEffect, useState } from "react";

interface UsersTableProps {
  reloadUsers: boolean;
  onAddUser: () => void;
  onEditUser: (selectedUser: UserColumns | null) => void;
  onDeleteUser: (selectedUser: UserColumns | null) => void;
}

export default function UsersTable({
  reloadUsers,
  onAddUser,
  onEditUser,
  onDeleteUser,
}: UsersTableProps) {
  // States
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserColumns[]>([]);
  const [usersActionOpenDropdown, setUsersActionOpenDropdown] = useState<
    string | number | null
  >(null);

  const debouncedSearch = useDebounce(search);

  const handleLoadUsers = useCallback(async (searchValue: string) => {
    try {
      const { status, data } = await UserService.loadUsers(searchValue);

      if (status !== 200) {
        console.error(
          "Unexpected status error during load users at UsersTable.tsx: ",
          status
        );
        return;
      }

      setUsers(data.users);
    } catch (error) {
      console.error(
        "Unexpected server error during load users at UsersTable.tsx: ",
        error
      );
    }
  }, []);

  const headers = [
    "Name",
    "Address",
    "Contact Number",
    "Email",
    "Username",
    "Role",
    "Last Login",
    "Account Created",
    "Actions",
  ];

  useEffect(() => {
    if (!debouncedSearch) {
      handleLoadUsers("");
      return;
    }

    handleLoadUsers(debouncedSearch);
  }, [debouncedSearch, reloadUsers, handleLoadUsers]);

  return (
    <>
      <div className="overflow-hidden rounded-md border border-gray-200 bg-transparent">
        <div className="relative max-w-full max-h-[calc(100vh-11rem)] overflow-x-auto custom-scrollbar">
          <Table
            filter={
              <>
                <div className="space-y-4 md:space-y-0 md:flex items-center justify-between">
                  <div className="md:w-32">
                    <Button tag="button" type="button" onClick={onAddUser}>
                      Add User
                    </Button>
                  </div>
                  <div className="md:w-72">
                    <FloatingLabelInputField
                      label="Search"
                      type="text"
                      name="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>
              </>
            }
          >
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell className="text-blue-600" isHeader key={header}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow
                    key={user.user_id}
                    className="text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>{user.contact_number}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.role.role}</TableCell>
                    <TableCell>
                      {useFullDateTimeFormat(user.last_login_at ?? "")}
                    </TableCell>
                    <TableCell>{useFullDateFormat(user.created_at)}</TableCell>
                    <TableCell className="relative overflow-visible">
                      <ActionButtonDropdown
                        id={user.user_id}
                        openDropdownId={usersActionOpenDropdown}
                        setOpenDropdownId={setUsersActionOpenDropdown}
                      >
                        <Button
                          tag="button"
                          type="button"
                          className="bg-transparent text-gray-800 hover:bg-green-200 hover:text-green-600 text-xs font-medium transition-colors duration-200 w-20"
                          onClick={() => onEditUser(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          tag="button"
                          type="button"
                          className="bg-transparent text-gray-800 hover:bg-red-200 hover:text-red-600 text-xs font-medium transition-colors duration-200 w-20"
                          onClick={() => onDeleteUser(user)}
                        >
                          Delete
                        </Button>
                      </ActionButtonDropdown>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={headers.length}
                    className="text-center items-center justify-center"
                  >
                    <Spinner size="md" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
