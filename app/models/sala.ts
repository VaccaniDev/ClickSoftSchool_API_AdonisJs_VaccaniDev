import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Aluno from './aluno.js'

export default class Sala extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare numero_da_sala: string
  
  @column()
  declare capacidade: number
  
  @column()
  declare disponibilidade: boolean

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Aluno, {
    pivotTable: 'sala_alunos',
    pivotForeignKey: 'sala_id',
    pivotRelatedForeignKey: 'aluno_id',
  })
  declare alunos: ManyToMany<typeof Aluno>
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

}