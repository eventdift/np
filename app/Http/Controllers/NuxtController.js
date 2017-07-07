'use strict'

const View = use('View')

class NuxtController {  

  * render (request, response) {
      yield response.sendView('layout')
  }
}

module.exports = new NuxtController()
