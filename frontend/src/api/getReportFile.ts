import { GET_FILE_API } from "@/api/utils/GET_FILE_API.ts";

export const getReportFileByName = async (filePath: string): Promise<string> =>
  await GET_FILE_API(filePath).then((fileBlob) =>
    URL.createObjectURL(fileBlob as Blob),
  );
