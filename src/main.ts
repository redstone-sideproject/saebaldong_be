import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import type { Request, Response } from 'express'

async function createNestApp() {
  // 동적 import: AppModule 로드 단계(네이티브 모듈 require 등)의 에러까지 try로 잡기 위함
  const { AppModule } = await import('@src/app.module')
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
  try {
    if (!cachedServer) {
      const app = await createNestApp()
      await app.init()
      cachedServer = app.getHttpAdapter().getInstance()
    }

    return cachedServer!(req, res)
  } catch (err) {
    // ⚠️ 임시 디버그: 실제 크래시 원인을 응답 본문으로 노출 (원인 파악 후 제거)
    console.error('BOOTSTRAP_ERROR', err)
    res.statusCode = 500
    res.setHeader('content-type', 'text/plain; charset=utf-8')
    res.end(
      'BOOTSTRAP_ERROR\n' +
        (err instanceof Error ? `${err.message}\n\n${err.stack}` : String(err)),
    )
  }
}

if (!process.env.VERCEL) {
  void bootstrap()
}
