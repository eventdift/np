'use strict'

const Schema = use('Schema')

class ChoicesTableSchema extends Schema {

  up () {
    this.create('choices', (table) => {
      table.increments()
      table.string('text')
      table.string('slug')
      table.timestamps()
    })
  }

  down () {
    this.drop('choices')
  }

}

module.exports = ChoicesTableSchema
