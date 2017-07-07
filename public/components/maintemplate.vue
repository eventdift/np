<template>
<div>
	<div id="navbar-full">
      <div class="container">
        <nav class="navbar navbar-inverse navbar-transparent navbar-fixed-top" role="navigation"style="background-color:#2196F3;">
          
          <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="http://solomobile.5gbfree.com/index.html">
                     <div class="logo-container">
                        <router-link to="/">
                        <div class="logo">
                            <img src="/assets/logo1.png">
                        </div>
                        <div class="brand">
                            Naija Polls
                        </div>
                        </router-link>
                    </div>
                </a>
            </div>
        
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav navbar-right">
                  <li ><router-link to="/">Home</router-link></li>
                   <li ><router-link to="/perspectives/shared_perspective/all">general</router-link></li>
                      <li v-show="user.authenticated"><router-link to="/perspectives">my opinions</router-link></li>
                      <li v-show="!user.authenticated"><router-link to="/login">Login</router-link></li>
                      <li v-show="!user.authenticated"><router-link to="/register">Register</router-link></li>
                      <li v-show="user.authenticated"><a href="" @click.prevent="logout">logout</a></li>
                      <li ><router-link to="/share" class="btn btn-round btn-default " style="border-color: #fff;color: black;   background-color: #fff;"> Share opinion </router-link></li>
               </ul>
              
            </div><!-- /.navbar-collapse -->
          </div><!-- /.container-fluid -->
        </nav>
    </div><!--  end container-->
    
    <div class="blurred-container" v-show="$route.path==='/'">
        <div class="motto" style="margin-top:-20px;" >
            <div class="motto-top">Naija</div>
            <div class="motto-border" >
            <div class="border no-right-border">Po</div>
            <div class="border">lls</div>
            </div>
            <br>
            <h4>whats your Opinion?</h4>
        </div>
        <div class="img-src" style="background-image: url('/assets/back.png')"></div>
    </div>

</div>     
    
  <div style="background:#fff;">
	<!-- Routes rendered here -->
    <transition name="fade">
  	   <router-view></router-view>
    </transition>
  </div>

<div class="parallax-pro">

    <div class="container">
        <div class="space-30"></div>
        <div class="row">
             <div class="col-md-12 text-center">
                <div class="credits">
                    © 2017<a href=""> Naija Polls </a><i class="fa fa-heart heart" alt="love"></i>
                </div>
            </div>
        </div>
    </div>

</div>
</div>    
</template>


<script>
import auth from 'auth'

export default {
  data(){
    return{
      imgUrl : '',
      user: auth.user,
    }
  },
  created(){
    auth.checkAuth()
    this.user  = auth.user;
    this.$io.channel('chat').connect();
  },
  methods: {
    logout(){
      var _this = this
      auth.logout(_this)
    }
  }
};
</script>
 <style>
 .fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
 </style>