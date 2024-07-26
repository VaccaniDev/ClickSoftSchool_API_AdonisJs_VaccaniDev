import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'salas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('user_id').unsigned().references('users.id').notNullable().onDelete('CASCADE')
      table.string("numero_da_sala").notNullable().unique()
      table.integer("capacidade").notNullable()
      table.boolean("disponibilidade").notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}