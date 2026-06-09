import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { serviceService } from "../../lib/api/serviceService";

export default function ServiceForm() {
  const {
    register,
    handleSubmit,
  } = useForm();

  const mutation =
    useMutation({
      mutationFn:
        serviceService.create,

      onSuccess: () =>
        toast.success(
          "Service created"
        ),
    });

  return (
    <form
      onSubmit={handleSubmit(
        (data) =>
          mutation.mutate(
            data as never
          )
      )}
      className="bg-white p-6 rounded-xl"
    >
      <input
        placeholder="Service Name"
        {...register("name")}
        className="input"
      />

      <input
        type="date"
        {...register(
          "serviceDate"
        )}
        className="input mt-3"
      />

      <input
        type="time"
        {...register(
          "startTime"
        )}
        className="input mt-3"
      />

      <input
        type="number"
        placeholder="Late Threshold"
        {...register(
          "lateThresholdMinutes"
        )}
        className="input mt-3"
      />

      <button className="btn-primary mt-4">
        Save Service
      </button>
    </form>
  );
}