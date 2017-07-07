'use strict'

const Lucid = use('Lucid')

class Voter extends Lucid {

	choice(){
		return this.belongsTo('App/Model/Choice')
	}

	perspective(){
		return this.belongsTo('App/Model/Perspective')
	}

	user(){
		return this.belongsTo('App/Model/User')
	}
}

module.exports = Voter
