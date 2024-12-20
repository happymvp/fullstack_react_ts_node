import { createReport } from "@/api/createReport.ts";
import { ReportFormData } from "@/api/types.ts";
import { BasicReportPopup } from "@/components/ReportPopup/BasicReportPopup.tsx";
import { ReportsTable } from "@/components/ReportsTable.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useAuthState } from "@/store/authenticationState.ts";
import { useReportsState } from "@/store/reportsState.ts";
import { Plus, Search } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { usePopupManager } from "react-popup-manager";

export const Report: FC = () => {
  const { cleanSession } = useAuthState();
  const { fetchReports, reports } = useReportsState();
  const popupManager = usePopupManager();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    void fetchReports();
  }, []);

  const handleEndSession = () => {
    cleanSession();
  };

  const openCreationModelHandler = () => {
    const handleSubmit = async (data: ReportFormData) => {
      await createReport(data).then(async () => {
        await fetchReports();
      })

      setIsLoading(false);
    };

    popupManager.open(BasicReportPopup, {
      isForceOpen: true,
      onClose: () => {
        setIsLoading(false);
      },
      onSubmit: handleSubmit,
      title: "Create new report",
    });
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold">Test online trust box</h1>

      <p className="text-gray-900">
        This trust box is not real. However, you can use it to send a test
        report and see how it works.
      </p>

      <p className="text-gray-900">
        Anyone who is a witness or victim of bullying, inappropriate behaviour
        or has a problem they are ashamed to talk about personally can reach out
        through the FaceUp online trust box. The reports are anonymous, so
        students do not have to worry about the report being used against them.
      </p>

      <p className="text-gray-900">
        If you want to report a{" "}
        <span className="font-medium">real case of bullying</span>, look for
        your school and send the report to that school. In case of a
        life-threatening situation, call 112.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          className="flex-1 gap-2"
          disabled={isLoading}
          onClick={openCreationModelHandler}
          size="lg"
        >
          <Plus className="h-5 w-5" />
          Create test report
        </Button>
        <Button
          className="flex-1 gap-2"
          onClick={handleEndSession}
          size="lg"
          variant="secondary"
        >
          <Search className="h-5 w-5" />
          Back to searching for school
        </Button>
      </div>

      {/*Admin access check missing*/}
      <div className="mt-8">{reports.length > 0 && <ReportsTable />}</div>
    </main>
  );
};
