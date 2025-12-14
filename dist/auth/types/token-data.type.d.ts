interface TokenData {
    accessToken: string;
    refreshToken: string;
}
interface JwtPayload {
    sub: number;
    userId: string;
    iat: number;
    exp: number;
}
export type { TokenData, JwtPayload };
