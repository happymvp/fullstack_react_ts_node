import { Report } from "@/api/types.ts";
import { API } from "@/api/utils/API.ts";

export const getReports = async (): Promise<[] | Report[]> => {
  const { data, status } = await API("/report", "GET");
  return status === "ok" ? (data as Report[]) : [];
};
