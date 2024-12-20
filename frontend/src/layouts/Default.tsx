import { UiHeader } from "@/components/Header.tsx";
import { Shield } from "lucide-react";
import { FC } from "react";
import { Outlet } from "react-router-dom";

export const DefaultLayout: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <UiHeader />
      <Outlet />

      <div className="flex items-start gap-2 p-4 bg-green-50 rounded-lg text-sm text-green-700">
        <Shield className="h-5 w-5 mt-0.5" />
        <div>
          All communication is anonymous and encrypted.{" "}
          <a
            className="underline hover:text-green-900"
            href="https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md"
          >
            Learn more about anonymity
          </a>
        </div>
      </div>
    </div>
  );
};
