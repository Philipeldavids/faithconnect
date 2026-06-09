import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import PageHeader
from "../../components/layouts/PageHeader";

import { roleService }
from "../../lib/api/roleService";

import { userService }
from "../../lib/api/userService";

export default function AssignRoles() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [roles,
    setRoles] =
    useState<string[]>([]);

  const { data } =
    useQuery({
      queryKey: ["roles"],

      queryFn: async () => {
        const response =
          await roleService.list();

        return response;
      },
    });
const allRoles =
  data?.data ?? [];

  const { data: userRoles } =
    useQuery({
      queryKey:
        ["user-roles", id],

      queryFn: async () => {
        const response =
          await userService
            .getUserRoles(
              id!
            );

        return response.data;
      },

      enabled: !!id,
    });

  useEffect(() => {
    if (userRoles) {
      setRoles(userRoles);
    }
  }, [userRoles]);

  const mutation =
    useMutation({
      mutationFn: () =>
        userService.assignRoles({
          userId: id!,
          roles,
        }),

      onSuccess: () => {
        toast.success(
          "Roles updated"
        );

        navigate("/users");
      },
    });

  const toggleRole =
    (role: string) => {
      if (
        roles.includes(role)
      ) {
        setRoles(
          roles.filter(
            (x) =>
              x !== role
          )
        );

        return;
      }

      setRoles([
        ...roles,
        role,
      ]);
    };

  return (
    <>
      <PageHeader
        title="Assign Roles"
      />

      <div className="card p-6">

        <div className="space-y-3">

          {allRoles?.map(
            (role: any) => (
              <label
                key={role.id}
                className="flex items-center gap-3"
              >
                <input
                  type="checkbox"
                  checked={roles.includes(
                    role.name
                  )}
                  onChange={() =>
                    toggleRole(
                      role.name
                    )
                  }
                />

                {role.name}
              </label>
            )
          )}

        </div>

        <button
          className="btn-primary mt-6"
          onClick={() =>
            mutation.mutate()
          }
        >
          Save Roles
        </button>

      </div>
    </>
  );
}