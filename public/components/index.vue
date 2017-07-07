<template>
  <div>

      <div class="main">
          <div class="container tim-container">


              <section id="demos">

            <div class="row " >
              <div class="large-12 columns">
                <h1>From Naijapolls</h1>
                <hr />
              </div>
            </div>

            <div class="panel-body">

            <ul class="list-group list-group-dividered list-group-full">

             <div class="col-sm-12">
             <div v-show="data.naijapolls==undefined"><ring-loader ></ring-loader></div>
              <div class="item card-box col-sm-4" v-for="perspective in data.naijapolls">

                     <!-- start card -->
                  <div class="card"  >    
                      <router-link v-bind:to="{name:'perspectives',params:{id:perspective.id}}">
                      <div class="content" >
                                     
                      <li class="list-group-item">
                          <div class="media">
                              <div class="media-body">
                                  <a href="#">
                                      <img class="avatar border-white pull-left"  src="../assets/logo1.png" alt="">
                                  </a>
                                  <small> 
                                      {{perspective.user_name}}
                                  </small>
                                  <br/>
                                  <small>
                                    <a class="name">was created {{perspective.created_at | moment("calendar")}}</a>
                                  </small>
                                  <br/>
                                  <small>
                                    <a class="name">was last updated</a>
                                  </small>
                              </div>
                              <p class="media-text">
                                  {{perspective.text}}
                              </p>
                          </div>
                      </li>

                      <center>
                        <img :src="perspective.slug" class="img-thumbnail">
                      </center>
                      <ul class="rate-ul">
                        <li class="home">***
                          <img class="" :src="`../assets/`+perspective.highest_vote+`.png`" alt="">
                          <span> {{perspective.highest_vote_count}} </span>
                          ***
                        </li>
                      </ul>
                      </div>        
                      </router-link>
                  </div> 
                  <!-- end card -->
              </div>
            </div>
              </ul>


            </div>

          </section>   

              <section id="demos">

            <div class="row " >
              <div class="large-12 columns">
                <h1>Popular</h1>
                <hr />
              </div>
            </div>

            <div class="panel-body">

            <ul class="list-group list-group-dividered list-group-full">

             <div class="col-sm-12">
             <div v-show="data.top==undefined"><ring-loader ></ring-loader></div>
              <div class="item card-box col-sm-4" v-for="perspective in data.top">

                     <!-- start card -->
                  <div class="card"  >    
                      <router-link v-bind:to="{name:'perspectives',params:{id:perspective.id}}">
                      <div class="content" >
                                     
                      <li class="list-group-item">
                          <div class="media">
                              <div class="media-body">
                                  <a href="#">
                                      <img class="avatar border-white pull-left"  src="../assets/logo1.png" alt="">
                                  </a>
                                  <small> 
                                      {{perspective.user_name}}
                                  </small>
                                  <br/>
                                  <small>
                                    <a class="name">was created {{perspective.created_at | moment("calendar")}}</a>
                                  </small>
                                  <br/>
                                  <small>
                                    <a class="name">was last updated </a>
                                  </small>
                              </div>
                              <p class="media-text">
                                  {{perspective.text}}
                              </p>
                          </div>
                      </li>

                      <center>
                        <img :src="perspective.slug" class="img-thumbnail">
                      </center>
                      <ul class="rate-ul">
                        <li class="home">***
                          <img class="" :src="`../assets/`+perspective.highest_vote+`.png`" alt="">
                          <span> {{perspective.highest_vote_count}} </span>
                          ***
                        </li>
                      </ul>
                      </div>        
                      </router-link>
                  </div> 
                  <!-- end card -->
              </div>
            </div>
              </ul>


            </div>

          </section>   


         <section id="demos">

            <div class="row " >
              <div class="large-12 columns">
                <h1>Recent</h1>
                <hr />
              </div>
            </div>

            <div class="panel-body">

                  <ul class="list-group list-group-dividered list-group-full">

             <div class="col-sm-12">
             <div v-show="data.newest==undefined"><ring-loader ></ring-loader></div>
              <div class="item card-box col-sm-4" v-for="perspective in data.newest">

                     <!-- start card -->
                  <div class="card"  >    
                      <router-link v-bind:to="{name:'perspectives',params:{id:perspective.id}}">
                      <div class="content" >
                                     
                      <li class="list-group-item">
                          <div class="media">
                              <div class="media-body">
                                  <a href="javascript:void(0)" > 
                                      <img class="avatar border-white pull-left"  src="../assets/logo1.png" alt="">
                                  </a>
                                  <small> 
                                      {{perspective.user_name}}
                                  </small>
                                  <br/>
                                  <small>
                                    <a class="name">{{perspective.created_at | moment("calendar")}}</a>
                                  </small>
                                  <br/>
                                  <small>
                                    <a class="name">last vote</a>
                                  </small>
                              </div>
                              <p class="media-text">
                                  {{perspective.text}}
                              </p>
                          </div>
                      </li>

                      <center>
                        <img :src="perspective.slug" class="img-thumbnail">
                      </center>
                      <ul class="rate-ul">
                        <li class="home">***
                          <img class="" :src="`../assets/`+perspective.highest_vote+`.png`" alt="">
                          <span> {{perspective.highest_vote_count}} </span>
                          ***
                        </li>
                      </ul>
                      </div>        
                      </router-link>
                  </div> 
                  <!-- end card -->
              </div>
              </div>
              </ul>
              </div>

          </section>   


         
          </div>
      </div>
  </div>

</template>

<script>

import ringLoader from './BounceLoader.vue'
import auth from 'auth'


export default{
  data(){
    return{
      imgUrl : '',
      data:{},
      user: false
    }
  },
  components:{
  ringLoader
  },
  created(){
    auth.checkAuth()
    this.user  = auth.user.authenticated;
    var _this = this
    this.$http
          .get('http://localhost:3000/api/v1/perspectives/special/all')
          .then( (response) => {
            console.log(response.data)
            _this.data = response.data
          },(err) => console.log(err))
  },
  methods:{
    setImgUrl(url){
      this.imgUrl = url
    },
  }
};
</script>

<style>

</style>
