import { deleteReportById } from "@/api/deleteReportById.ts";
import { getReportById } from "@/api/getReportById.ts";
import { ReportFormData } from "@/api/types.ts";
import { updateReportById } from "@/api/updateReportById.ts";
import { BasicReportPopup } from "@/components/ReportPopup/BasicReportPopup.tsx";
import { FC, useEffect, useState } from "react";

interface UpdateReport {
  id: number;
  onClose: () => void;
  onSubmit: () => Promise<void>;
}

export const UpdateReport: FC<UpdateReport> = ({ id, onClose, onSubmit }) => {
  const [data, setData] = useState<ReportFormData | null>();

  useEffect(() => {
    async function getData() {
      const report = await getReportById(id);
      if (report) {
        setData({
          age: report.age,
          file: null,
          name: report.name,
        });
      }
    }
    void getData();
  }, []);

  const handleSubmit = async (data: ReportFormData) => {
    const isSuccesfulyUpdated = await updateReportById(id, data);
    if (isSuccesfulyUpdated) {
      await onSubmit();
      setData(null);
    }
  };

  const handleDelete = async () => {
    const isSuccesfulyDeleted = await deleteReportById(id);
    if (isSuccesfulyDeleted) {
      await onSubmit();
      setData(null);
    }
  };

  return (
    <>
      {data && (
        <BasicReportPopup
          data={data}
          isForceOpen
          onClose={onClose}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
          title="View report"
        />
      )}
    </>
  );
};
