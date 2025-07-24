import { SimpleGrid } from "@mantine/core";
import ReportCard from "@/features/reports/components/ReportCard";
import { ReportsGroupByInterview } from "@/features/reports/utils/aggregateReports";

export const ReportsGrid = ({ reports = {} }: {
  reports: ReportsGroupByInterview
}) => {
  return (
    <SimpleGrid cols={4}>
      {
        Object.entries(reports)
          .map(([interviewId, value]) =>
            <ReportCard key={interviewId} interviewId={interviewId} value={value} />
          )
      }
    </SimpleGrid>
  );
};
