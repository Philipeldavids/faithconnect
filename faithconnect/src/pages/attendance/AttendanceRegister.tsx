import { useState }
from "react";

import { useQuery }
from "@tanstack/react-query";

import PageHeader
from "../../components/layouts/PageHeader";

import DataTable
from "../../components/tables/DataTable";

import { serviceService }
from "../../lib/api/serviceService";

import { attendanceService }
from "../../lib/api/attendanceService";

export default function AttendanceRegister() {
  const [serviceId,
    setServiceId] =
      useState("");

  const { data: services } =
    useQuery({
      queryKey: [
        "services",
      ],
      queryFn: () =>
        serviceService.list(),
    });

  const { data } =
    useQuery({
      queryKey: [
        "attendance",
        serviceId,
      ],

      queryFn: () =>
        attendanceService
          .serviceAttendance(
            serviceId
          ),

      enabled:
        !!serviceId,
    });

  return (
    <>
      <PageHeader
        title="Attendance Register"
      />

      <select
        className="input mb-4"
        onChange={(e) =>
          setServiceId(
            e.target.value
          )
        }
      >
        <option value="">
          Select Service
        </option>

        {services?.data?.map(
          (service: any) => (
            <option
              key={service.id}
              value={service.id}
            >
              {service.name}
            </option>
          )
        )}
      </select>

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
              "Check In",
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
      />
    </>
  );
}