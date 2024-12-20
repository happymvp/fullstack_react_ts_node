import { Report } from "@/api/types.ts";
import { API } from "@/api/utils/API.ts";

export const getReportById = async (id: number): Promise<null | Report> => {
  const { data, status } = await API(`/report/${id.toString()}`, "GET");

  return status === "ok" ? (data as Report) : null;
};
