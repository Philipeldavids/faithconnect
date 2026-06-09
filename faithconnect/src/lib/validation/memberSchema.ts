import { z } from "zod";

export const memberSchema =
  z.object({
    firstName:
      z.string().min(2),

    lastName:
      z.string().min(2),

    otherName:
      z.string().optional(),

    gender:
      z.string().min(1),

    dateOfBirth:
      z.string().optional(),

    maritalStatus:
      z.string().optional(),

    phoneNumber:
      z.string().min(6),

    email:
      z.string().email(),

    occupation:
      z.string().optional(),

    address:
      z.string().optional(),
  });

export type MemberFormData =
  z.infer<
    typeof memberSchema
  >;