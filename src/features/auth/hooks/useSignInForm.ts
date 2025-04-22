import { useForm, zodResolver } from "@mantine/form";
import AuthService from "@/services/AuthService";
import useHireApiWithNotification from "@/hooks/useHireApiWithNotification";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import { SignInRequestDTO, signInSchema } from "@/dto/request/SignInRequestDTO";

export default function useSignInForm() {
  const authService = AuthService.getInstance();
  const hireApiWithNotification = useHireApiWithNotification();
  const { setUser } = useAuthStore();

  const form = useForm<SignInRequestDTO>({
    mode: "uncontrolled",
    validate: zodResolver(signInSchema),
    initialValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data: SignInRequestDTO) => {
    hireApiWithNotification({
      api: () => authService.signIn(data),
      titleOnSuccess: "Logged In",
      messageOnSuccess: "Login completed with success",
      titleOnLoading: "Login in progress",
      messageOnLoading: "Wait while we check your credentials",
      messageOnGenericError: "There was an error while trying to login in",
      onComplete: () => {
        form.reset();
        setUser(undefined);
        window.location.href = "/dashboard";
      }
    });
  };

  return { form, onSubmit };
}

