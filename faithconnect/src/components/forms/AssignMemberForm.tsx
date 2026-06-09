import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { memberService } from "../../lib/api/memberService";
import { departmentService } from "../../lib/api/departmentService";

interface Props {
  departmentId: string;
  onSuccess: () => void;
}

interface FormValues {
  memberId: string;
}

export default function AssignMemberForm({
  departmentId,
  onSuccess,
}: Props) {
  const { data } = useQuery({
    queryKey: ["members"],
    queryFn: () => memberService.list(),
  });

  const members = data?.data ?? [];

  const { register, handleSubmit } =
    useForm<FormValues>();

  const submit = async (
    values: FormValues
  ) => {
    await departmentService.assignMember({
      memberId: values.memberId,
      departmentId,
    });

    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-4"
    >
      <select
        {...register("memberId")}
        className="input w-full"
      >
        <option value="">
          Select Member
        </option>

        {members.map((member) => (
          <option
            key={member.id}
            value={member.id}
          >
            {member.firstName} {member.lastName}
          </option>
        ))}
      </select>

      <button
        className="btn-primary"
        type="submit"
      >
        Assign Member
      </button>
    </form>
  );
}