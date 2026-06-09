import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import toast from "react-hot-toast";

import PageHeader from "../../components/layouts/PageHeader";

import DataTable from "../../components/tables/DataTable";

import ConfirmDelete from "../../components/common/ConfirmDeleteDialog";

import { templateService }
from "../../lib/api/templateService";

export default function Templates() {
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

  const { data, isLoading } =
    useQuery({
      queryKey: ["templates"],

      queryFn: () =>
        templateService.list(),
    });

  const deleteMutation =
    useMutation({
      mutationFn: (
        id: string
      ) =>
        templateService.delete(
          id
        ),

      onSuccess: () => {
        toast.success(
          "Template deleted"
        );

        queryClient.invalidateQueries({
          queryKey: [
            "templates",
          ],
        });

        setShowDelete(
          false
        );

        setSelectedId(
          null
        );
      },
    });

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Templates"
        action={
          <Link
            to="/communications/templates/create"
            className="btn-primary"
          >
            Add Template
          </Link>
        }
      />

      <ConfirmDelete
        open={showDelete}
        title="Delete Template"
        message="Are you sure you want to delete this template?"
        onCancel={() => {
          setShowDelete(
            false
          );

          setSelectedId(
            null
          );
        }}
        onConfirm={() => {
          if (
            selectedId
          ) {
            deleteMutation.mutate(
              selectedId
            );
          }
        }}
      />

      <DataTable
        data={
          data?.data ?? []
        }
        columns={[
          {
            header:
              "Name",

            accessor:
              "name",
          },
          {
            header:
              "Type",

            accessor:
              "channel",
          },
        ]}
        actions={[
          {
            render: (
              row
            ) => (
              <button
                className="text-blue-600"
                onClick={() =>
                  navigate(
                    `/communications/templates/${row.id}`
                  )
                }
              >
                View
              </button>
            ),
          },

          {
            render: (
              row
            ) => (
              <button
                className="text-green-600"
                onClick={() =>
                  navigate(
                    `/communications/templates/edit/${row.id}`
                  )
                }
              >
                Edit
              </button>
            ),
          },

          {
            render: (
              row
            ) => (
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