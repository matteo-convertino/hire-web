import { useForm, zodResolver } from "@mantine/form";
import AuthService from "@/services/AuthService";
import { SignUpGuestRequestDTO, signUpGuestSchema } from "@/dto/request/SignUpGuestRequestDTO";
import useHireApi from "@/hooks/useHireApi";

export default function useSignUpGuestForm() {
  const authService = AuthService.getInstance();
  const hireApi = useHireApi();
  // const { setGuestUser } = useAuthStore();

  const form = useForm<SignUpGuestRequestDTO>({
    validate: zodResolver(signUpGuestSchema),
    initialValues: {
      email: "",
      name: "",
      surname: ""
    }
  });

  const onSubmit = ({ data, onComplete }: {
    data: SignUpGuestRequestDTO,
    onComplete?: (() => void),
  }) => {
    hireApi({
      api: () => authService.signUpGuest(data),
      onComplete: onComplete
    });
  };

  return { form, onSubmit };
}
