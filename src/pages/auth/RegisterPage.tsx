import { useNavigate }
from "react-router-dom";

import { useForm }
from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  useMutation,
} from "@tanstack/react-query";

import toast
from "react-hot-toast";

import {
  registerSchema,
  type 
  RegisterFormData,
} from "../../lib/validation/registerSchema";

import {
  authService,
} from "../../lib/api/authService";

import {
  useAuthStore,
} from "../../lib/store/authStore";

export default function RegisterPage() {
  const navigate =
    useNavigate();

  const setAuth =
    useAuthStore(
      (x) => x.setAuth
    );

  const {
    register,
    handleSubmit,
  
  } =
    useForm<RegisterFormData>({
      resolver:
        zodResolver(
          registerSchema
        ),
    });

  const mutation =
    useMutation({
      mutationFn: (
        data:
          RegisterFormData
      ) =>
        authService.register(
          data
        ),

      onSuccess: (
        response
      ) => {
        setAuth(
          response.data
            .accessToken,
          response.data,
          response.data.roles
        );

        toast.success(
          "Account created"
        );

        navigate("/login");
      },

      onError: (
        error: any
      ) => {
        toast.error(
          error.response
            ?.data ??
            "Registration failed"
        );
      },
    });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Church
        </h1>

        <form
          onSubmit={handleSubmit(
            (data) =>
              mutation.mutate(
                data
              )
          )}
          className="space-y-4"
        >
          <input
            className="input"
            placeholder="Church Name"
            {...register(
              "churchName"
            )}
          />

          <input
            className="input"
            placeholder="First Name"
            {...register(
              "firstName"
            )}
          />

          <input
            className="input"
            placeholder="Last Name"
            {...register(
              "lastName"
            )}
          />

          <input
            className="input"
            placeholder="Email"
            {...register(
              "email"
            )}
          />

          <input
            className="input"
            placeholder="Phone Number"
            {...register(
              "phoneNumber"
            )}
          />

          <input
            type="password"
            className="input"
            placeholder="Password"
            {...register(
              "password"
            )}
          />

          <input
            type="password"
            className="input"
            placeholder="Confirm Password"
            {...register(
              "confirmPassword"
            )}
          />

          <button
            type="submit"
            className="btn-primary w-full"
          >
            Create Church
          </button>
        </form>
      </div>
    </div>
  );
}