<template>
  <div>
      <div class="row " style="margin-top: 50px;background:#fff;">
          <div class="large-12 columns container">
               <div class="col-md-4 col-md-offset-4" >
                 <h1>Login</h1>
               </div>
               <hr />
          </div>
      </div>

      <div class="main" >
          <div class="container tim-container" style="padding-bottom: 150px;">

      <div class="row bootstrap snippet" >
                <div class="col-md-4 col-md-offset-4">
                  <div class="box">
                    <div class="content registerBox" >
                      <div class="form">
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
                        <form method="post" html="{:multipart=&gt;true}" data-remote="true" action="" accept-charset="UTF-8">
                          <input id="email" v-model="credentials.username" class="form-control" type="text" placeholder="Email" name="email" @keyup.enter="submit">
                            <input v-model="credentials.password" id="password" class="form-control" type="password" placeholder="Password" name="password" @keyup.enter="submit">
                            <input class="btn btn-default btn-register" @click.prevent="submit" type="submit" value="login" v-disabled="running" name="commit">
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
import auth from 'auth'

export default {
  data(){
      return {
        credentials: {
          username: '',
          password: ''
        },
        errors: {},
        running: false,
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
          password: this.credentials.password
        }
        // We need to pass the component's this context
        // to properly make use of http in the auth service
        auth.login(this, credentials)
      }
  }
};
</script>

<style>

</style>
