import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver }
from "@hookform/resolvers/zod";

import { useMutation }
from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  loginSchema,
  type
  LoginFormData,
} from "../../lib/validation/authSchema";

import { authService }
from "../../lib/api/authService";

import { useAuthStore }
from "../../lib/store/authStore";

export default function LoginPage() {
  const navigate =
    useNavigate();
const LogoUrl = "https://res.cloudinary.com/dck7rspdt/image/upload/v1781008293/GhConnectLogo_n8yk7q.png";
  const setAuth =
    useAuthStore(
      (x) => x.setAuth
    );

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>({
    resolver:
      zodResolver(
        loginSchema
      ),
  });

  const loginMutation =
    useMutation({
      mutationFn: (
        data: LoginFormData
      ) =>
        authService.login(
          data
        ),


      onSuccess: (
        response
      ) => {
        const roles =
  response.data.roles ?? [];

setAuth(
  response.data.accessToken,
  response.data,
  roles
);

navigate(
  getDefaultRoute(
    roles
  )
);


        toast.success(
          "Login successful"
        );

      },

      onError: (
        error: any
      ) => {
        toast.error(
          error?.response?.data ??
            "Login failed"
        );
      },
    });

    // lib/utils/navigation.ts

const getDefaultRoute =
  (roles: string[]) => {

    if (
      roles.includes(
        "SuperAdmin"
      )
    )
      return "/dashboard";

    if (
      roles.includes(
        "ChurchAdmin"
      )
    )
      return "/dashboard";

    if (
      roles.includes(
        "Pastor"
      )
    )
      return "/dashboard";

    if (
      roles.includes(
        "AttendanceOfficer"
      )
    )
      return "/attendance";

    if (
      roles.includes(
        "Member"
      )
    )
      return "/portal";

    return "/";
  };
  const onSubmit = (
    data: LoginFormData
  ) => {
    loginMutation.mutate(
      data
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
           <img 
            height="100"    
           width="250"           
           src={LogoUrl} alt="GHConnect"/>
          </h1>

          <p className="text-slate-500 mt-2">
            Sign in to continue
          </p>
        </div>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1">
              Email
            </label>

            <input
              type="email"
              className="input"
              {...register(
                "email"
              )}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {
                  errors.email
                    .message
                }
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1">
              Password
            </label>

            <input
              type="password"
              className="input"
              {...register(
                "password"
              )}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {
                  errors
                    .password
                    .message
                }
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={
              isSubmitting ||
              loginMutation.isPending
            }
            className="btn-primary w-full"
          >
            {loginMutation.isPending
              ? "Signing In..."
              : "Sign In"}
          </button>
          <div>
            <Link
            to="/signup" 
            >
            Sign Up
                </Link>
          </div>
        </form>
      </div>
    </div>
  );
}