<template>
  <div>
      <div class="main" style="margin-top: 40px;background:#fff;">
        <div class="container tim-container" style="padding-bottom: 100px;">

      <!--    start  news container        -->
      <div class="row bootstrap snippet">
          <div class="col-md-10 col-xs-12 col-md-offset-1">
              <div class="panel" id="daily-feed">

                  

      <div class="panel-body">
        <div >
          <div class="col-md-8 col-md-offset-2">
              <h3>Share perspective</h3>
              <hr/>
          </div>
          <div class="row bootstrap snippet">
                <div class="col-md-8 col-md-offset-2">
                  <div class="box">
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
                    <div class="content registerBox" >
                      <div class="form">
                        <form method="post" html="{:multipart=&gt;true}" data-remote="true" action="http://solomobile.5gbfree.com/register" accept-charset="UTF-8">
                            <div v-show="running"><ring-loader ></ring-loader></div>
                            <img class="avatar border-white pull-left" v-bind:src="perspective.slug" />
                            <input type="file" class="form-control" v-on:change="upload($event.target.files)" accept="image/*" />
                            <textarea v-model="perspective.text" class="form-control" placeholder="opinion"></textarea>
                            <input type="hidden" v-model="perspective.slug">
                            <input class="btn btn-default btn-large btn-register" v-disabled="running" @click.prevent="submit" type="submit" value="share" name="commit">
                        </form>
                      </div>
                    </div>
                  </div>

            </div>
          </div>
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

import ringLoader from './BounceLoader.vue'
import auth from 'auth'


export default {
  data(){
    return {
     clUrl:`https://api.cloudinary.com/v1_1/anchor-solutions/upload`,
     perspective:{
      text:'',
      slug:''
     },
     errors:{},
     running:false
    }
  },
  components:{
    ringLoader
  },
  created(){
    auth.checkAuth()
    this.user  = auth.user.authenticated;
    if(!this.user){
      this.$router.push({ path: 'login' })
    }
  },
methods: {
    upload(file) {
      this.running = true;
      var _this = this
      const formData = new FormData()
      formData.append('file', file[0])
      formData.append('upload_preset', 'sfngdcxl')
      
      axios.post(this.clUrl, formData).then(res => {
          var str = res.data.secure_url;
          var secure = str.replace("upload/", "upload/w_600/")
          _this.perspective.slug= secure
          _this.running = false
      })
    },
    submit(){
      this.errors = {}
      this.running = true;
      this.$http
          .post('http://localhost:3000/api/v1/store',this.perspective)
          .then((response)=>{
            console.log(response)
            this.errors = response.data
            this.running = false
          },(err) => {
            console.log(err)
            this.errors = err.data
            this.running =  false
          })
    }
  },
}

</script>

<style>

</style>
