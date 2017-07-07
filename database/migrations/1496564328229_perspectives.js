'use strict'

const Schema = use('Schema')
const Lucid = use('Lucid')

class PerspectivesTableSchema extends Lucid {

  up () {
    this.create('perspectives', (table) => {
      table.increments()
      table.string('text')
      table.integer('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('perspectives')
  }

}

module.exports = PerspectivesTableSchema
