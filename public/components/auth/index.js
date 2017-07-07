//resource/auth/index.js


// URL and endpoint constants
const API_URL = 'http://localhost:3001/api/v1'
const LOGIN_URL = API_URL + 'login/'
const SIGNUP_URL = API_URL + 'user/'
const LOGOUT_URL = API_URL + 'logout/'

module.exports= {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login(context, creds) {
    context.$http.post(LOGIN_URL, creds, (data) => {
      localStorage.setItem('id_token', data.login)
      localStorage.setItem('access_token', data.token)

      this.user.authenticated = true
        redirect('/my_perspectives')
    }).error((err) => {
      context.error = err
    })
  },

  signup(context, creds) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('id_token', data.login)
      localStorage.setItem('access_token', data.token)

      this.user.authenticated = true
      redirect('/my_perspectives')
    }).error((err) => {
      context.error = err
    })
  },

  // To log out, we just need to remove the token
  logout() {    
    context.$http.post(SIGNUP_URL, creds, (data) => {
        localStorage.removeItem('id_token')
        localStorage.removeItem('access_token')
        this.user.authenticated = false
    })
  },
  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}