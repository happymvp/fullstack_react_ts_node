import { setErrorToast } from "@/hooks/use-toast.tsx";

export const API = async (
  path: string,
  method: "DELETE" | "GET" | "POST" | "PUT",
  body?: any,
  headers?: Record<string, string>,
) =>
  fetch(`${import.meta.env.VITE_BASE_API}${path}`, {
    body: body,
    headers: {
      ...headers,
    },
    method,
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data: unknown) => {
      return {
        data: data,
        status: "ok",
      };
    })
    .catch((e: unknown) => {
      setErrorToast((e as Record<string, string>).message);
      return {
        data: null,
        status: "error",
      };
    });
