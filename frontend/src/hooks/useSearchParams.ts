import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type SearchMode = "organisation" | "school";

export const useCustomSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search Mode
  const getSearchMode = (): SearchMode => {
    const mode = searchParams.get("mode");
    if (mode !== "school" && mode !== "organisation") {
      return "school";
    }
    return mode;
  };

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode !== "school" && mode !== "organisation") {
      setSearchParams((params) => {
        params.set("mode", "school");
        return params;
      });
    }
  }, []);

  return {
    getSearchMode,
  };
};
