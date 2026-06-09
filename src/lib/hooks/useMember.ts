import { useQuery } from "@tanstack/react-query";

import { memberService } from "../api/memberService";

export const useMember = (
  id: string
) =>
  useQuery({
    queryKey: ["member", id],

    queryFn: () =>
      memberService.get(id),

    enabled: !!id,
  });