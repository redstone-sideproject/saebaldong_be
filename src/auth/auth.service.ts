import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService, TokenExpiredError } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'

import { ConfigService } from '@nestjs/config'
import { UserService } from '../user/user.service'
import { LoginDto } from './dtos/login.dto'
import { JwtPayload, TokenData } from './types/token-data.type'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<TokenData> {
    const user = await this.validateUser(loginDto)

    const accessToken = await this.generateAccessToken(user)
    const refreshToken = await this.generateRefreshToken(user)

    await this.setUserRefreshToken(user.id, refreshToken)

    return { accessToken, refreshToken }
  }

  async logout(id: number): Promise<void> {
    await this.userService.removeRefreshToken(id)
  }

  async validateUser(loginDto: LoginDto) {
    const { userId, password } = loginDto

    const user = await this.userService.findByUserId(userId)

    if (!user) throw new UnauthorizedException()

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) throw new UnauthorizedException()

    return user
  }

  async refresh(refeshToken: string): Promise<TokenData> {
    let payload: JwtPayload
    try {
      payload = await this.jwtService.verifyAsync(refeshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      })
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh token expired')
      }
      throw new UnauthorizedException('Invalid refresh token')
    }

    const isValid = await this.userService.validateRefreshToken(
      payload.sub,
      refeshToken,
    )
    if (!isValid) throw new UnauthorizedException('Invalid refresh token')

    const accessToken = await this.generateAccessToken({
      id: payload.sub,
      userId: payload.userId,
    })
    const refreshToken = await this.generateRefreshToken({
      id: payload.sub,
      userId: payload.userId,
    })

    await this.setUserRefreshToken(payload.sub, refreshToken)

    return { accessToken, refreshToken }
  }

  async generateAccessToken(user: { id: number; userId: string }) {
    const payload = { sub: user.id, userId: user.userId }

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXP'),
    })

    return accessToken
  }

  async generateRefreshToken(user: { id: number; userId: string }) {
    const payload = { sub: user.id, userId: user.userId }

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXP'),
    })

    return refreshToken
  }

  async setUserRefreshToken(id: number, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)

    await this.userService.updateRefreshToken(id, hashedRefreshToken)
  }
}
