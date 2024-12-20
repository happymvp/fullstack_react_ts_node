import { useNavigate } from "react-router-dom";

export const useGoTo = () => {
  const navigate = useNavigate();

  const goToSearchPage = (mode: "organisation" | "school") => {
    // eslint-disable-next-line sonarjs/void-use
    void navigate(`/?mode=${mode}`);
  };

  const goToReportPage = () => {
    // eslint-disable-next-line sonarjs/void-use
    void navigate(`/report`);
  };

  return {
    goToReportPage,
    goToSearchPage,
  };
};
