import { Toaster } from "@/components/ui/toaster.tsx";
import { router } from "@/router/router.tsx";

import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PopupProvider } from "react-popup-manager";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PopupProvider>
      <RouterProvider router={router} />
      <Toaster />
    </PopupProvider>
  </StrictMode>,
);
