import { useQuery } from "@tanstack/react-query";

import PageHeader from "../../components/layouts/PageHeader";
import DataTable from "../../components/tables/DataTable";

import { communicationService }
from "../../lib/api/communicationService";

export default function CommunicationHistory() {
  const { data } =
    useQuery({
      queryKey: [
        "communication-history",
      ],

      queryFn: () =>
        communicationService.history(),
    });

  return (
    <>
      <PageHeader
        title="Communication History"
      />

      <DataTable
        data={data?.data ?? []}
        columns={[
          {
            header:
              "Recipient",

            accessor:
              "recipient",
          },

          {
            header:
              "Channel",

            accessor:
              "channel",
          },

          {
            header:
              "Status",

            accessor:
              "status",
          },

          {
            header:
              "Sent At",

            accessor:
              "sentAt",
          },
        ]}
      />
    </>
  );
}