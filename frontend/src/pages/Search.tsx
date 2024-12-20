import { Combobox } from "@/components/Combobox.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { useCustomSearchParams } from "@/hooks/useSearchParams.ts";
import { useGoTo } from "@/router/useGoTo.ts";
import { useAuthState } from "@/store/authenticationState.ts";
import {FC, useEffect} from "react";

export const Search: FC = () => {
  const { getSearchMode } = useCustomSearchParams();
  const { goToReportPage, goToSearchPage } = useGoTo();
  const { setSchoolSelection } = useAuthState();


  const handleOrganisationSelection = (value: string) => {
    if (value !== "") {
      setSchoolSelection(value);
    }
  };

  useEffect(() => {

  }, [getSearchMode]);

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8 bg-blue-50 py-4 rounded-lg">
        Thank you for speaking up
      </h1>
      <div className="space-y-6">
        <ToggleGroup
          className="grid grid-cols-2 gap-2"
          type="single"
          value={getSearchMode()}
          onValueChange={() => setSchoolSelection(null)}
        >
          <ToggleGroupItem
            className="data-[state=on]:bg-gray-100 data-[state=on]:border-gray-300"
            onClick={goToSearchPage.bind(this, "school")}
            value="school"
          >
            My primary/secondary school 🏫
          </ToggleGroupItem>
          <ToggleGroupItem
            className="data-[state=on]:bg-gray-100 data-[state=on]:border-gray-300"
            onClick={goToSearchPage.bind(this, "organisation")}
            value="organisation"
          >
            My organisation 🏢
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="space-y-2">
          {getSearchMode() === "school" ? (
            <div className="contents">
              <p className="text-sm text-blue-600">
                School
              </p>
              <Combobox
                onSelect={handleOrganisationSelection}
                options={[
                  {
                    label: "Test school - Don’t be afraid to use FaceUp",
                    value: "test",
                  },
                ]}
              />
            </div>
          ) : (
            <div className="contents">
              <p className="text-sm text-blue-600">
                Organisation
              </p>
              <Combobox
                onSelect={handleOrganisationSelection}
                options={[]}
              />
            </div>
          )}
        </div>

        <Button
          className="w-full bg-blue-500 hover:bg-blue-600"
          onClick={goToReportPage}
        >
          Continue
        </Button>

        <button className="w-full text-blue-500 hover:text-blue-600 text-sm">
          Scan QR Code
        </button>
      </div>
    </main>
  );
};
