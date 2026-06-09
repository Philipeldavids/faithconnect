import { useState } from "react";

import {
  useMutation,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import PageHeader
from "../../components/layouts/PageHeader";

import { memberService }
from "../../lib/api/memberService";

export default function BulkUploadMembers() {
  const [file, setFile] =
    useState<File | null>(
      null
    );

  const uploadMutation =
    useMutation({
      mutationFn: async () => {
        if (!file) {
          throw new Error(
            "Select a file"
          );
        }

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        return memberService.bulkUpload(
          formData
        );
      },

      onSuccess: () => {
        toast.success(
          "Members uploaded successfully"
        );

        setFile(null);
      },

      onError: (
        error: any
      ) => {
        toast.error(
          error.message
        );
      },
    });

  const downloadTemplate =
    async () => {
      const response =
        await memberService.downloadTemplate();

      const url =
        window.URL.createObjectURL(
          new Blob([
            response.data,
          ])
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        "MemberUploadTemplate.xlsx";

      link.click();
    };

  return (
    <>
      <PageHeader
        title="Bulk Upload Members"
        subtitle="Upload members from Excel"
      />

      <div className="card p-6 space-y-6">

        <div className="flex gap-4">
          <button
            type="button"
            className="btn-secondary"
            onClick={
              downloadTemplate
            }
          >
            Download Template
          </button>
        </div>

        <div>
          <label className="block mb-2">
            Select Excel File
          </label>

          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] ??
                  null
              )
            }
          />
        </div>

        {file && (
          <div className="bg-slate-50 p-4 rounded-lg">
            <p>
              <strong>
                File:
              </strong>{" "}
              {file.name}
            </p>

            <p>
              <strong>
                Size:
              </strong>{" "}
              {(
                file.size /
                1024
              ).toFixed(2)}
              KB
            </p>
          </div>
        )}

        <button
          type="button"
          className="btn-primary"
          disabled={
            !file ||
            uploadMutation.isPending
          }
          onClick={() =>
            uploadMutation.mutate()
          }
        >
          {uploadMutation.isPending
            ? "Uploading..."
            : "Upload Members"}
        </button>
      </div>
    </>
  );
}