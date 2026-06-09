import { useQuery }
from "@tanstack/react-query";

import PageHeader
from "../../components/layouts/PageHeader";

import DataTable
from "../../components/tables/DataTable";

import { memberPortalService }
from "../../lib/api/memberPortalService";

export default function MyAttendance() {
  const { data } =
    useQuery({
      queryKey: [
        "my-attendance",
      ],
      queryFn: () =>
        memberPortalService
          .attendance(),
    });
console.log(data);
  return (
    <>
      <PageHeader
        title="My Attendance"
      />

      <DataTable
        data={
          data?.data ?? []
        }
        columns={[
          {
            header:
              "Service",
            accessor:
              "serviceName",
          },
          {
            header:
              "Date",
            accessor:
              "serviceDate",
          },
          {
            header:
              "Status",
            accessor:
              "status",
          },
                    {
  header: "Distance",
  accessor: "distanceMeters",
},
{
  header: "Within Fence",
  accessor: "isWithinGeofence",
  render: (row: any) =>
    row.isWithinGeofence
      ? "✅ Inside"
      : "❌ Outside",
},
        ]}
      />
    </>
  );
}