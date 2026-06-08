import type { Request, Response } from 'express'

// nest build 결과물(dist/main)을 그대로 서버리스 핸들러로 노출한다.
// dist는 vercel.json 의 buildCommand(npm run build) 단계에서 생성된다.
import handler from '../dist/main'

export default function (req: Request, res: Response) {
  return handler(req, res)
}
