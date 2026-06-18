import {
  useForm,
} from "react-hook-form";

import {
  useMutation,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import PageHeader
from "../../components/layouts/PageHeader";

import {
  authService,
} from "../../lib/api/authService";

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordPage() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>();

  const mutation =
    useMutation({
      mutationFn:
        authService.changePassword,

      onSuccess: () => {
        toast.success(
          "Password changed successfully"
        );

        reset();
      },
    });

  return (
    <>
      <PageHeader
        title="Change Password"
      />

      <form
        onSubmit={handleSubmit(
          (data) => {
      mutation.mutate(data);
    }
        )}
        className="
          card
          p-6
          space-y-4
        "
      >
        <input
          type="password"
          placeholder="Current Password"
          {...register(
            "currentPassword"
          )}
          className="input"
        />

        <input
          type="password"
          placeholder="New Password"
          {...register(
            "newPassword"
          )}
          className="input"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          {...register(
            "confirmPassword"
          )}
          className="input"
        />

        <button
          className="btn-primary"
        >
          Update Password
        </button>
      </form>
    </>
  );
}