import { isEmail, useForm } from "@mantine/form";
import { useAuth } from "@/hooks/useAuth";
import AuthService from "@/services/AuthService";
import useHireApiWithNotification from "@/hooks/useHireApiWithNotification";
import {useRouter} from "next/navigation";

export default function useSignInForm() {
  const authService = AuthService.getInstance();
  const hireApiWithNotification = useHireApiWithNotification();
  const router = useRouter();
  const {setUser} = useAuth();

  const form = useForm({
    initialValues: {
      email: "",
      password: ""
    },

    validate: {
      email: isEmail("Invalid email")
    }
  });

  const onSubmit = (data: { [x: string]: string; }) => {
    hireApiWithNotification({
      api: () => authService.signIn({ email: data.email, password: data.password }),
      titleOnSuccess: 'Logged In',
      messageOnSuccess: "Login completed with success",
      titleOnLoading: 'Login in progress',
      messageOnLoading: 'Wait while we check your credentials',
      messageOnGenericError: "There was an error while trying to login in",
      onComplete: () => {
        form.reset();
        setUser(undefined);
        router.push("/dashboard");
      },
    });
  };


  return { form, onSubmit };
}

