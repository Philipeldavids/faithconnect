import { useState } from "react";

import { useQuery, useMutation }
from "@tanstack/react-query";

import toast from "react-hot-toast";

import PageHeader
from "../../components/layouts/PageHeader";

import { serviceService }
from "../../lib/api/serviceService";

import { attendanceService }
from "../../lib/api/attendanceService";

export default function CheckIn() {
  const [
    serviceId,
    setServiceId,
  ] = useState("");

  const [
    loadingLocation,
    setLoadingLocation,
  ] = useState(false);

  const { data: services } =
    useQuery({
      queryKey: [
        "upcoming-services",
      ],

      queryFn: () =>
        serviceService.upcoming(),
    });

  const mutation =
    useMutation({
      mutationFn:
        attendanceService.selfCheckIn,

      onSuccess: () => {
        toast.success(
          "Check-in successful"
        );
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data ??
            "Unable to check in"
        );
      },
    });

  const handleCheckIn = () => {
    if (!serviceId) {
      toast.error(
        "Select a service"
      );

      return;
    }

    if (
      !navigator.geolocation
    ) {
      toast.error(
        "Geolocation not supported"
      );

      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        mutation.mutate({
          serviceId,

          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude,
        });

        setLoadingLocation(
          false
        );
      },

      () => {
        setLoadingLocation(
          false
        );

        toast.error(
          "Unable to get location"
        );
      }
    );
  };

  return (
    <>
      <PageHeader
        title="Check In"
        subtitle="Check into a church service"
      />

      <div className="card p-6 space-y-4">
        <div>
          <label className="block mb-1">
            Service
          </label>

          <select
            className="input"
            value={serviceId}
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
        </div>

        <button
          className="btn-primary"
          disabled={
            loadingLocation ||
            mutation.isPending
          }
          onClick={
            handleCheckIn
          }
        >
          {loadingLocation
            ? "Getting Location..."
            : mutation.isPending
            ? "Checking In..."
            : "Check In"}
        </button>
      </div>
    </>
  );
}