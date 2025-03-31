const BASE = `${process.env.NEXT_PUBLIC_API_URL}/skills`;

export const SkillRoutes = {
  SAVE: BASE,
  FIND_BY_ID: (id: string) => `${BASE}/${id}`,
  FIND_BY_JOB_POSITION_ID: (jobPositionId: string) => `${BASE}/job-position/${jobPositionId}`,
  UPDATE: (id: string) => `${BASE}/${id}`,
  DELETE: (id: string) => `${BASE}/${id}`
};
