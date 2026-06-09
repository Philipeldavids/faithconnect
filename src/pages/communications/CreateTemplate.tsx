import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import PageHeader from "../../components/layouts/PageHeader";
import {
  useNavigate 
} from "react-router-dom";
import { templateService }
from "../../lib/api/templateService";
import { type CreateTemplateDto } from "../../lib/types/template";

export default function CreateTemplate() {

  const navigate =
    useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm<CreateTemplateDto>();

  const mutation =
    useMutation({
      mutationFn:
        templateService.create,

      onSuccess: () => {
        toast.success(
          "Template created"
        );
        navigate(
          "/dashboard/communications/templates"
        );
      }
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
          {...register("channel")}
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
          {...register("body")}
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