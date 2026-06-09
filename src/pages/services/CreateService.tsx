import { useForm }
from "react-hook-form";

import { useMutation }
from "@tanstack/react-query";

import { useNavigate }
from "react-router-dom";

import toast
from "react-hot-toast";

import PageHeader
from "../../components/layouts/PageHeader";

import { serviceService }
from "../../lib/api/serviceService";

import type {
  CreateServiceDto,
} from "../../lib/types/service";

export default function CreateService() {
  const navigate =
    useNavigate();

  const {
    register,
    handleSubmit,
  } =
    useForm<CreateServiceDto>();

  const mutation =
    useMutation({
      mutationFn:
        serviceService.create,

      onSuccess: () => {
        toast.success(
          "Service created"
        );

        navigate(
          "/dashboard/services"
        );
      },
    });

  return (
    <>
      <PageHeader
        title="Create Service"
      />

      <form
        onSubmit={handleSubmit(
          (data) =>
            mutation.mutate(
              data
            )
        )}
        className="card p-6 space-y-4"
      >
        <input
          {...register("name")}
          placeholder="Service Name"
          className="input"
        />

        <select
          {...register(
            "serviceType",
            {
              valueAsNumber:
                true,
            }
          )}
          className="input"
        >
          <option value="0">
            Sunday Service
          </option>

          <option value="1">
            Midweek Service
          </option>

          <option value="2">
            Prayer Meeting
          </option>

          <option value="3">
            Youth Service
          </option>

          <option value="4">
            Communion Service
          </option>

          <option value="5">
            Special Event
          </option>
        </select>

        <input
          type="date"
          {...register(
            "serviceDate"
          )}
          className="input"
        />

        <div>
  <label className="block mb-1 font-medium">
    Service Start Time
  </label>

  <input
    type="time"
    {...register("startTime")}
    className="input"
  />
</div>

<div>
  <label className="block mb-1 font-medium">
    Late Threshold Time
  </label>

  <input
    type="time"
    {...register("lateThreshold")}
    className="input"
  />

  <p className="text-xs text-slate-500 mt-1">
    Members checking in after this time will be marked Late.
  </p>
</div>

<div>
  <label className="block mb-1 font-medium">
    Attendance Close Time
  </label>

  <input
    type="time"
    {...register("attendanceCloseTime")}
    className="input"
  />

  <p className="text-xs text-slate-500 mt-1">
    Attendance check-in will be disabled after this time.
  </p>
</div>
        <input
          type="number"
          step="0.000001"
  min="-90"
  max="90"
          placeholder="Latitude"
          {...register(
            "latitude",
            {
              valueAsNumber:
                true,
            }
          )}
          className="input"
        />

        <input
          type="number"
          step="0.000001"
  min="-90"
  max="90"
          placeholder="Longitude"
          {...register(
            "longitude",
            {
              valueAsNumber:
                true,
            }
          )}
          className="input"
        />

        <input
          type="number"
          placeholder="Allowed Radius"
          {...register(
            "allowedRadiusMeters",
            {
              valueAsNumber:
                true,
            }
          )}
          className="input"
        />

        <label>
          <input
            type="checkbox"
            {...register(
              "attendanceEnabled"
            )}
          />

          Enable Attendance
        </label>

        <button
          className="btn-primary"
        >
          Save
        </button>
      </form>
    </>
  );
}