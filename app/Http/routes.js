'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| authentication actions
| Route.post('/register','UsersController.register')
| Route.post('/login','UsersController.login')
| Route.get('/logout','UsersController.logout')
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.group('version1', function () {
	//pages
  Route.get('/perspectives/:id', 'PerspectivesController.find_by_perspective')

  Route.get('/perspectives', 'PerspectivesController.index')
  Route.get('/perspectives/special/all', 'PerspectivesController.special')
  Route.post('/perspectives/special/search', 'PerspectivesController.search')

  //register,login,logout
  Route.post('/user', 'UsersController.store')
  Route.post('/login', 'UsersController.login')

}).prefix('api/v1')


Route.group('version1-1', function () {
  //pages
  Route.get('/perspectives/special/me', 'PerspectivesController.me')
  Route.get('/perspectives/special/al', 'PerspectivesController.spec')
  Route.post('/perspectives/special/searc', 'PerspectivesController.searc')
  //register,login,logout
  Route.get('/logout', 'UsersController.logout')
  //actions
  Route.post('/store','PerspectivesController.store')
  Route.post('/vote','PerspectivesController.vote')
}).prefix('api/v1').middleware('auth:jwt')



Route.any('*', 'NuxtController.render')


