const BASE = `${process.env.NEXT_PUBLIC_API_URL}/job-positions`;

export const JobPositionRoutes = {
  SAVE: BASE,
  FIND_ALL: BASE,
  FIND_ALL_BY_USER: `${BASE}/user`,
  FIND_BY_ID: (id: number) => `${BASE}/${id}`,
  UPDATE: (id: number) => `${BASE}/${id}`,
  DELETE: (id: number) => `${BASE}/${id}`
};
