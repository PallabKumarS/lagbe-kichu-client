import RequestManagement from "@/components/modules/management/RequestManagement";
import { getPersonalRequests } from "@/services/RequestService";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dashboard | Requests",
  description: "This is Requests Page of the dashboard used by tenant only",
};

const RequestsPage = async () => {
  const requests = await getPersonalRequests({ limit: 12 });

  return (
    <div>
      <RequestManagement requests={requests?.data} meta={requests?.meta} />
    </div>
  );
};

export default RequestsPage;
