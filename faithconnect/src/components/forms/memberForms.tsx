import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { memberService } from "../../lib/api/memberService";

import {
  memberSchema,
  type MemberFormData,
} from "../../lib/validation/memberSchema";

export default function MemberForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
  });

  const createMutation =
    useMutation({
      mutationFn:
        memberService.create,

      onSuccess: () => {
        toast.success(
          "Member created successfully"
        );

        navigate("/members");
      },

      onError: () => {
        toast.error(
          "Unable to create member"
        );
      },
    });

  const onSubmit = (
    data: MemberFormData
  ) => {
    createMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* First Name */}

        <div>
          <label>First Name</label>

          <input
            {...register("firstName")}
            className="input"
          />

          <p className="text-red-500 text-sm">
            {errors.firstName?.message}
          </p>
        </div>

        {/* Last Name */}

        <div>
          <label>Last Name</label>

          <input
            {...register("lastName")}
            className="input"
          />

          <p className="text-red-500 text-sm">
            {errors.lastName?.message}
          </p>
        </div>

        {/* Other Name */}

        <div>
          <label>Other Name</label>

          <input
            {...register("otherName")}
            className="input"
          />
        </div>

        {/* Gender */}

        <div>
          <label>Gender</label>

          <select
            {...register("gender")}
            className="input"
          >
            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>
          </select>

          <p className="text-red-500 text-sm">
            {errors.gender?.message}
          </p>
        </div>

        {/* Date Of Birth */}

        <div>
          <label>Date Of Birth</label>

          <input
            type="date"
            {...register("dateOfBirth")}
            className="input"
          />
        </div>

        {/* Marital Status */}

        <div>
          <label>Marital Status</label>

          <select
            {...register("maritalStatus")}
            className="input"
          >
            <option value="">
              Select Status
            </option>

            <option value="Single">
              Single
            </option>

            <option value="Married">
              Married
            </option>

            <option value="Divorced">
              Divorced
            </option>

            <option value="Widowed">
              Widowed
            </option>
          </select>
        </div>

        {/* Phone */}

        <div>
          <label>Phone Number</label>

          <input
            {...register("phoneNumber")}
            className="input"
          />

          <p className="text-red-500 text-sm">
            {errors.phoneNumber?.message}
          </p>
        </div>

        {/* Email */}

        <div>
          <label>Email</label>

          <input
            type="email"
            {...register("email")}
            className="input"
          />

          <p className="text-red-500 text-sm">
            {errors.email?.message}
          </p>
        </div>

        {/* Occupation */}

        <div>
          <label>Occupation</label>

          <input
            {...register("occupation")}
            className="input"
          />
        </div>

        {/* Address */}

        <div className="md:col-span-2">
          <label>Address</label>

          <textarea
            {...register("address")}
            rows={3}
            className="input"
          />
        </div>

      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="btn-primary"
          disabled={
            createMutation.isPending
          }
        >
          {createMutation.isPending
            ? "Saving..."
            : "Save Member"}
        </button>
      </div>
    </form>
  );
}