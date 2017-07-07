'use strict'

const Schema = use('Schema')

class VotersTableSchema extends Schema {

  up () {
    this.create('voters', (table) => {
      table.increments()
      table.integer('perspective_id')
      table.integer('choice_id')
      table.integer('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('voters')
  }

}

module.exports = VotersTableSchema
