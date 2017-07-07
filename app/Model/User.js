'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

	profile () {
    	return this.hasOne('App/Model/Profile')
  	}

  	perspective(){
  		return this.hasMany('App/Model/Perspective')
  	}

  	apiTokens () {
    return this.hasMany('App/Model/Token')
    }

    static get rules () { 
	    return {
	      email: 'required|email|unique:users',
        nickname: 'required|unique:users',
        password: 'required'
	    }
  	}

  static get hidden () {
    return ['password']
  }

}

module.exports = User
