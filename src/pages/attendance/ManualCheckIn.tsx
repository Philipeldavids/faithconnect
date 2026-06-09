import { useForm }
from "react-hook-form";

import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import toast
from "react-hot-toast";

import PageHeader
from "../../components/layouts/PageHeader";

import { serviceService }
from "../../lib/api/serviceService";

import { memberService }
from "../../lib/api/memberService";

import { attendanceService }
from "../../lib/api/attendanceService";
import { type ManualAttendanceDto } from "../../lib/types/attendance";

export default function ManualCheckIn() {
  const {
    register,
    handleSubmit,
  } = useForm<ManualAttendanceDto>();

  const { data: services } =
    useQuery({
      queryKey: [
        "services",
      ],
      queryFn: () =>
        serviceService.list(),
    });
     
  const { data: members } =
    useQuery({
      queryKey: [
        "members",
      ],
      queryFn: () =>
        memberService.list(),
    });

  const mutation =
    useMutation({
      mutationFn:
        attendanceService
          .manualCheckIn,

      onSuccess: () =>
        toast.success(
          "Attendance saved"
        ),
    });

  return (
    <>
      <PageHeader
        title="Manual Check-In"
      />

      <form
        className="card p-6 space-y-4"
       onSubmit={handleSubmit(
  (data) => {
    console.log(
      "Attendance Payload:",
      data
    );
    console.log(
  typeof data.status
);

    mutation.mutate(data);
  }
)}
      >
        <select
          {...register(
            "serviceId"
          )}
          className="input"
        >
          <option value="">
            Select Service
          </option>

          {services?.data?.map(
            (x: any) => (
              <option
                key={x.id}
                value={x.id}
              >
                {x.name}
              </option>
            )
          )}
        </select>

        <select
          {...register(
            "memberId"
          )}
          className="input"
        >
          <option value="">
            Select Member
          </option>

          {members?.data?.map(
            (x: any) => (
              <option
                key={x.id}
                value={x.id}
              >
                {x.firstName}
                {" "}
                {x.lastName}
              </option>
            )
          )}
        </select>

        <select
          {...register(
            "status",
            {
      valueAsNumber: true,
    }
          )}
          className="input"
        >
          <option value={1}>
            Present
          </option>

          <option value={2}>
            Late
          </option>

          <option value={3}>
            Absent
          </option>
        </select>

        <button
          className="btn-primary"
        >
          Save Attendance
        </button>
      </form>
    </>
  );
}