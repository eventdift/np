<template>
  <div>
      <chat chat_sho="chat"></chat>
      <div class="main" style="margin-top: 50px;background:#fff;">
          <div class="container tim-container" style="padding-bottom: 200px;">
              <!--    start  news container        -->
              <div class="row bootstrap snippet">
              <div class="col-md-10 col-xs-12 col-md-offset-1">
              <div class="panel" id="daily-feed">
               <ul class="list-group list-group-dividered list-group-full">


              <div class="item card-box">

                     <!-- start card -->
                  <div class="card" style="padding-bottom: 0px;" >    
                      
                      <div class="content">
                      <li class="list-group-item">
                          <div class="media" style="margin-top: -20px;">
                                 <input v-model="term" @keyup.enter="search" class="form-control" placeholder="search nickname  or opinions">
                                <a href="" @click.prevent="search" class="btn btn-round btn-default pull-right join" style="margin-top: -60px;border: 0px;">Search</a>
                          </div>
                      </li> 
                      </div>        
                  </div> 
                  <!-- end card -->
                  </div>
                  </ul>
              <div class="alert alert-danger" v-show="perspectives[0]===undefined" >
                          <p class=""  >
                            No opinions found
                          </p>
              </div>           
              <div v-show="perspectives[0]===undefined"><ring-loader ></ring-loader></div>
              <div class="panel-body" v-for="perspective in perspectives">

              <ul class="list-group list-group-dividered list-group-full">


              <div class="item card-box">

                     <!-- start card -->
                  <div class="card" >    
                      
                      <div class="content">
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
                                    <a class="name">created{{perspective.created_at | moment("calendar")}}</a>
                                  </small>
                                  <br/>
                                  <small>
                                    <a class="name">last vote </a>
                                  </small>
                              </div>
                              <div v-show="!user" >
                                <router-link class="btn btn-round btn-default pull-right join" to="/login">Join discussion</router-link>
                              </div>
                              <p class="media-text">
                                  {{perspective.text}}
                              </p>
                          </div>
                      </li>             
                      <center>
                        <img :src="perspective.slug" class="img-thumbnail">
                        <img :src="imgUrl" v-show="imgUrl" id="hover" class="img-thumbnail">
                      </center>
                      <ul class="rate-ul" v-disabled="perspective.user_voted">
                        <li @click="vote(perspective.id,perspective,'A')" @mouseover="setImgUrl('../assets/a1.png')" @mouseout="setImgUrl('')" disabled="perspective.user_voted || !user" v-bind:class="[{choice:perspective.choice=='A'},{leading:perspective.highest_vote=='A'}]">
                          <img class=""  src="../assets/A.png" alt="">
                          <span>{{perspective.A }} </span>
                        </li>
                        <li @click="vote(perspective.id,perspective,'B')" @mouseover="setImgUrl('../assets/b1.png')" @mouseout="setImgUrl('')" disabled="perspective.user_voted || !user" v-bind:class="[{choice:perspective.choice=='B'},{leading:perspective.highest_vote=='B'}]">
                          <img class=""  src="../assets/B.png" alt="">
                          <span>{{perspective.B}}</span>
                        </li>
                        <li  @click="vote(perspective.id,perspective,'C')"  @mouseover="setImgUrl('../assets/c1.png')" @mouseout="setImgUrl('')" disabled="perspective.user_voted|| !user" v-bind:class="[{choice:perspective.choice=='C'},{leading:perspective.highest_vote=='C'}]">
                          <img class=""  src="../assets/C.png" alt="">
                          <span>{{perspective.C}}</span>
                        </li >
                        <li @click="vote(perspective.id,perspective,'D')" @mouseover="setImgUrl('../assets/d1.png')" @mouseout="setImgUrl('')" disabled="perspective.user_voted || !user" v-bind:class="[{choice:perspective.choice=='D'},{leading:perspective.highest_vote=='D'}]">
                          <img class=""  src="../assets/D.png" alt="">
                          <span>{{perspective.D}}</span>
                        </li>
                        <li @click="vote(perspective.id,perspective,'E')"  @mouseover="setImgUrl('../assets/e1.png')" @mouseout="setImgUrl('')" disabled="perspective.user_voted || !user " v-bind:class="[{choice:perspective.choice=='E'},{leading:perspective.highest_vote=='E'}]">
                          <img class=""  src="../assets/E.png" alt="">
                          <span>{{perspective.E}}</span>
                        </li>
                      </ul>
                      </div>        
                  </div> 
                  <!-- end card -->
                  </div>
                  </ul>
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
import chat from './chat.vue'
import VueRouter from 'vue-router'
import auth from 'auth'
import ringLoader from './BounceLoader.vue'


export default{
  data(){
    return{
      term:'',
      url:`http://localhost:3000/api/v1/perspectives/special/me`,
      url_search: `http://localhost:3000/api/v1/perspectives/special/searc`,
      chat:false,
      imgUrl : '',
      perspectiv: {
        id: 0,
        choice:''
      },
      user: false,
      perspectives:[]
    }
  },
  components: {
    MySplash,chat,ringLoader
  },
  created(){
        auth.checkAuth()
        this.user  = auth.user.authenticated;
        if(!this.user){
          context.$router.push({ path: 'login' })
        }

      var _this = this
      this.$root.$http
          .get(this.url)
          .then( (response) => {
            console.log(response.data)
            _this.perspectives=response.data
          },
          (err) => console.log(err))
  },
  methods:{
    setImgUrl(url){
      this.imgUrl = url
    },
    joinChat(){
      this.chat=true
    },
    search(){
      this.perspectives = []
      var _this = this
      if(this.term!==''){
        this.$root.$http
          .post(this.url_search,{term:_this.term})
          .then( (response) => {
            console.log(response.data)
            _this.perspectives=response.data
          },
          (err) => console.log(err))
      }
    },
    vote(id,perspective,choice){
      if(!perspective.user_voted && this.user){
      this.perspectiv.id = id;
      this.perspectiv.choice = choice
      perspective.user_voted = true
      perspective.choice = choice
      this.increment_vote(perspective,choice)
       this.$http
          .post('http://localhost:3000/api/v1/vote',this.perspectiv)
          .then((response)=>{
            console.log(response)
            perspective.highest_vote = response.data.highest_vote
          },(err) => console.log(err))

      }
    },
    increment_vote(perspective,choice){
      console.log(this.perspectives)
      switch(choice){
        case('A'):
          perspective.A ++
          break;
        case('B'):
          perspective.B ++
          break;
        case('C'):
          perspective.C ++
          break;
        case('D'):
          perspective.D ++
          break;
        case('E'):
          perspective.E ++
          break;
        default:
          break;
      }
    }  

  }
};
</script>
<style>
.leading {
  background-color: #000;
  color: white
}
.choice{
  background-color: #3e2121;
  color: white
}

</style>
