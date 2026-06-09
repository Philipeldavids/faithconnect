import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import DepartmentForm
from "../../components/forms/DepartmentForm";

import {
  departmentService,
} from "../../lib/api/departmentService";

export default function EditDepartment() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const { data } = useQuery({
    queryKey: [
      "department",
      id,
    ],

    queryFn: () =>
      departmentService.get(
        id!
      ),

    enabled: !!id,
  });

  const mutation =
    useMutation({
      mutationFn: (
        values: any
      ) =>
        departmentService.update(
          id!,
          values
        ),

      onSuccess: () => {
        toast.success(
          "Department updated"
        );

        navigate(
          "/dashboard/departments"
        );
      },
    });

  if (!data)
    return null;

  return (
    <DepartmentForm
      defaultValues={{
        name:
          data.data.name,

        description:
          data.data.description,
      }}
      loading={
        mutation.isPending
      }
      onSubmit={(values) =>
        mutation.mutate(
          values
        )
      }
    />
  );
}