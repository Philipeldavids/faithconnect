import { useQuery }
from "@tanstack/react-query";

import PageHeader
from "../../components/layouts/PageHeader";

import { memberPortalService }
from "../../lib/api/memberPortalService";

export default function MemberDashboard() {
  const { data } =
    useQuery({
      queryKey: [
        "member-dashboard",
      ],
      queryFn: () =>
        memberPortalService.dashboard(),
    });

  return (
    <>
      <PageHeader
        title="My Dashboard"
      />

      <div className="grid grid-cols-3 gap-4">
        <div className="card p-6">
          <h3>
            Attendance %
          </h3>

          <p className="text-3xl font-bold">
            {
              data?.data
                ?.attendancePercentage
            }
            %
          </p>
        </div>

        <div className="card p-6">
          <h3>
            Services Attended
          </h3>

          <p className="text-3xl font-bold">
            {
              data?.data
                ?.servicesAttended
            }
          </p>
        </div>

        <div className="card p-6">
          <h3>
            Upcoming Services
          </h3>

          <p className="text-3xl font-bold">
            {
              data?.data
                ?.upcomingServices
            }
          </p>
        </div>
      </div>
    </>
  );
}