import { Injectable, UnauthorizedException } from '@nestjs/common'

import { UserEntity } from './entities/user.entity'

import * as bcrypt from 'bcryptjs'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findByUserId(userId: string) {
    return this.userRepo.findOne({ where: { userId } })
  }

  async create(userId: string, passwordHash: string, isAdmin = false) {
    const user = this.userRepo.create({
      userId,
      password: passwordHash,
      isAdmin,
    })
    return this.userRepo.save(user)
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    await this.userRepo.update(id, { refreshToken })
  }

  async removeRefreshToken(id: number) {
    await this.userRepo.update(id, { refreshToken: null })
  }

  async validateRefreshToken(
    id: number,
    refreshToken: string,
  ): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { id } })

    if (!user?.refreshToken) return false

    return await bcrypt.compare(refreshToken, user.refreshToken)
  }
}
