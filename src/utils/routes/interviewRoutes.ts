const BASE = `${process.env.NEXT_PUBLIC_API_URL}/interviews`;

export const InterviewRoutes = {
  SAVE: BASE,
  FIND_ALL_BY_USER: `${BASE}/user`,
  FIND_BY_ID: (id: number) => `${BASE}/${id}`,
  FIND_BY_JOB_POSITION_ID: (jobPositionId: number) => `${BASE}/job-position/${jobPositionId}`,
};
