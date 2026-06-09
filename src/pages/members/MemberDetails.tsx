import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import PageHeader from "../../components/layouts/PageHeader";

import LoadingSpinner from "../../components/common/LoadingSpinner";

import { memberService } from "../../lib/api/memberService";

export default function MemberDetails() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["member", id],

    queryFn: () =>
      memberService.getDetails(id!),

    enabled: !!id,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const member = data?.data;

  return (
    <>
      <PageHeader
        title={`${member?.firstName} ${member?.lastName}`}
      />

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl">
          <h3>Profile</h3>

          <p>
            {member?.membershipNumber}
          </p>

          <p>{member?.email}</p>

          <p>{member?.phoneNumber}</p>
        </div>

        <div className="col-span-3 bg-white p-6 rounded-xl">
          <h3>Departments</h3>

          <div className="flex gap-2">
            {member?.departments.map(
              (department) => (
                <span
                  key={department}
                  className="badge"
                >
                  {department}
                </span>
              )
            )}
          </div>
        </div>

      </div>
    </>
  );
}