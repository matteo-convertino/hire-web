import AuthService from "@/services/AuthService";
import useHireApi from "@/hooks/useHireApi";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";

export default function useLogout() {
  const { setUser } = useAuthStore();
  const authService = AuthService.getInstance();
  const hireApiWithNotification = useHireApi();

  const logout = () => {
    hireApiWithNotification({
      api: () => authService.logout(),
      titleOnSuccess: "Logged Out",
      messageOnSuccess: "Logout completed with success",
      titleOnLoading: "Logout in progress",
      messageOnLoading: "Wait while we invalidate your credentials",
      messageOnGenericError: "There was an error while trying to logout",
      onComplete: () => setUser(undefined)
    });
  };

  return { logout };
}

