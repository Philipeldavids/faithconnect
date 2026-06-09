import {
  useQuery,  
} from "@tanstack/react-query";

import PageHeader from "../../components/layouts/PageHeader";
import DataTable from "../../components/tables/DataTable";

import { attendanceService }
from "../../lib/api/attendanceService";

export default function AttendancePage() {
  const { data } =
    useQuery({
      queryKey: [
        "attendance-today",
      ],

      queryFn: () =>
        attendanceService.today(),
    });

  return (
    <>
      <PageHeader
  title="Attendance Register"
  subtitle="Attendance by Service"
/>

      <DataTable
        data={data?.data ?? []}
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
              "memberName",
          },

          {
            header:
              "Status",

            accessor:
              "status",
          },

          {
            header:
              "Check-In",

            accessor:
              "checkInTime",
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
        actions={[]}
      />
    </>
  );
}