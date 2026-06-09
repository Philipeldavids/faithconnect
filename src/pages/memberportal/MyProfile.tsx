import { useEffect }
from "react";

import { useForm }
from "react-hook-form";

import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";

import toast
from "react-hot-toast";

import PageHeader
from "../../components/layouts/PageHeader";

import {
  memberPortalService,
} from "../../lib/api/memberPortalService";

interface ProfileForm {
  email: string;

  phoneNumber: string;

  address: string;

  occupation: string;

  emergencyContactName: string;

  emergencyContactPhone: string;
}

export default function MyProfile() {
  const {
    register,
    handleSubmit,
    reset,
  } =
    useForm<ProfileForm>();

  const {
    data,
    isLoading,
  } =
    useQuery({
      queryKey: [
        "member-profile",
      ],

      queryFn: () =>
        memberPortalService
          .profile(),
    });

  useEffect(() => {
    if (data?.data) {
      reset({
        email:
          data.data.email,

        phoneNumber:
          data.data.phoneNumber,

        address:
          data.data.address,

        occupation:
          data.data.occupation,

        emergencyContactName:
          data.data
            .emergencyContactName,

        emergencyContactPhone:
          data.data
            .emergencyContactPhone,
      });
    }
  }, [data, reset]);

  const mutation =
    useMutation({
      mutationFn:
        memberPortalService
          .updateProfile,

      onSuccess: () => {
        toast.success(
          "Profile updated"
        );
      },

      onError: () => {
        toast.error(
          "Unable to update profile"
        );
      },
    });

  const onSubmit = (
    form: ProfileForm
  ) => {
    mutation.mutate(form);
  };

  if (isLoading)
    return (
      <div>
        Loading...
      </div>
    );

  return (
    <>
      <PageHeader
        title="My Profile"
        subtitle="Manage your information"
      />

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="card p-6"
      >
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label>
              First Name
            </label>

            <input
              value={
                data?.data
                  ?.firstName ??
                ""
              }
              disabled
              className="input bg-slate-100"
            />
          </div>

          <div>
            <label>
              Last Name
            </label>

            <input
              value={
                data?.data
                  ?.lastName ??
                ""
              }
              disabled
              className="input bg-slate-100"
            />
          </div>

          <div>
            <label>
              Membership Number
            </label>

            <input
              value={
                data?.data
                  ?.membershipNumber ??
                ""
              }
              disabled
              className="input bg-slate-100"
            />
          </div>

          <div>
            <label>
              Email
            </label>

            <input
              {...register(
                "email"
              )}
              className="input"
            />
          </div>

          <div>
            <label>
              Phone Number
            </label>

            <input
              {...register(
                "phoneNumber"
              )}
              className="input"
            />
          </div>

          <div>
            <label>
              Occupation
            </label>

            <input
              {...register(
                "occupation"
              )}
              className="input"
            />
          </div>

          <div className="col-span-2">
            <label>
              Address
            </label>

            <textarea
              {...register(
                "address"
              )}
              className="input"
              rows={3}
            />
          </div>

          <div>
            <label>
              Emergency Contact
            </label>

            <input
              {...register(
                "emergencyContactName"
              )}
              className="input"
            />
          </div>

          <div>
            <label>
              Emergency Phone
            </label>

            <input
              {...register(
                "emergencyContactPhone"
              )}
              className="input"
            />
          </div>

        </div>

        <button
          type="submit"
          className="btn-primary mt-6"
          disabled={
            mutation.isPending
          }
        >
          {mutation.isPending
            ? "Saving..."
            : "Update Profile"}
        </button>
      </form>
    </>
  );
}