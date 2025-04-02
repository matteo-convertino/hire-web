const BASE = `${process.env.NEXT_PUBLIC_API_URL}/reports`;

export const ReportRoutes = {
  FIND_BY_ID: (id: number) => `${BASE}/${id}`,
  FIND_BY_INTERVIEW_ID: (interviewId: number) => `${BASE}/interview/${interviewId}`,
  FIND_ALL_BY_USER: `${BASE}/user`
};
