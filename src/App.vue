<template>
  <div id="app">
    <div class="mask" v-show="loginShow"></div>
    <head-nav @clickLogin="showLogin" :logined = logined></head-nav>
    <keep-alive >
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    <div class="login-register" v-show="loginShow">
      <login-register @login="login" @close="close"></login-register>
    </div>
   <player-controls/>
  </div>
</template>
<script>
import playerControls from "./components/common/Playercontrols";

import headNav from "./components/common/HeadNav"
import loginRegister from "./components/common/Login"
export default{
  name:"app",
  data(){
    return {
      loginShow:false,
      logined:false
    }
  },
  components:{
    playerControls,
    headNav,
    loginRegister
  },
  methods:{
    showLogin(){
      this.loginShow = true;
    },
    login(){
      this.loginShow = false;
      this.logined = true;
    },
    close(){
      this.loginShow = false;
    }
  }
}
</script>
<style lang="less">
#app{
 display: flex;
 flex-direction: column;
  width: 100%;
  height: 100%;
 
}
.mask{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.8);
  z-index: 100;
}
.login-register{
  width: 400px;
  height: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 102;
}

</style>
