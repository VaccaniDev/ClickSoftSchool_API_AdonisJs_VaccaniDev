import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'alunos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('nome', 50).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('matricula', 50).notNullable().unique()
      table.string('data_de_nascimento', 10).notNullable()
      table.string('password').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}