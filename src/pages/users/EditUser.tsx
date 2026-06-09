import { useEffect } from "react";

import { useParams,
  useNavigate } from "react-router-dom";

import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";

import {
  useForm,
} from "react-hook-form";

import toast from "react-hot-toast";

import PageHeader from "../../components/layouts/PageHeader";

import LoadingSpinner from "../../components/common/LoadingSpinner";

import {
  userService,
} from "../../lib/api/userService";

import type {
  UpdateUserDto,
} from "../../lib/types/user";

export default function EditUser() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const {
    register,
    handleSubmit,
    reset,
  } =
    useForm<UpdateUserDto>();

  const {
    data,
    isLoading,
  } =
    useQuery({
      queryKey:
        ["user", id],

      queryFn:
        () =>
          userService.get(
            id!
          ),

      enabled:
        !!id,
    });

  useEffect(() => {
    if (
      data?.data
    ) {
      reset({
        fullName:
          data.data
            .fullName,

        email:
          data.data
            .email,

        phoneNumber:
          data.data
            .phoneNumber,

        isActive:
          data.data
            .isActive,
      });
    }
  }, [
    data,
    reset,
  ]);

  const mutation =
    useMutation({
      mutationFn: (
        formData:
          UpdateUserDto
      ) =>
        userService.update(
          id!,
          formData
        ),

      onSuccess: () => {
        toast.success(
          "User updated"
        );

        navigate(
          "/dashboard/users"
        );
      },

      onError: () => {
        toast.error(
          "Unable to update user"
        );
      },
    });

  if (
    isLoading
  ) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <>
      <PageHeader
        title="Edit User"
      />

      <form
        className="card p-6 space-y-4"
        onSubmit={handleSubmit(
          (
            data
          ) =>
            mutation.mutate(
              data
            )
        )}
      >

        <div>
          <label>
            Full Name
          </label>

          <input
            className="input"
            {...register(
              "fullName"
            )}
          />
        </div>

        <div>
          <label>
            Email
          </label>

          <input
            className="input"
            {...register(
              "email"
            )}
          />
        </div>

        <div>
          <label>
            Phone Number
          </label>

          <input
            className="input"
            {...register(
              "phoneNumber"
            )}
          />
        </div>

        <div className="flex items-center gap-2">

          <input
            type="checkbox"
            {...register(
              "isActive"
            )}
          />

          <label>
            Active User
          </label>

        </div>

        <button
          className="btn-primary"
          type="submit"
        >
          Save Changes
        </button>

      </form>
    </>
  );
}