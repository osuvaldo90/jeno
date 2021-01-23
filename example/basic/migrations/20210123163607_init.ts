import Jeno from 'jeno'

export async function up(jeno: Jeno): Promise<void> {
  jeno.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('email').notNullable()
  })

  jeno.schema.createTable('user_profiles', (table) => {
    table.increments('id')
    table.foreign('user_id').references('users.id', 'one-to-one')
    table.string('username').notNullable()
  })

  jeno.schema.createTable('posts', (table) => {
    table.increments('id')
    table.foreign('user_id').references('users.id', 'one-to-many')
  })

  jeno.schema.createTable('friends', (table) => {
    table.foreign('user_id_1').references('users.id', 'many-to-many')
    table.foreign('user-id-2').references('users.id', 'many-to-many')
  })
}

export async function down(jeno: Jeno): Promise<void> {
  jeno.schema.dropTableIfExists('posts')
  jeno.schema.dropTableIfExists('user_profiles')
  jeno.schema.dropTableIfExists('users')
}
