import { API } from "@/api/utils/API.ts";

export const deleteReportById = async (id: number): Promise<boolean> => {
  const { status } = await API(`/report/${id.toString()}`, "DELETE");

  return status === "ok";
};
