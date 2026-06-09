import { z } from "zod";

export const registerSchema =
  z
    .object({
      churchName:
        z.string().min(2),

      firstName:
        z.string().min(2),

      lastName:
        z.string().min(2),

      email:
        z.string().email(),

      phoneNumber:
        z.string().min(8),

      password:
        z.string().min(6),

      confirmPassword:
        z.string().min(6),
    })
    .refine(
      (x) =>
        x.password ===
        x.confirmPassword,
      {
        message:
          "Passwords do not match",
        path: [
          "confirmPassword",
        ],
      }
    );

export type RegisterFormData =
  z.infer<
    typeof registerSchema
  >;