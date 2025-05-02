import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { HireJwtPayload } from "@/utils/hireJwtPayload";

export default class HireCookieService {
  private static ACCESS_TOKEN_COOKIE = "access-token";
  private static ACCESS_TOKEN_GUEST_COOKIE = "access-token-guest";

  public static async getAccessToken(isGuest: boolean = false): Promise<string | undefined> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(isGuest ?
      HireCookieService.ACCESS_TOKEN_GUEST_COOKIE :
      HireCookieService.ACCESS_TOKEN_COOKIE
    );

    if (cookie === undefined) return;

    return cookie.value;
  };

  public static async isLogged(): Promise<boolean> {
    return await HireCookieService.getAccessToken() !== undefined;
  }

  public static getIdFromAccessToken(isGuest: boolean = false): Promise<number | null> {
    return this.getFieldFromAccessToken("id", isGuest);
  }

  public static getNameFromAccessToken(): Promise<string | null> {
    return this.getFieldFromAccessToken("name");
  }

  public static getSurnameFromAccessToken(): Promise<string | null> {
    return this.getFieldFromAccessToken("surname");
  }

  private static async getFieldFromAccessToken<K extends keyof HireJwtPayload>(
    field: K,
    isGuest: boolean = false
  ): Promise<HireJwtPayload[K] | null> {
    const accessToken = await HireCookieService.getAccessToken(isGuest);
    if (!accessToken) return null;

    try {
      const decoded = jwtDecode<HireJwtPayload>(accessToken);
      return decoded[field] ?? null;
    } catch {
      return null;
    }
  }
}
