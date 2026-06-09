import { useQuery }
from "@tanstack/react-query";

import PageHeader
from "../../components/layouts/PageHeader";

import DataTable
from "../../components/tables/DataTable";

import { permissionService }
from "../../lib/api/permissionService";

export default function PermissionsPage() {
  const { data } =
    useQuery({
      queryKey:
        ["permissions"],
      queryFn: () =>
        permissionService.list(),
    });

  return (
    <>
      <PageHeader
        title="Permissions"
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
              "Description",
            accessor:
              "description",
          },
        ]}
      />
    </>
  );
}