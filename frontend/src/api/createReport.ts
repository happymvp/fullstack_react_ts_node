import { ReportFormData } from "@/api/types.ts";
import { API } from "@/api/utils/API.ts";

export const createReport = async (data: ReportFormData): Promise<boolean> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("age", data.age.toString());
  console.log(data.file)
  if (data.file && data.file.size > 0) formData.append("file", data.file);

  const { status } = await API("/report", "POST", formData);
  return status === "ok";
};
