import { useState } from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import ConfirmDelete
from "../../components/common/ConfirmDeleteDialog";
import { useNavigate }
from "react-router-dom";

import PageHeader
from "../../components/layouts/PageHeader";

import DataTable
from "../../components/tables/DataTable";
import { authService } from "../../lib/api/authService";
import { userService }
from "../../lib/api/userService";

export default function UsersPage() {
  const navigate =
    useNavigate();
const queryClient =
  useQueryClient();

const [showDelete, setShowDelete] =
  useState(false);

const [selectedUserId,
  setSelectedUserId] =
  useState<string | null>(
    null
  );

const deleteMutation =
  useMutation({
    mutationFn: (
      id: string
    ) =>
      userService.delete(id),

    onSuccess: () => {
      toast.success(
        "User deleted"
      );

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      setShowDelete(false);

      setSelectedUserId(
        null
      );
    },

    onError: () => {
      toast.error(
        "Unable to delete user"
      );
    },
  });
  const { data } =
    useQuery({
      queryKey: ["users"],
      queryFn: () =>
        userService.list(),
    });

  const users =
    data?.data ?? [];

    const resetPasswordMutation =
  useMutation({
    mutationFn: (
      id: string
    ) =>
      authService
        .resetPassword(id),

    onSuccess: () => {
      toast.success(
        "Password reset successfully"
      );
    },

    onError: () => {
      toast.error(
        "Unable to reset password"
      );
    },
  });
  return (
    <>
      <PageHeader
        title="Users"
        // action={
        // //   <button
        // //     className="btn-primary"
        // //     onClick={() =>
        // //       navigate(
        // //         "/users/create"
        // //       )
        // //     }
        // //   >
        // //     Add User
        // //   </button>
        // }
      />
        <ConfirmDelete
  open={showDelete}
  title="Delete User"
  message="Are you sure you want to delete this user?"
  onCancel={() => {
    setShowDelete(false);
    setSelectedUserId(null);
  }}
  onConfirm={() => {
    if (selectedUserId) {
      deleteMutation.mutate(
        selectedUserId
      );
    }
  }}
/>
     <DataTable
  data={users}
  columns={[
    {
      header: "Name",
      accessor: "fullName",
    },

    {
      header: "Email",
      accessor: "email",
    },

    {
      header: "Phone",
      accessor: "phoneNumber",
    },
  ]}
  actions={[
    {
      render: (row) => (
        <div className="flex gap-3">

          <button
            className="text-blue-600 hover:underline"
            onClick={() =>
              navigate(
                `/dashboard/users/${row.id}`
              )
            }
          >
            View
          </button>

          <button
            className="text-green-600 hover:underline"
            onClick={() =>
              navigate(
                `/dashboard/users/edit/${row.id}`
              )
            }
          >
            Edit
          </button>

          <button
            className="text-purple-600 hover:underline"
            onClick={() =>
              navigate(
                `/dashboard/users/${row.id}/roles`
              )
            }
          >
            Roles
          </button>
            <button
  className="
    text-orange-600
    hover:underline
  "
  onClick={() =>
    resetPasswordMutation
      .mutate(
        row.id
      )
  }
>
  Reset Password
</button>
          <button
            className="text-red-600 hover:underline"
            onClick={() => {
              setSelectedUserId(
                row.id
              );

              setShowDelete(true);
            }}
          >
            Delete
          </button>

        </div>
      ),
    },
  ]}
  pageSize={10}
/>
    </>
  );
}