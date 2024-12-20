import { DefaultLayout } from "@/layouts/Default.tsx";
import { ProtectedLayout } from "@/layouts/Protected.tsx";
import { Report } from "@/pages/Report.tsx";
import { Search } from "@/pages/Search.tsx";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <Search />,
        path: "",
      },
    ],
    element: <DefaultLayout />,
    path: "",
  },
  {
    children: [
      {
        element: <Report />,
        path: "",
      },
      {
        element: <Report />,
        path: "report/:id",
      },
    ],
    element: (
      <ProtectedLayout>
        <DefaultLayout />
      </ProtectedLayout>
    ),
    path: "report",
  },
]);
