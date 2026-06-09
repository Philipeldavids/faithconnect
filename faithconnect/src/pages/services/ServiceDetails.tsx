import { useParams }
from "react-router-dom";

import { useQuery }
from "@tanstack/react-query";

import PageHeader
from "../../components/layouts/PageHeader";

import { serviceService }
from "../../lib/api/serviceService";

export default function ServiceDetails() {
  const { id } =
    useParams();

  const { data } =
    useQuery({
      queryKey: [
        "service",
        id,
      ],
      queryFn: () =>
        serviceService.get(
          id!
        ),
    });

  const service =
    data?.data;

  return (
    <>
      <PageHeader
        title="Service Details"
      />

      <div className="card p-6 space-y-3">
        <p>
          <b>Name:</b>
          {" "}
          {service?.name}
        </p>

        <p>
          <b>Date:</b>
          {" "}
          {
            service?.serviceDate
          }
        </p>

        <p>
          <b>Attendance:</b>
          {" "}
          {
            service?.attendanceCount
          }
        </p>

        <p>
          <b>Enabled:</b>
          {" "}
          {service?.attendanceEnabled
            ? "Yes"
            : "No"}
        </p>

        <p>
          <b>Radius:</b>
          {" "}
          {
            service?.allowedRadiusMeters
          }m
        </p>
      </div>
    </>
  );
}