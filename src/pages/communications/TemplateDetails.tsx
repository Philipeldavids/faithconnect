import {
  useParams,
} from "react-router-dom";

import {
  useQuery,
} from "@tanstack/react-query";

import PageHeader from "../../components/layouts/PageHeader";

import { templateService }
from "../../lib/api/templateService";

export default function TemplateDetails() {
  const { id } =
    useParams();

  const { data } =
    useQuery({
      queryKey: [
        "template",
        id,
      ],

      queryFn: () =>
        templateService.get(
          id!
        ),
    });

  const template =
    data?.data;

  return (
    <>
      <PageHeader
        title={
          template?.name ??
          "Template"
        }
      />

      <div className="card p-6 space-y-4">
        <div>
          <strong>
            Type:
          </strong>{" "}
          {template?.channel}
        </div>

        <div>
          <strong>
            Subject:
          </strong>{" "}
          {template?.subject}
        </div>

        <div>
          <strong>
            Body:
          </strong>

          <div className="mt-2 whitespace-pre-wrap">
            {template?.body}
          </div>
        </div>
      </div>
    </>
  );
}