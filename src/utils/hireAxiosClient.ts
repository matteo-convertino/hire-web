import axios from "axios";
import HireCookieService from "@/services/utils/HireCookieService";

const hireAxiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 30000
});

// If it is a server-side call, it moves the JWT from the (client's) cookies to the Authorization field of the header
if(typeof window === 'undefined') {
  hireAxiosClient.interceptors.request.use(async (config) => {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access-token")?.value;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  }, (error) => {
    return Promise.reject(error);
  });
}

export default hireAxiosClient;
