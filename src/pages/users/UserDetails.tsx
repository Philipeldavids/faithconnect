import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import PageHeader from "../../components/layouts/PageHeader";

import LoadingSpinner from "../../components/common/LoadingSpinner";

import { userService } from "../../lib/api/userService";

export default function UserDetails() {
  const { id } = useParams();

  const { data, isLoading } =
    useQuery({
      queryKey: ["user", id],

      queryFn: () =>
        userService.get(id!),

      enabled: !!id,
    });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const user = data?.data;

  return (
    <>
      <PageHeader
        title="User Details"
        subtitle={user?.fullName}
      />

      <div className="card p-6">

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="font-semibold">
              Full Name
            </label>

            <p>
              {user?.fullName}
            </p>
          </div>

          <div>
            <label className="font-semibold">
              Email
            </label>

            <p>
              {user?.email}
            </p>
          </div>

          <div>
            <label className="font-semibold">
              Phone Number
            </label>

            <p>
              {user?.phoneNumber}
            </p>
          </div>

          <div>
            <label className="font-semibold">
              Username
            </label>

            <p>
              {user?.userName}
            </p>
          </div>

          <div>
            <label className="font-semibold">
              Church Id
            </label>

            <p>
              {user?.churchId}
            </p>
          </div>

          <div>
            <label className="font-semibold">
              Status
            </label>

            <p>
              {user?.isActive
                ? "Active"
                : "Inactive"}
            </p>
          </div>

        </div>

      </div>
    </>
  );
}