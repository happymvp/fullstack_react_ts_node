import { setErrorToast } from "@/hooks/use-toast.tsx";

export const GET_FILE_API = async (
  path: string,
  body?: any,
  headers?: Record<string, string>,
) =>
  await fetch(`${import.meta.env.VITE_FILE_API}${path}`, {
    body: body,
    headers: {
      ...headers,
    },
    method: "GET",
  })
    .then(async (response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.blob();
    })
    .then((fileBlob: Blob) => fileBlob)
    .catch((e: unknown) => {
      setErrorToast((e as Record<string, string>).message);
    });
