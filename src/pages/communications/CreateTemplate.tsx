import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import PageHeader from "../../components/layouts/PageHeader";

import { templateService }
from "../../lib/api/templateService";

export default function CreateTemplate() {
  const {
    register,
    handleSubmit,
  } = useForm();

  const mutation =
    useMutation({
      mutationFn:
        templateService.create,

      onSuccess: () =>
        toast.success(
          "Template created"
        ),
    });

  return (
    <>
      <PageHeader
        title="Create Template"
      />

      <form
        className="bg-white p-6 rounded-xl space-y-4"
        onSubmit={handleSubmit(
          (data) =>
            mutation.mutate(data)
        )}
      >
        <input
          {...register("name")}
          placeholder="Template Name"
          className="input w-full"
        />

        <select
          {...register("type")}
          className="input w-full"
        >
          <option value="SMS">
            SMS
          </option>

          <option value="Email">
            Email
          </option>
        </select>

        <input
          {...register("subject")}
          placeholder="Subject"
          className="input w-full"
        />

        <textarea
          {...register("content")}
          rows={8}
          className="input w-full"
        />

        <button
          type="submit"
          className="btn-primary"
        >
          Save
        </button>
      </form>
    </>
  );
}