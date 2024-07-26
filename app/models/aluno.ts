import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Sala from './sala.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Aluno extends BaseModel {
    public static table = 'alunos'
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare nome: string

    @column()
    declare email: string

    @column()
    declare matricula: string

    @column()
    declare data_de_nascimento: string
    
    @column({ serializeAs: null })
    declare password: string

    @manyToMany(() => Sala, {
        pivotTable: 'sala_alunos',
        pivotForeignKey: 'aluno_id',
        pivotRelatedForeignKey: 'sala_id',
    }) 
    declare salas: ManyToMany<typeof Sala>
    
    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}