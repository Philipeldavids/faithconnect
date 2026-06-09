import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { memberService } from "../api/memberService";

export const useCreateMember =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        memberService.create,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["members"],
        });

        toast.success(
          "Member created successfully"
        );
      },

      onError: () => {
        toast.error(
          "Unable to create member"
        );
      },
    });
  };