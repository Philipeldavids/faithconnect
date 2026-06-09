import { useMutation }
from "@tanstack/react-query";

import { useNavigate }
from "react-router-dom";

import toast
from "react-hot-toast";

import DepartmentForm
from "../../components/forms/DepartmentForm";

import {
  departmentService
} from "../../lib/api/departmentService";

export default function CreateDepartment() {
  const navigate =
    useNavigate();

  const mutation =
    useMutation({
      mutationFn:
        departmentService.create,

      onSuccess: () => {
        toast.success(
          "Department created"
        );

        navigate(
          "/dashboard/departments"
        );
      },
    });

  return (
    <DepartmentForm
      loading={
        mutation.isPending
      }
      onSubmit={(data) =>
        mutation.mutate(data)
      }
    />
  );
}