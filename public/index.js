import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ws from 'adonis-websocket-client'
import App from './components/maintemplate.vue'
import index from './components/index.vue'
import login from './components/login.vue'
import register from './components/register.vue'
import my from './components/my.vue'
import shared_perspective from './components/shared_perspectives.vue'
import _id from './components/_id.vue'
import new_perspective from './components/new.vue'
import VueDisabled from 'vue-disabled'
import vue_moment from 'vue-moment'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueDisabled)
Vue.use(vue_moment);

const wsVuePlugin = [
]

const url = 'http://localhost:3000'
wsVuePlugin.install= (Vue,data)=>{
    Vue.prototype.$io = data.ws(data.url);
}
Vue.use(wsVuePlugin,{ws:ws,url:url})
//join channel and room



Vue.http.interceptors.push(function(request,next){
  request.headers.set('X-CSRF-TOKEN', document.getElementById("csrf").value)
  var jwt = localStorage.getItem('id_token')
  if(jwt){
    request.headers.set('Authorization', `Bearer `+jwt)
  }
  next();
})

// export so we can use in components
var router = new VueRouter()
module.exports = router;

var router = new VueRouter({
  routes: [
    {path: '/' , component: index },
	{path: '/login', component: login },
	{path: '/register',	component: register	},
	{path: '/perspectives',component: my},
	{name: 'perspectives', path: '/perspectives/:id', component: _id },
	{path: '/perspectives/shared_perspective/all',component: shared_perspective	},
  {path: '/share', component:new_perspective }
  ]
})

// define routes

// fallback route

// expose the whole thing on element with 'app' as an id
new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
