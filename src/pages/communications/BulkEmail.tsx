import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import PageHeader from "../../components/layouts/PageHeader";

import { memberService } from "../../lib/api/memberService";
import { departmentService } from "../../lib/api/departmentService";
import { communicationService } from "../../lib/api/communicationService";

import type { BulkEmailDto } from "../../lib/types/communication";

export default function BulkEmail() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<BulkEmailDto>({
    defaultValues: {
      memberIds: [],
      subject: "",
      message: "",
    },
  });

  const selectedMembers =
    watch("memberIds");

  const { data: membersResponse } =
    useQuery({
      queryKey: ["members"],
      queryFn: () =>
        memberService.list(),
    });

  const members =
    membersResponse?.data ?? [];

  const { data: departmentsResponse } =
    useQuery({
      queryKey: ["departments"],
      queryFn: () =>
        departmentService.list(),
    });

  const departments =
    departmentsResponse?.data ?? [];

  const mutation =
    useMutation({
      mutationFn:
        communicationService.sendEmail,

      onSuccess: () => {
        toast.success(
          "Email sent successfully"
        );
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ??
            "Failed to send email"
        );
      },
    });

  const selectDepartment =
    async (
      departmentId: string
    ) => {
      if (!departmentId) {
        setValue("memberIds", []);
        return;
      }

      const response =
        await departmentService.get(
          departmentId
        );

      const ids =
        response.data.members.map(
          (x: any) => x.memberId
        );

      setValue(
        "memberIds",
        ids
      );
    };

  const onSubmit = (
    data: BulkEmailDto
  ) => {
    mutation.mutate(data);
  };

  return (
    <>
      <PageHeader
        title="Bulk Email"
        subtitle="Send email to members"
      />

      <form
        className="bg-white p-6 rounded-xl space-y-4"
        onSubmit={handleSubmit(
          onSubmit
        )}
      >
        <div>
          <label className="block mb-1">
            Department
          </label>

          <select
            className="input w-full"
            onChange={(e) =>
              selectDepartment(
                e.target.value
              )
            }
          >
            <option value="">
              Select Department
            </option>

            {departments.map(
              (dept: any) => (
                <option
                  key={dept.id}
                  value={dept.id}
                >
                  {dept.name}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className="block mb-1">
            Recipients
          </label>

          <select
            multiple
            className="input w-full h-60"
            value={
              selectedMembers ?? []
            }
            onChange={(e) => {
              const values =
                Array.from(
                  e.target
                    .selectedOptions
                ).map(
                  (option) =>
                    option.value
                );

              setValue(
                "memberIds",
                values
              );
            }}
          >
            {members.map(
              (member: any) => (
                <option
                  key={member.id}
                  value={member.id}
                >
                  {member.firstName}{" "}
                  {member.lastName}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className="block mb-1">
            Subject
          </label>

          <input
            {...register(
              "subject"
            )}
            className="input w-full"
            placeholder="Enter email subject"
          />
        </div>

        <div>
          <label className="block mb-1">
            Message
          </label>

          <textarea
            {...register(
              "message"
            )}
            rows={8}
            className="input w-full"
            placeholder="Type your email message..."
          />
        </div>

        <div className="text-sm text-slate-500">
          Selected Recipients:{" "}
          {selectedMembers?.length ??
            0}
        </div>

        <button
          type="submit"
          disabled={
            mutation.isPending
          }
          className="btn-primary"
        >
          {mutation.isPending
            ? "Sending..."
            : "Send Email"}
        </button>
      </form>
    </>
  );
}