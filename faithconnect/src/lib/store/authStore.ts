import { create } from "zustand";

interface AuthState {
  token: string | null;

  user: any;

  roles: string[];

  setAuth: (
    token: string,
    user: any,
    roles: string[]
  ) => void;

  logout: () => void;

  hasRole: (
    role: string
  ) => boolean;

  hasAnyRole: (
    roles: string[]
  ) => boolean;
}

export const useAuthStore =
  create<AuthState>(
    (set, get) => ({
      token:
        localStorage.getItem(
          "token"
        ),

      user: JSON.parse(
        localStorage.getItem(
          "user"
        ) || "null"
      ),

      roles: JSON.parse(
        localStorage.getItem(
          "roles"
        ) || "[]"
      ),

      setAuth: (
        token,
        user,
        roles
      ) => {
        localStorage.setItem(
          "token",
          token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        localStorage.setItem(
          "roles",
          JSON.stringify(
            roles
          )
        );

        set({
          token,
          user,
          roles,
        });
      },

      logout: () => {
        localStorage.clear();

        set({
          token: null,
          user: null,
          roles: [],
        });
      },

      hasRole: (
        role: string
      ) => {
        return get()
          .roles.includes(
            role
          );
      },

      hasAnyRole: (
        roles: string[]
      ) => {
        return roles.some(
          (r) =>
            get()
              .roles.includes(
                r
              )
        );
      },
    })
  );