const BASE = `${process.env.NEXT_PUBLIC_API_URL}/skills`;

export const SkillRoutes = {
  SAVE: BASE,
  FIND_BY_ID: (id: number) => `${BASE}/${id}`,
  FIND_BY_JOB_POSITION_ID: (jobPositionId: number) => `${BASE}/job-position/${jobPositionId}`,
  UPDATE: (id: number) => `${BASE}/${id}`,
  DELETE: (id: number) => `${BASE}/${id}`
};
