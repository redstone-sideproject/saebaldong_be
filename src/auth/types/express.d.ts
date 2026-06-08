import { JwtPayload } from './token-data.type'
declare module 'express' {
  interface Request {
    user: JwtPayload
    cookies: {
      refreshToken: string
      accessToken: string
    }
  }
}
