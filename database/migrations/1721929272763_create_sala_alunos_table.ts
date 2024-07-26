import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sala_alunos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('aluno_id').unsigned().references('alunos.id').notNullable().onDelete('CASCADE')
      table.integer('sala_id').unsigned().references('salas.id').notNullable().onDelete('CASCADE')


      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}