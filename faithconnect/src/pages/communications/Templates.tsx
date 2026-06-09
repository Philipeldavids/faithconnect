import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { Link } from "react-router-dom";

import PageHeader from "../../components/layouts/PageHeader";
import DataTable from "../../components/tables/DataTable";

import { templateService }
from "../../lib/api/templateService";

export default function Templates() {
  const queryClient =
    useQueryClient();

  const { data } =
    useQuery({
      queryKey: ["templates"],
      queryFn: () =>
        templateService.list(),
    });

  const deleteMutation =
    useMutation({
      mutationFn:
        templateService.delete,

      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [
            "templates",
          ],
        }),
    });

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

      <DataTable
        data={data?.data ?? []}
        columns={[
          {
            header: "Name",
            accessor: "name",
          },
          {
            header: "Type",
            accessor: "type",
          },
        ]}
      />
    </>
  );
}