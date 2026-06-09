import {
  useForm,
} from "react-hook-form";

import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import PageHeader from "../../components/layouts/PageHeader";

import {
  settingsService,
} from "../../lib/api/settingsService";

export default function SettingsPage() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useQuery({
    queryKey: ["settings"],

    queryFn: async () => {
      const res =
        await settingsService.get();

      reset(res.data);

      return res.data;
    },
  });

  const mutation =
    useMutation({
      mutationFn:
        settingsService.update,

      onSuccess: () =>
        toast.success(
          "Settings updated"
        ),
    });

  return (
    <>
      <PageHeader
        title="Church Settings"
        subtitle="Manage church profile and attendance defaults"
      />

      <form
        className="
          bg-white
          rounded-xl
          p-6
          space-y-4
        "
        onSubmit={handleSubmit(
          (data) =>
            mutation.mutate(data)
        )}
      >
        <div>
          <label>
            Church Name
          </label>

          <input
            {...register(
              "name"
            )}
            className="input"
          />
        </div>

        <div>
          <label>Email</label>

          <input
            {...register(
              "email"
            )}
            className="input"
          />
        </div>

        <div>
          <label>Phone</label>

          <input
            {...register(
              "phoneNumber"
            )}
            className="input"
          />
        </div>

        <div>
          <label>Address</label>

          <textarea
            {...register(
              "address"
            )}
            className="input"
          />
        </div>

        <div>
          <label>Website</label>

          <input
            {...register(
              "website"
            )}
            className="input"
          />
        </div>

        <div>
          <label>
            Logo URL
          </label>

          <input
            {...register(
              "logoUrl"
            )}
            className="input"
          />
        </div>

        <div>
          <label>
            Church Latitude
          </label>

          <input
            type="number"
            step="0.000001"
            {...register(
              "latitude"
            )}
            className="input"
          />
        </div>

        <div>
          <label>
            Church Longitude
          </label>

          <input
            type="number"
            step="0.000001"
            {...register(
              "longitude"
            )}
            className="input"
          />
        </div>

        <div>
          <label>
            Default Attendance Radius (Meters)
          </label>

          <input
            type="number"
            {...register(
              "defaultAllowedRadiusMeters"
            )}
            className="input"
          />
        </div>

        <button
          className="btn-primary"
        >
          Save Settings
        </button>
      </form>
    </>
  );
}