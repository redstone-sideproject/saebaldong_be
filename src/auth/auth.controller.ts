import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  UseGuards,
  UnauthorizedException,
  Get,
} from '@nestjs/common'
import { AuthService } from './auth.service'

import { LoginDto } from './dtos/login.dto'
import { Response, Request } from 'express'

import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { ConfigService } from '@nestjs/config'
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokenData = await this.authService.login(loginDto)
    const isProd = process.env.NODE_ENV === 'production'

    res.cookie('accessToken', tokenData.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: isProd ? 'strict' : 'none',
      maxAge: this.configService.get('JWT_ACCESS_TOKEN_EXP'),
    })

    res.cookie('refreshToken', tokenData.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: isProd ? 'strict' : 'none',
      maxAge: this.configService.get('JWT_REFRESH_TOKEN_EXP'),
    })

    return { message: 'login success' }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  authMe(@Req() req: Request) {
    const user = req.user.userId

    return { success: true, userId: user }
  }

  @Post('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const isProd = process.env.NODE_ENV === 'production'
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) throw new UnauthorizedException()

    const tokenData = await this.authService.refresh(refreshToken)

    res.cookie('accessToken', tokenData.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: isProd ? 'strict' : 'none',
      maxAge: this.configService.get('JWT_ACCESS_TOKEN_EXP'),
    })

    res.cookie('refreshToken', tokenData.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: isProd ? 'strict' : 'none',
      maxAge: this.configService.get('JWT_REFRESH_TOKEN_EXP'),
    })

    return { message: 'refreshed' }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const id = req.user.sub
    const isProd = process.env.NODE_ENV === 'production'
    await this.authService.logout(id)

    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: isProd ? 'strict' : 'none',
      path: '/',
    })
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: isProd ? 'strict' : 'none',
      path: '/',
    })

    return { message: 'logout success' }
  }
}
