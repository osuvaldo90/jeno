import Knex from 'knex'

interface CreateTableBuilder extends Omit<Knex.CreateTableBuilder, 'foreign'> {
  foreign(columnName: string, foreignKeyName?: string): ForeignConstraintBuilder
  foreign(columns: readonly string[], foreignKeyName?: string): MultikeyForeignConstraintBuilder
}

interface SchemaBuilder extends Omit<Knex.SchemaBuilder, 'createTable'> {
  createTable(
    tableName: string,
    callback: (tableBuilder: CreateTableBuilder) => unknown,
  ): SchemaBuilder
  createTable(
    tableName: string,
    callback: (tableBuilder: CreateTableBuilder) => unknown,
  ): SchemaBuilder
}

type ReferencingColumnBuilder = Knex.ReferencingColumnBuilder

export type Relationship = 'one-to-one' | 'one-to-many' | 'many-to-many'
interface ForeignConstraintBuilder extends Omit<Knex.ForeignConstraintBuilder, 'references'> {
  references(columnName: string, relationship: Relationship): ReferencingColumnBuilder
}

type MultikeyForeignConstraintBuilder = Knex.MultikeyForeignConstraintBuilder

interface Jeno extends Omit<Knex, 'schema'> {
  schema: SchemaBuilder
}

const Jeno = (config: Knex.Config | string): Jeno => {
  const jeno = Knex(config) as Jeno

  const ogCreateTable = jeno.schema.createTable
  jeno.schema.createTable = (
    tableName: string,
    callback: (tableBuilder: CreateTableBuilder) => unknown,
  ): SchemaBuilder => {
    return ogCreateTable.call(jeno, tableName, callback)
  }

  return jeno
}

export default Jeno
