const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/messages`;
const WS_BASE = "/messages";

export const MessageRoutes = {
  FIND_ALL_BY_INTERVIEW_ID: (interviewId: string) => `${API_BASE}/interview/${interviewId}`,
  SAVE: (interviewId: string) => `${WS_BASE}/interview/${interviewId}`,
  SAVE_REPLIES: (interviewId: string) => `${process.env.NEXT_PUBLIC_API_URL}/queue/interviews/${interviewId}`
};
