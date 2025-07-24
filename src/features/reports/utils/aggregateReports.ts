import { ReportResponseDTO } from "@/dto/response/ReportResponseDTO";

export type ReportsGroupByInterview = {
  [interviewId: number]: {
    userId: number;
    skills: {
      [skillDescription: string]: number;
    };
  };
};

export default function aggregateReports(data: ReportResponseDTO[]) {
  return data.reduce((acc, { interview, skill, value }) => {
    const { id, userId } = interview;
    acc[id] ??= { userId, skills: {} };
    acc[id].skills[skill.description] = value;
    return acc;
  }, {} as ReportsGroupByInterview);
}

