import { NestFactory } from '@nestjs/core'
import { AppModule } from '@src/app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import type { Request, Response } from 'express'

async function createNestApp() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: true,
    credentials: true,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser())

  return app
}

// 로컬/일반 서버 실행 (Vercel 서버리스 환경이 아닐 때만 포트 바인딩)
async function bootstrap() {
  const app = await createNestApp()
  await app.listen(process.env.PORT ?? 8000)
}

// Vercel 서버리스 핸들러 (warm 인스턴스 간 재사용을 위해 캐싱)
let cachedServer: ((req: Request, res: Response) => void) | null = null

export default async function handler(req: Request, res: Response) {
  if (!cachedServer) {
    const app = await createNestApp()
    await app.init()
    cachedServer = app.getHttpAdapter().getInstance()
  }

  return cachedServer!(req, res)
}

if (!process.env.VERCEL) {
  void bootstrap()
}
