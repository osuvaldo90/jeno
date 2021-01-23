import * as Knex from 'knex'

const knexfile: { [env: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
}

export default knexfile
