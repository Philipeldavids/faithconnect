import { useEffect } from "react";

import { useParams, useNavigate }
from "react-router-dom";

import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";

import {
  useForm,
} from "react-hook-form";

import toast from "react-hot-toast";

import PageHeader
from "../../components/layouts/PageHeader";

import { serviceService }
from "../../lib/api/serviceService";

import type {
  CreateServiceDto,
} from "../../lib/types/service";

export default function EditService() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const {
    register,
    handleSubmit,
    reset,
  } =
    useForm<CreateServiceDto>();

  const { data, isLoading } =
    useQuery({
      queryKey: [
        "service",
        id,
      ],

      queryFn: () =>
        serviceService.get(
          id!
        ),

      enabled: !!id,
    });

  useEffect(() => {
    if (data?.data) {
      reset({
        name:
          data.data.name,

        serviceType:
          data.data.serviceType,

        serviceDate:
          data.data.serviceDate
            ?.split("T")[0],

        startTime:
          data.data.startTime,

        lateThreshold:
          data.data.lateThreshold,

        attendanceCloseTime:
          data.data
            .attendanceCloseTime,

        latitude:
          data.data.latitude,

        longitude:
          data.data.longitude,

        allowedRadiusMeters:
          data.data
            .allowedRadiusMeters,

        attendanceEnabled:
          data.data
            .attendanceEnabled,
      });
    }
  }, [data, reset]);

  const updateMutation =
    useMutation({
      mutationFn: (
        values:
          CreateServiceDto
      ) =>
        serviceService.update(
          id!,
          values
        ),

      onSuccess: () => {
        toast.success(
          "Service updated"
        );

        navigate(
          "/dashboard/services"
        );
      },

      onError: () => {
        toast.error(
          "Unable to update service"
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
        title="Edit Service"
      />

      <form
        className="card p-6 space-y-4"
        onSubmit={handleSubmit(
          (data) =>
            updateMutation.mutate(
              data
            )
        )}
      >
        <input
          {...register("name")}
          className="input"
          placeholder="Service Name"
        />

        <select
          className="input"
          {...register(
            "serviceType",
            {
              valueAsNumber:
                true,
            }
          )}
        >
          <option value={0}>
            Sunday Service
          </option>

          <option value={1}>
            Midweek Service
          </option>

          <option value={2}>
            Prayer Meeting
          </option>

          <option value={3}>
            Youth Service
          </option>

          <option value={4}>
            Communion Service
          </option>

          <option value={5}>
            Special Event
          </option>
        </select>

        <input
          type="date"
          className="input"
          {...register(
            "serviceDate"
          )}
        />

        <input
          type="time"
          className="input"
          {...register(
            "startTime"
          )}
        />

        <input
          type="time"
          className="input"
          {...register(
            "lateThreshold"
          )}
        />

        <input
          type="time"
          className="input"
          {...register(
            "attendanceCloseTime"
          )}
        />

        <input
          type="number"
          step="any"
          className="input"
          placeholder="Latitude"
          {...register(
            "latitude",
            {
              valueAsNumber:
                true,
            }
          )}
        />

        <input
          type="number"
          step="any"
          className="input"
          placeholder="Longitude"
          {...register(
            "longitude",
            {
              valueAsNumber:
                true,
            }
          )}
        />

        <input
          type="number"
          className="input"
          placeholder="Allowed Radius (Meters)"
          {...register(
            "allowedRadiusMeters",
            {
              valueAsNumber:
                true,
            }
          )}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register(
              "attendanceEnabled"
            )}
          />

          Enable Attendance
        </label>

        <button
          type="submit"
          className="btn-primary"
          disabled={
            updateMutation.isPending
          }
        >
          {updateMutation.isPending
            ? "Saving..."
            : "Update Service"}
        </button>
      </form>
    </>
  );
}