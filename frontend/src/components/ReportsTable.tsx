import { getReportFileByName } from "@/api/getReportFile.ts";
import { UpdateReport } from "@/components/ReportPopup/UpdateReport.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { useReportsState } from "@/store/reportsState.ts";
import { FC, useState } from "react";
import { usePopupManager } from "react-popup-manager";

export const ReportsTable: FC = () => {
  const { fetchReports, reports } = useReportsState();
  const popupManager = usePopupManager();
  const [isLoading, setIsLoading] = useState(false);

  const handleViewClick = (id: number) => {
    setIsLoading(true);
    popupManager.open(UpdateReport, {
      id: id,
      onClose: () => {
        setIsLoading(false);
      },
      onSubmit: async () => {
        await fetchReports().then(() => {
          setIsLoading(false);
          return null;
        });
      },
    });
  };

  const handleViewFile = (file: string) => {
    void getReportFileByName(file).then((url) => window.open(url));
  };

  return (
    <Table>
      <TableCaption>List of reports</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>File</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell className="font-medium">{report.name}</TableCell>
            <TableCell>{report.age}</TableCell>
            <TableCell>
              {report.file && (
                <Button
                  disabled={isLoading}
                  onClick={handleViewFile.bind(this, report.file)}
                >
                  View file
                </Button>
              )}
            </TableCell>
            <TableCell className="text-right">
              <Button
                disabled={isLoading}
                onClick={() => {
                  handleViewClick(report.id);
                }}
              >
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
