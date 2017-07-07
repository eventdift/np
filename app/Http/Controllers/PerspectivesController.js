'use strict'

const Perspective = use('App/Model/Perspective')
const Validator = use('Validator')
const Choice = use('App/Model/Choice')
const Voter = use('App/Model/Voter')
const User = use('App/Model/User')
const Database = use('Database')

class PerspectivesController {

	*store(request,response){
		const user = request.authUser
		const persData = request.all()
	    const validation = yield Validator.validate(persData, Perspective.rules)  

	    if (validation.fails()) { 
	      response.json(validation) 
	      return 
	    }
		const perspective = yield Perspective.create({
			text: request.input('text'),
			slug: request.input('slug'),
			user_id: user.id,
			user_name: user.nickname
		})
		response.json(perspective.toJSON())
	}

	*find_by_perspective(request,response){
		console.log(request.param('id'))
		const user = request.authUser
		const perspective = yield Perspective.find(request.param('id'))
		const perspective_json = yield this.fix_perspective(user,perspective)
		response.json(perspective_json)

	}

	*index(request,response){
		const perspectives_all = yield Database.table('perspectives').orderBy('id','desc')
		const perspectives_json = []
		const user = request.authUser
		for (var perspective of perspectives_all) {
			perspectives_json.push(yield this.fix_perspective(user,perspective))
		}
			response.json(perspectives_json)
	}

	*search(request,response){
		const term = request.input('term')
		const perspectives_all = yield Database.select('*').from('perspectives')
		.whereRaw('user_name LIKE :term OR text LIKE :term',{term:'%'+term+'%'}).orderBy('id','desc').limit(50)
		const perspectives_json = []
		const user = request.authUser
		for (var perspective of perspectives_all) {
			perspectives_json.push(yield this.fix_perspective(user,perspective))
		}
			response.json(perspectives_json)
	}
	*searc(request,response){
		const term = request.input('term')
		const perspectives_all = yield Database.select('*').from('perspectives')
		.whereRaw('user_name LIKE :term OR text LIKE :term',{term:'%'+term+'%'}).orderBy('id','desc').limit(50)
		const perspectives_json = []
		const user = request.authUser
		for (var perspective of perspectives_all) {
			perspectives_json.push(yield this.fix_perspective(user,perspective))
		}
			response.json(perspectives_json)
	}


	*spec(request,response){
		const perspectives_all = yield Database.table('perspectives').orderBy('id','desc')
		const perspectives_json = []
		const user = request.authUser
		for (var perspective of perspectives_all) {
			perspectives_json.push(yield this.fix_perspective(user,perspective))
		}
		response.json(perspectives_json)
	}

	

	*vote(request,response){
		const user = request.authUser
		const vote = yield Voter.create({
			perspective_id: request.input('id'),
			choice_id: request.input('choice'),
			user_id: user.id
		})
		response.json(vote)
	}

	*choicess(){
		const choices = yield Choice.all();
		return choices
	}
	*voterss(id){
		const perspective = yield Perspective.find(id)
		const voters = yield perspective.voters().fetch();
		return voters
	}
	*userss(id){
		const user = yield User.find(id)
		return user
	}

	*fix_perspective (user,perspective){
		
		const perspective_json = perspective
		perspective_json.A=0;perspective_json.B=0;perspective_json.C=0;perspective_json.D=0;perspective_json.E=0;
		perspective_json.user_voted = false;
		perspective_json.choice = '';
		perspective_json.highest_vote = '';
		perspective_json.highest_vote_count = 0;
		const choices = yield this.choicess();
		for(var choice of choices){
			const voters = yield this.voterss(perspective.id)
			for(var voter of voters){
				const use = yield this.userss(voter.user_id)
				console.log(user)
				if(user!=undefined){
					if(use.id=== user.id){
						perspective_json.user_voted = true;
						perspective_json.choice = voter.choice_id;
					}
				}else{

				}
				if(voter.choice_id == choice.text){
					switch(voter.choice_id){
					case('A'):
						perspective_json.A ++;
						if(perspective_json.A > perspective_json.highest_vote_count){
							perspective_json.highest_vote='A'
							perspective_json.highest_vote_count = perspective_json.A
						}
						break;
					case('B'):
						perspective_json.B ++;
						if(perspective_json.B > perspective_json.highest_vote_count){
							perspective_json.highest_vote='B'
							perspective_json.highest_vote_count = perspective_json.B
						}
						break;
					case('C'):
						perspective_json.C ++;
						if(perspective_json.C > perspective_json.highest_vote_count){
							perspective_json.highest_vote='C'
							perspective_json.highest_vote_count = perspective_json.C
						}
						break;
					case('D'):
						perspective_json.D ++;
						if(perspective_json.D > perspective_json.highest_vote_count){
							perspective_json.highest_vote='D'
							perspective_json.highest_vote_count = perspective_json.D
						}
						break;
					case('E'):
						perspective_json.E ++;
						if(perspective_json.E > perspective_json.highest_vote_count){
							perspective_json.highest_vote='E'
							perspective_json.highest_vote_count = perspective_json.E
						}
						break;
					default:
						break;
				}
			}
				
			}
		}
	return perspective_json;
	}

	* special(request,response){
		const user = request.authUser
		const voters = yield Database.select('*').from('voters').groupBy('perspective_id').count().orderBy('Count(*)').limit(3)
		const top= []
		const naijapolls = yield Perspective.query().where('user_id',3).limit(3)
		const naijapolls_json = []
		for( var voter of voters){
			console.log(voter)
			const result = yield Perspective.query().where('id', voter.perspective_id).first()
			top.push(result)
		}
		const newest = yield Database.table('perspectives').orderBy('id','desc').limit(3)
		const top_json = []
		const newest_json = []
		for (var perspective of top) {
			top_json.push(yield this.fix_perspective(user,perspective))
		}
		for (var perspective of naijapolls) {
			naijapolls_json.push(yield this.fix_perspective(user,perspective))
		}
		for (var perspective of newest) {
			newest_json.push(yield this.fix_perspective(user,perspective))
		}
		response.json({newest:newest_json,top:top_json,naijapolls:naijapolls_json})
		
	}

	*me(request,response){
		const use = request.authUser
		if(use===undefined){
			response.json({})
		}
		const perspectives = yield Perspective.query().where('user_id',use.id).orderBy('id','desc').limit(50)
		const perspectives_json = []
		for (var perspective of perspectives) {
			perspectives_json.push(yield this.fix_perspective(use,perspective))
		}
		response.json(perspectives_json)	
	}
}

module.exports = PerspectivesController


