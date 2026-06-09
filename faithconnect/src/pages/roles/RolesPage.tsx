import { useQuery }
from "@tanstack/react-query";

import PageHeader
from "../../components/layouts/PageHeader";

import DataTable
from "../../components/tables/DataTable";

import { roleService }
from "../../lib/api/roleService";

export default function RolesPage() {
  const { data } =
    useQuery({
      queryKey: ["roles"],
      queryFn: () =>
        roleService.list(),
    });

  return (
    <>
      <PageHeader
        title="Roles"
      />

      <DataTable
        data={
          data?.data ?? []
        }
        columns={[
          {
            header:
              "Role",
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