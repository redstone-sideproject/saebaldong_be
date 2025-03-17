import { NestFactory } from '@nestjs/core'
import { AppModule } from '@src/app.module'
import { ValidationPipe, BadRequestException } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: ['http://localhost:3000', 'https://saebaldong.kr'],
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // exceptionFactory: (errors) => {
      //   // 첫 번째 오류 메시지만 반환
      //   const firstError = Object.values(errors[0].constraints || {})[0]
      //   return new BadRequestException(firstError)
      // },
    }),
  )

  await app.listen(process.env.PORT ?? 8000)
}
bootstrap()
