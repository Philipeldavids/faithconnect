import { useQuery, useMutation, useQueryClient }
from "@tanstack/react-query";

import { useNavigate }
from "react-router-dom";

import { useState }
from "react";

import toast
from "react-hot-toast";

import PageHeader
from "../../components/layouts/PageHeader";

import DataTable
from "../../components/tables/DataTable";

import ConfirmDelete
from "../../components/common/ConfirmDeleteDialog";

import { serviceService }
from "../../lib/api/serviceService";

export default function ServicesPage() {
  const navigate =
    useNavigate();

  const queryClient =
    useQueryClient();

  const [showDelete,
    setShowDelete] =
      useState(false);

  const [selectedId,
    setSelectedId] =
      useState<string | null>(
        null
      );

  const { data} =
    useQuery({
      queryKey: ["services"],
      queryFn: () =>
        serviceService.list(),
    });

  const services =
    data?.data ?? [];

  const deleteMutation =
    useMutation({
      mutationFn: (id: string) =>
        serviceService.delete(id),

      onSuccess: () => {
        toast.success(
          "Service deleted"
        );

        queryClient.invalidateQueries({
          queryKey: ["services"],
        });

        setShowDelete(false);
      },
    });

  return (
    <>
      <PageHeader
        title="Services"
        action={
          <button
            className="btn-primary"
            onClick={() =>
              navigate(
                "/dashboard/services/create"
              )
            }
          >
            Create Service
          </button>
        }
      />

      <ConfirmDelete
        open={showDelete}
        title="Delete Service"
        message="Delete this service?"
        onCancel={() =>
          setShowDelete(false)
        }
        onConfirm={() => {
          if (selectedId) {
            deleteMutation.mutate(
              selectedId
            );
          }
        }}
      />

      <DataTable
        data={services}
        columns={[
          {
            header: "Name",
            accessor: "name",
          },
          {
            header: "Date",
            accessor: "serviceDate",
          },
          {
            header: "Attendance",
            accessor:
              "attendanceCount",
          },
        ]}
        actions={[
          {
            render: (row: any) => (
              <button
                className="text-blue-600"
                onClick={() =>
                  navigate(
                    `/dashboard/services/${row.id}`
                  )
                }
              >
                View
              </button>
            ),
          },
          {
            render: (row: any) => (
              <button
                className="text-green-600"
                onClick={() =>
                  navigate(
                    `/dashboard/services/edit/${row.id}`
                  )
                }
              >
                Edit
              </button>
            ),
          },
          {
            render: (row: any) => (
              <button
                className="text-red-600"
                onClick={() => {
                  setSelectedId(
                    row.id
                  );

                  setShowDelete(
                    true
                  );
                }}
              >
                Delete
              </button>
            ),
          },
        ]}
      />
    </>
  );
}