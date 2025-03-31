const BASE = `${process.env.NEXT_PUBLIC_API_URL}/job-positions`;

export const JobPositionRoutes = {
  SAVE: BASE,
  FIND_ALL: BASE,
  FIND_ALL_BY_USER: `${BASE}/user`,
  FIND_BY_ID: (id: string) => `${BASE}/${id}`,
  UPDATE: (id: string) => `${BASE}/${id}`,
  DELETE: (id: string) => `${BASE}/${id}`
};
