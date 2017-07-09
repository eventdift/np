'use strict'

const User = use('App/Model/User')
const Hash = use('Hash')
const Validator = use('Validator')
const Mail = use('Mail')

class UsersController {

	*store(request,response){
		const userData = request.all()
	    const validation = yield Validator.validate(userData, User.rules)  

	    if (validation.fails()) { 
	      response.json(validation) 
	      return 
	    }
	    const safePassword = yield Hash.make(request.input('password'))
		const user = yield User.create({
			nickname: request.input('nickname'),
  			email: request.input('email'),
  			password: safePassword
		})
		yield Mail.send('emails.welcome', user, (message) => {
	      message.to(user.email, user.nickname)
	      message.from('naija@naijapolls.ng')
	      message.subject('Welcome to naijapolls')
	    })
	    const email = request.input('email')
	    const safePassword = yield Hash.make(request.input('password'))
	    const token = yield request.auth.attempt(email, request.input('password')) 

	    if (token) {
	    	const user = yield User.query().where('email',email).fetch()
		    return response.json({'token':token,'login':user})
	    }
	}

	*login(request,response){
		const userData = request.all()
	    const validation = yield Validator.validate(userData, {
	      	email: 'required|email',        
        	password: 'required'
	    }) 

	    if (validation.fails()) { 
	      response.json(validation) 
	      return 
	    }
		const email = request.input('email')
	    const safePassword = yield Hash.make(request.input('password'))
	    const token = yield request.auth.attempt(email, request.input('password')) 

	    if (token) {
	    	const user = yield User.query().where('email',email).fetch()
		    return response.json({'token':token,'login':user})
	    }

	    response.unauthorized('Invalid credentails')
	}

	*logout(request,response){
		const user = request.authUser
		const isLoggedIn = yield request.auth.check()
		if (isLoggedIn) {
			yield request.auth.revoke(user)
			return yield request.auth.logout()	  
		}
	}

	*send_reset(request,response){
		const user = yield User.query.where('email',request.input('email')).fetch();
		if(!user){
			return {message : 'email does not exist'}
		}
		const token = yield request.auth.generate(user)
		yield Mail.send('emails.reset', {user:user,token:token}, (message) => {
	      message.to(user.email, user.nickname)
	      message.from('naija@naijapolls.ng')
	      message.subject('reset password at naijapolls')
	    })

	    response.json({message : 'a reset password link has been sent to the registered mail'});
	}

	*confirm_token(request,response){
		
	}
}

module.exports = UsersController
