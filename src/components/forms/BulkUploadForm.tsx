import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { memberService } from "../../lib/api/memberService";

export default function BulkUploadForm() {
  const [file, setFile] =
    useState<File | null>(null);

    const onUpload = () => {
  if (!file) return;

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  uploadMutation.mutate(
    formData
  );
};
//   const upload = async () => {
//     if (!file) return;

    
//     try {
//       await memberService.bulkUpload(
//         file
//       );

//       toast.success(
//         "Upload successful"
//       );
//     } catch {
//       toast.error(
//         "Upload failed"
//       );
//     }
//   };
const uploadMutation =
  useMutation({
    mutationFn: (
      formData: FormData
    ) =>
      memberService.bulkUpload(
        formData
      ),

    onSuccess: () => {
      toast.success(
        "Upload successful"
      );
    },
  });
  return (
    <div className="bg-white p-6 rounded-xl">
      <input
        type="file"
        accept=".xlsx"
        onChange={(e) =>
          setFile(
            e.target.files?.[0] ??
              null
          )
        }
      />

      <button
        onClick={onUpload}
        className="btn-primary mt-4"
      >
        Upload
      </button>
    </div>
  );
}