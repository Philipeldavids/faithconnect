import { useParams }
from "react-router-dom";
import { useState } from "react";

import Modal from "../../components/common/Modal";

import AssignMemberForm
from "../../components/forms/AssignMemberForm";

import { useQuery, useMutation }
from "@tanstack/react-query";

import PageHeader
from "../../components/layouts/PageHeader";

import DataTable
from "../../components/tables/DataTable";

import {
  departmentService
} from "../../lib/api/departmentService";

export default function DepartmentDetails() {
  const { id } =
    useParams();
    const [showAssign, setShowAssign] =
  useState(false);

  const removeMutation =
  useMutation({
    mutationFn: ({
      memberId,
      departmentId,
    }: {
      memberId: string;
      departmentId: string;
    }) =>
      departmentService.removeMember(
        departmentId,
        memberId
      ),
  });
  const { data } =
    useQuery({
      queryKey: [
        "department",
        id,
      ],

      queryFn: () =>
        departmentService.get(
          id!
        ),

      enabled: !!id,
    });

  const department =
    data?.data;

  return (
    <>
      <PageHeader
  title={department?.name ?? ""}
  subtitle={department?.description}
  action={
    <button
      className="btn-primary"
      onClick={() =>
        setShowAssign(true)
      }
    >
      Assign Member
    </button>
  }
/>
<Modal
  open={showAssign}
  onClose={() =>
    setShowAssign(false)
  }
>
  <AssignMemberForm
    departmentId={id!}
    onSuccess={() =>
      setShowAssign(false)
     
    }
  />
</Modal>

      <DataTable
        data={
          department?.members ??
          []
        }
        columns={[
          {
            header:
              "Membership No",
            accessor:
              "membershipNumber",
          },
          {
            header:
              "Name",
            accessor:
              "fullName",
          },
          {
            header:
              "Email",
            accessor:
              "email",
          },
          {
            header:
              "Phone",
            accessor:
              "phoneNumber",
          },
        ]}
       actions={[
  {
    render: (row) => (
      <button
        className="text-red-600"
        onClick={() =>
          removeMutation.mutate({
            memberId: row.memberId,
            departmentId: department!.id,
          })
        }
      >
        Remove
      </button>
    ),
  },
]}
      />
    </>
  );
}