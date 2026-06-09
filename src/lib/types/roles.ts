export const Role = {
  ChurchAdmin: "ChurchAdmin",
  Pastor: "Pastor",
  Member: "Member",
} as const;

export type Role =
  (typeof Role)[keyof typeof Role];