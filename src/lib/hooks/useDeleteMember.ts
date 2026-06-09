import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { memberService } from "../api/memberService";

export const useDeleteMember =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        memberService.delete,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["members"],
        });

        toast.success(
          "Member deleted"
        );
      },
    });
  };