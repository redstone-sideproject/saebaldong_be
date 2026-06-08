import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { ChangelogTypeUnion } from '../types/changelog'

@Entity('changelog')
export class ChangelogEntity {
  @PrimaryGeneratedColumn()
  changelogId: number

  @Column('enum', { enum: ['ADD', 'FIX'], nullable: false })
  type: ChangelogTypeUnion

  @Column('text', { nullable: false })
  description: string

  @Column({ nullable: false })
  date: Date

  @CreateDateColumn({ nullable: false })
  createdAt: Date

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date
}
