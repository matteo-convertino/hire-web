const BASE = `${process.env.NEXT_PUBLIC_API_URL}/reports`;

export const ReportRoutes = {
  FIND_BY_ID: (id: string) => `${BASE}/${id}`,
  FIND_BY_INTERVIEW_ID: (interviewId: string) => `${BASE}/interview/${interviewId}`,
  FIND_BY_USER: `${BASE}/user`
};
