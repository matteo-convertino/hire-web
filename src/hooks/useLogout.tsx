import { useAuth } from "@/hooks/useAuth";
import AuthService from "@/services/AuthService";
import useHireApiWithNotification from "@/hooks/useHireApiWithNotification";

export default function useLogout() {
  const { setUser } = useAuth();
  const authService = AuthService.getInstance();
  const hireApiWithNotification = useHireApiWithNotification();

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

