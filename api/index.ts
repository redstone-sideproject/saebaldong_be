import 'module-alias/register'

import type { VercelRequest, VercelResponse } from '@vercel/node'
import express from 'express'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

import { AppModule } from '@src/app.module'

const server = express()
const adapter = new ExpressAdapter(server)

let inited = false
let initPromise: Promise<void> | null = null

async function bootstrap() {
  const app = await NestFactory.create(AppModule, adapter)

  app.enableCors({ origin: true, credentials: true })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser())

  await app.init()
  inited = true
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!inited) {
    initPromise ??= bootstrap()
    await initPromise
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return server(req, res)
}
