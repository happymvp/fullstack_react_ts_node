import { getReports } from "@/api/getAllReports.ts";
import { Report } from "@/api/types.ts";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ReportsState {
  fetchReports: () => Promise<void>;
  reports: [] | Report[];
}

export const useReportsState = create<ReportsState>()(
  immer((set) => ({
    fetchReports: async () => {
      const reports = await getReports();
      set({ reports: reports });
    },
    reports: [],
  })),
);
