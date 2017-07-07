'use strict'

const Lucid = use('Lucid')

class Perspective extends Lucid {

	user(){
		return this.belongsTo('App/Model/User')
	}

	voters(){
		return this.hasMany('App/Model/Voter')
	}

	static get rules () { 
	    return {
	    text: 'required',
        }
  	}
}

module.exports = Perspective
