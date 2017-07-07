<template>
  <div>
      
      <div class="row " style="margin-top:40px;background:#fff;">
          <div class="large-12 columns container">
              <div class="col-md-4 col-md-offset-4">
                <h1>Sign Up</h1>
              </div>
             <hr />
          </div>
      </div>
      <div class="main" >
          <div class="container tim-container" style="padding-bottom: 100px;">

      <div class="row bootstrap snippet">
                <div class="col-md-4 col-md-offset-4">
                <div v-if="errors">
                  <div class="alert alert-danger" v-show="errors.errors" >
                      <p class=""  v-for="error in errors.errors">
                        {{ error.message }}
                       </p>
                  </div>
                  <div class="alert alert-danger" v-show="errors.error" >
                      <p class="" v-if="errors.error" >
                         {{ errors.error.message }}
                       </p>
                  </div>
                  </div>
                  <div class="box">
                    <div class="content registerBox" >
                      <div class="form">
                        <form method="post" html="{:multipart=&gt;true}" data-remote="true" action="" accept-charset="UTF-8">
                          <input id="email" v-model="credentials.username" class="form-control" type="text" placeholder="Email" name="email"  @keyup.enter="submit">
                            <input id="text" v-model="credentials.nickname" class="form-control" type="text" placeholder="Nickname" name="nickname"  @keyup.enter="submit">
                            <vue-password v-model="credentials.password" placeholder="password" classes="input form-control" :user-inputs="[credentials.email]"  @keyup.enter="submit">
                            </vue-password>
                            <input class="btn btn-default btn-register" @click.prevent="submit" type="submit" value="Create account" name="commit" v:disabled="running">
                        </form>
                      </div>
                    </div>
                  </div>

        </div>
      </div>
      <!--    end  news container        -->

        </div>
  </div>
  </div>
</template>

<script>
import MySplash from './emptySplash.vue'
import VuePassword from 'vue-password'
import VueRouter from 'vue-router'
import auth from 'auth'


export default {
  components: {
    MySplash,VuePassword
  },
  data() {
      return {
        credentials: {
          username: '',
          password: '',
          nickname: ''
        },
        running:false,
        errors: {},
        user: false
      }
  },
  created(){
    auth.checkAuth()
    this.user  = auth.user.authenticated;
    if(this.user){
      this.$router.push({ path: 'perspectives/shared_perspective/all' })
    }
  },
  methods:{
    submit() {
        this.running = true
        this.errors = {}
        var credentials = {
          email: this.credentials.username,
          password: this.credentials.password,
          nickname: this.credentials.nickname
        }
        // We need to pass the component's this context
        // to properly make use of http in the auth service
        auth.signup(this, credentials)
      }
  }
};
</script>

<style>

</style>
