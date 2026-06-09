import { useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import PageHeader from "../../components/layouts/PageHeader";

import { memberService }
from "../../lib/api/memberService";

export default function EditMember() {
  const { id } =
    useParams();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const { data } =
    useQuery({
      queryKey: [
        "member",
        id,
      ],

      queryFn: () =>
        memberService.get(id!),
    });

  useEffect(() => {
    if (data?.data) {
      reset(data.data);
    }
  }, [data, reset]);

  const mutation =
    useMutation({
      mutationFn: (formData: any) =>
        memberService.update(
          id!,
          formData
        ),

      onSuccess: () =>
        toast.success(
          "Member updated"
        ),
    });

  return (
    <>
      <PageHeader
        title="Edit Member"
      />

   


      <form
        className="bg-white p-6 rounded-xl grid grid-cols-2 gap-4"
        onSubmit={handleSubmit(
          (data) =>
            mutation.mutate(data)
        )}
      >
        <input
          {...register(
            "firstName"
          )}
          className="input"
        />

        <input
          {...register(
            "lastName"
          )}
          className="input"
        />

        <input
          {...register(
            "email"
          )}
          className="input"
        />

        <input
          {...register(
            "phoneNumber"
          )}
          className="input"
        />

        <button
          className="btn-primary col-span-2"
        >
          Save Changes
        </button>
      </form>
    </>
  );
}