import {
  useState,
  useEffect,
} from "react";

import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import PageHeader
from "../../components/layouts/PageHeader";

import { roleService }
from "../../lib/api/roleService";

import { permissionService }
from "../../lib/api/permissionService";

export default function RolePermissionAssignment() {
  const [roleId, setRoleId] =
    useState("");

  const [
    selectedPermissions,
    setSelectedPermissions,
  ] = useState<string[]>([]);

  const { data: rolesResponse } =
    useQuery({
      queryKey: ["roles"],
      queryFn: () =>
        roleService.list(),
    });

  const roles =
    rolesResponse?.data ?? [];

  const {
    data: permissionsResponse,
  } = useQuery({
    queryKey: ["permissions"],
    queryFn: () =>
      permissionService.list(),
  });

  const permissions =
    permissionsResponse?.data ?? [];

  const {
    data: rolePermissions,
    refetch,
  } = useQuery({
    queryKey: [
      "role-permissions",
      roleId,
    ],

    queryFn: () =>
      permissionService.getRolePermissions(
        roleId
      ),

    enabled: !!roleId,
  });

  useEffect(() => {
    if (
      rolePermissions?.data
        ?.permissions
    ) {
      setSelectedPermissions(
        rolePermissions.data.permissions.map(
          (x: any) => x.id
        )
      );
    }
  }, [rolePermissions]);

  const mutation =
    useMutation({
      mutationFn:
        permissionService.assign,

      onSuccess: () => {
        toast.success(
          "Permissions updated"
        );

        refetch();
      },
    });

  const togglePermission = (
    permissionId: string
  ) => {
    if (
      selectedPermissions.includes(
        permissionId
      )
    ) {
      setSelectedPermissions(
        selectedPermissions.filter(
          (x) =>
            x !== permissionId
        )
      );

      return;
    }

    setSelectedPermissions([
      ...selectedPermissions,
      permissionId,
    ]);
  };

  const savePermissions =
    () => {
      mutation.mutate({
        roleId,
        permissionIds:
          selectedPermissions,
      });
    };

  return (
    <>
      <PageHeader
        title="Role Permissions"
        subtitle="Assign permissions to roles"
      />

      <div className="card p-6 space-y-6">
        <div>
          <label className="block mb-2">
            Select Role
          </label>

          <select
            className="input"
            value={roleId}
            onChange={(e) =>
              setRoleId(
                e.target.value
              )
            }
          >
            <option value="">
              Select Role
            </option>

            {roles.map(
              (role: any) => (
                <option
                  key={role.id}
                  value={role.id}
                >
                  {role.name}
                </option>
              )
            )}
          </select>
        </div>

        {roleId && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {permissions.map(
                (
                  permission: any
                ) => (
                  <label
                    key={
                      permission.id
                    }
                    className="flex items-center gap-3 border rounded-lg p-3"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(
                        permission.id
                      )}
                      onChange={() =>
                        togglePermission(
                          permission.id
                        )
                      }
                    />

                    <div>
                      <div className="font-medium">
                        {
                          permission.name
                        }
                      </div>

                      <div className="text-sm text-slate-500">
                        {
                          permission.description
                        }
                      </div>
                    </div>
                  </label>
                )
              )}
            </div>

            <button
              onClick={
                savePermissions
              }
              className="btn-primary"
            >
              Save Permissions
            </button>
          </>
        )}
      </div>
    </>
  );
}