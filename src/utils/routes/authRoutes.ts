const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/auth`;
const WEB_BASE = `${process.env.NEXT_PUBLIC_API_URL}/web/auth`;

export const AuthRoutes = {
  REGISTER: `${WEB_BASE}/sign-up`,
  REGISTER_GUEST: `${WEB_BASE}/sign-up-guest`,
  LOGIN: `${WEB_BASE}/sign-in`,
  LOGOUT: `${WEB_BASE}/sign-out`,
  USER: `${API_BASE}/user`
};
