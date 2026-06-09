import { useQuery, useMutation, useQueryClient,} from "@tanstack/react-query";
import { useState } from "react";


import toast from "react-hot-toast";

import ConfirmDelete
from "../../components/common/ConfirmDeleteDialog";

import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/layouts/PageHeader";

import LoadingSpinner from "../../components/common/LoadingSpinner";

import DataTable from "../../components/tables/DataTable";

import { memberService } from "../../lib/api/memberService";

export default function Members() {

  const queryClient =
  useQueryClient();

const [showDelete, setShowDelete] =
  useState(false);

const [
  selectedMemberId,
  setSelectedMemberId,
] = useState<string | null>(
  null
);

const deleteMutation =
  useMutation({
    mutationFn: (
      id: string
    ) =>
      memberService.delete(id),

    onSuccess: () => {
      toast.success(
        "Member deleted"
      );

      queryClient.invalidateQueries({
        queryKey: ["members"],
      });

      setShowDelete(false);

      setSelectedMemberId(
        null
      );
    },

    onError: () => {
      toast.error(
        "Unable to delete member"
      );
    },
  });
  const navigate = useNavigate();

  const { data, isLoading } =
    useQuery({
      queryKey: ["members"],
      queryFn:
        memberService.list,
    });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const members =
    data?.data ?? [];
  console.log(members);
  return (
    <>
      <PageHeader
        title="Members"
        action={
          <button
            className="btn-primary"
            onClick={() =>
              navigate(
                "/dashboard/members/create"
              )
            }
          >
            Add Member
          </button>
        }
      />

      <DataTable
  data={members}
  columns={[
    {
  header: "Membership No",
  accessor: "membershipNumber",
  render: (row) => (
    <button
      className="text-blue-600 hover:underline"
      onClick={() =>
        navigate(
          `/dashboard/members/${row.id}`
        )
      }
    >
      {row.membershipNumber}
    </button>
  ),
},

    {
      header:
        "First Name",
      accessor:
        "firstName",
    },

    {
      header:
        "Last Name",
      accessor:
        "lastName",
    },

    {
      header:
        "Email",
      accessor:
        "email",
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
                `/dashboard/members/${row.id}`
              )
            }
          >
            View
          </button>

          <button
            className="text-green-600 hover:underline"
            onClick={() =>
              navigate(
                `/members/edit/${row.id}`
              )
            }
          >
            Edit
          </button>

          <button
            className="text-red-600 hover:underline"
            onClick={() => {
              setSelectedMemberId(
                row.id
              );

              setShowDelete(
                true
              );
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
      <ConfirmDelete
  open={showDelete}
  title="Delete Member"
  message="Are you sure you want to delete this member?"
  onCancel={() => {
    setShowDelete(false);
    setSelectedMemberId(null);
  }}
  onConfirm={() => {
    if (selectedMemberId) {
      deleteMutation.mutate(
        selectedMemberId
      );
    }
  }}
/>
    </>
  );
}