import hireApiClient from "@/utils/hireApiClient";
import { AuthRoutes } from "@/utils/routes/authRoutes";
import { SignUpRequestDTO } from "@/dto/request/SignUpRequestDTO";
import { SignInRequestDTO } from "@/dto/request/SignInRequestDTO";
import { UserResponseDTO } from "@/dto/response/UserResponseDTO";
import { SignUpGuestRequestDTO } from "@/dto/request/SignUpGuestRequestDTO";

export default class AuthService {
  private static instance: AuthService;

  private constructor() {
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  public async signUp(signUpRequestDTO: SignUpRequestDTO): Promise<void> {
    return hireApiClient.post<void>(
      AuthRoutes.REGISTER,
      signUpRequestDTO
    ).then(res => res.data);
  }

  public async signUpGuest(signUpGuestRequestDTO: SignUpGuestRequestDTO): Promise<void> {
    return hireApiClient.post<void>(
      AuthRoutes.REGISTER_GUEST,
      signUpGuestRequestDTO
    ).then(res => res.data);
  }

  public async signIn(signInRequestDTO: SignInRequestDTO): Promise<void> {
    return hireApiClient.post<void>(
      AuthRoutes.LOGIN,
      signInRequestDTO
    ).then(res => res.data);
  }

  public async logout(): Promise<void> {
    return hireApiClient.get<void>(
      AuthRoutes.LOGOUT
    ).then(res => res.data);
  }

  public async getUser(): Promise<UserResponseDTO> {
    return hireApiClient.get<UserResponseDTO>(
      AuthRoutes.USER,
    ).then(res => res.data);
  }
}
