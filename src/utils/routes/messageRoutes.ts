const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/messages`;

export const MessageRoutes = {
  FIND_ALL_BY_INTERVIEW_ID: (interviewId: number) => `${API_BASE}/interview/${interviewId}`,
};
