import { useForm } from "react-hook-form";

import { zodResolver }
from "@hookform/resolvers/zod";

import {
  departmentSchema,
  type DepartmentFormData,
} from "../../lib/validation/departmentSchema";

interface Props {
  defaultValues?: DepartmentFormData;

  onSubmit: (
    data: DepartmentFormData
  ) => void;

  loading?: boolean;
}

export default function DepartmentForm({
  defaultValues,
  onSubmit,
  loading,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    resolver:
      zodResolver(
        departmentSchema
      ),

    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl p-6"
    >
      <div className="space-y-4">

        <div>
          <label>Name</label>

          <input
            {...register("name")}
            className="input"
          />

          <p className="text-red-500">
            {errors.name?.message}
          </p>
        </div>

        <div>
          <label>Description</label>

          <textarea
            {...register(
              "description"
            )}
            className="input"
            rows={4}
          />

          <p className="text-red-500">
            {errors.description?.message}
          </p>
        </div>

      </div>

      <button
        type="submit"
        className="btn-primary mt-6"
        disabled={loading}
      >
        Save Department
      </button>
    </form>
  );
}