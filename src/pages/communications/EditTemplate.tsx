import {
  useEffect,
} from "react";

import {
  useForm,
} from "react-hook-form";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import PageHeader from "../../components/layouts/PageHeader";

import { templateService }
from "../../lib/api/templateService";

export default function EditTemplate() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const { data } =
    useQuery({
      queryKey: [
        "template",
        id,
      ],

      queryFn: () =>
        templateService.get(
          id!
        ),
    });

  useEffect(() => {
    if (data?.data) {
      reset(
        data.data
      );
    }
  }, [data]);

  const mutation =
    useMutation({
      mutationFn: (
        formData: any
      ) =>
        templateService.update(
          id!,
          formData
        ),

      onSuccess: () => {
        toast.success(
          "Template updated"
        );

        navigate(
          "/communications/templates"
        );
      },
    });

  return (
    <>
      <PageHeader
        title="Edit Template"
      />

      <form
        className="card p-6 space-y-4"
        onSubmit={handleSubmit(
          (data) =>
            mutation.mutate(
              data
            )
        )}
      >
        <input
          {...register(
            "name"
          )}
          className="input"
          placeholder="Name"
        />

        <select
          {...register(
            "type"
          )}
          className="input"
        >
          <option value="Email">
            Email
          </option>

          <option value="SMS">
            SMS
          </option>
        </select>

        <input
          {...register(
            "subject"
          )}
          className="input"
          placeholder="Subject"
        />

        <textarea
          rows={8}
          {...register(
            "body"
          )}
          className="input"
        />

        <button
          className="btn-primary"
        >
          Update Template
        </button>
      </form>
    </>
  );
}