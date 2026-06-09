import { useQuery, useMutation, useQueryClient  }
from "@tanstack/react-query";
import {useState } from "react";
import { useNavigate }
from "react-router-dom";
import toast
from "react-hot-toast";


import PageHeader
from "../../components/layouts/PageHeader";

import DataTable
from "../../components/tables/DataTable";

import ConfirmDelete from "../../components/common/ConfirmDeleteDialog";

import {
  departmentService
} from "../../lib/api/departmentService";

export default function Departments() {
  const navigate =
    useNavigate();
    const [search, setSearch] =
  useState("");
const [showDelete, setShowDelete] =
  useState(false);
const queryClient = useQueryClient();
const [selectedDepartmentId,
  setSelectedDepartmentId] =
  useState<string | null>(null);
  const { data } = useQuery({
    queryKey: ["departments"],

    queryFn: () =>
      departmentService.list(),
  });

  const departments =
    data?.data ?? [];
  console.log(departments);
   const deleteMutation = useMutation({
  mutationFn: (id: string) =>
    departmentService.delete(id),

  onSuccess: () => {
    toast.success(
      "Department deleted"
    );

    queryClient.invalidateQueries({
      queryKey: ["departments"],
    });

    setShowDelete(false);
    setSelectedDepartmentId(null);
  },
});

  const filtered =
  departments.filter(
    (x) =>
      x.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  
  return (
    <>
    <input
  placeholder="Search department"
  className="input mb-4"
  value={search}
  onChange={(e) =>
    setSearch(
      e.target.value
    )
  }
/>
      <PageHeader
        title="Departments"
        action={
          <button
            className="btn-primary"
            onClick={() =>
              navigate(
                "/departments/create"
              )
            }
          >
            Add Department
          </button>
        }
      />
<ConfirmDelete
  open={showDelete}
  title="Delete Department"
  message="Are you sure you want to delete this department?"
  onCancel={() => {
    setShowDelete(false);
    setSelectedDepartmentId(null);
  }}
  onConfirm={() => {
    if (selectedDepartmentId) {
      deleteMutation.mutate(
        selectedDepartmentId
      );
    }
  }}
/>
      <DataTable
        data={filtered}
        columns={[
          {
  header: "Name",
  accessor: "name",
  render: (row) => (
    <button
      className="text-blue-600 hover:underline"
      onClick={() =>
        navigate(
          `/departments/${row.id}`
        )
      }
    >
      {row.name}
    </button>
  ),
},

          {
            header:
              "Description",
            accessor:
              "description",
          },

          {
            header:
              "Members",
            accessor:
              "memberCount",
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
              `/departments/${row.id}`
            )
          }
        >
          View
        </button>

        <button
          className="text-green-600 hover:underline"
          onClick={() =>
            navigate(
              `/departments/edit/${row.id}`
            )
          }
        >
          Edit
        </button>

        <button
          className="text-red-600 hover:underline"
          onClick={() => {
            setSelectedDepartmentId(
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