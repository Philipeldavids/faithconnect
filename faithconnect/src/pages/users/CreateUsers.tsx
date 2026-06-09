import { useForm }
from "react-hook-form";

import { useMutation }
from "@tanstack/react-query";

import toast
from "react-hot-toast";

import PageHeader
from "../../components/layouts/PageHeader";

import { userService }
from "../../lib/api/userService";

export default function CreateUser() {
  const {
    register,
    handleSubmit,
  } = useForm();

  const mutation =
    useMutation({
      mutationFn:
        userService.create,

      onSuccess: () =>
        toast.success(
          "User created"
        ),
    });

  return (
    <>
      <PageHeader
        title="Create User"
      />

      <form
        className="card p-6 space-y-4"
        onSubmit={handleSubmit(
          (data) =>
            mutation.mutate(
              data as any
            )
        )}
      >
        <input
          {...register(
            "fullName"
          )}
          className="input"
          placeholder="Full Name"
        />

        <input
          {...register(
            "email"
          )}
          className="input"
          placeholder="Email"
        />

        <input
          {...register(
            "phoneNumber"
          )}
          className="input"
          placeholder="Phone"
        />

        <input
          type="password"
          {...register(
            "password"
          )}
          className="input"
          placeholder="Password"
        />

        <button
          className="btn-primary"
        >
          Save
        </button>
      </form>
    </>
  );
}