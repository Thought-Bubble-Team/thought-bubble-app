import Screen from "@/components/atoms/Screen";
import BugReport from "@/components/macro/BugReport";
import { Navigation } from "@/components/macro/Navigation";

const BugReportPage = () => {
  return (
    <Screen justifyContent="flex-start">
      <Navigation title="Bug Report" />
      <BugReport />
    </Screen>
  );
};

export default BugReportPage;
