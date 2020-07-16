<template>
<div class="fix-nav">
    <div class="head">
    <div class="music-ico">
      <i class="iconfont iconyinle1"></i>
    </div>
    <router-link to="/" tag="h1" class="logo">悦听</router-link>
    <div class="search">
      <input type="text" placeholder="请输入要搜索的音乐" @keyup.enter="getlistRes" v-model="inputValue"/>
      <i class="iconfont iconsousuo search-ico"></i>
    </div>
    <ul class="head-aside-right">
      <li class="login" @click="loginClick">
        <i class="iconfont icontouxiang"></i>
        <span>{{logined?"已登录":"未登录"}}</span>
      </li>
      <router-link class="home" to="/" exact tag="li">
        <i class="iconfont iconshouye"></i>
        <span>悦听主页</span>
      </router-link>
      <router-link class="player" to="/player" tag="li">
        <i class="iconfont iconyinle4"></i>
        <span>悦听player</span>
      </router-link>
    </ul>
  </div>
</div>
 
 
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: "headNav",
  data() {
    return {
        inputValue:""
    };
  },
  computed:{
      ...mapGetters(["searchlist"])
  },
  methods:{
      ...mapMutations(["setSearchlist"]),
      ...mapActions(["getSearchlist"]),
      getlistRes(){
          this.getSearchlist(this.inputValue)
      },
       loginClick(){
    this.$emit("clickLogin")
  
  }
  },
  props:{
    logined:{
      type:Boolean,
      default:false
    }
  }
 
};
</script>
<style lang="less" scoped>
.fix-nav{
    // position: absolute;
    flex-shrink: 0;
    left: 0;
    top: 0;
    height: 50px;
    width: 100%;
    z-index: 100;
    min-width: 750px;
}
.head {
  display: flex;
  align-items: center;
    box-sizing: border-box;
    width: 100%;
  height: 50px;
  background-color: #c62f2f;
  padding: 0 10px;

  .music-ico {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    margin: 0 10px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    background-color: #fff;
    font-size: 16px;
    color: #c62f2f;
  }
  .logo {
      flex-shrink: 0;
    width: 70px;
    height: 0px;
    overflow: hidden;
    padding-top: 25px;
    text-align: center;
    background-image: url('~@/assets/images/player_title.png');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .search {
    position: relative;
    flex-shrink: 0;

    width: 250px;
    height: 30px;
    margin: 20px;
    input {
      position: absolute;
      border: 0;
      padding: 0 30px 0 10px;
      color: rgba(255, 255, 255, 0.7);
      border-radius: 15px;
      box-sizing: border-box;
      width: 250px;
      height: 30px;
      line-height: 25px;
      background-color: rgba(255, 255, 255, 0.5);
      // background-color: rgba(49, 34, 34, 0.4)
    }
    .search-ico {
      font-size: 18px;
      line-height: 18px;
      padding: 0 5px;
      color: #f1f1f1;
      position: absolute;
      right: 0;
      top: 6px;
    }
  }
  .head-aside-right {
      flex: 1;
     
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right:20px ;
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    & > li {
        flex-shrink: 0;
      padding: 0 10px;
      cursor: pointer;
      &:hover{
          color: rgba(255, 255, 255, 0.9);
      }
    }
    li > i {
      font-size: 16px;
      padding: 0 5px;
    }
    .login {
      flex-shrink: 0;
     
      i {
        font-size: 16px;
        padding: 5px;
      }
      span {
        font-size: 14px;
    
      }
    }
    .player{
        display: flex;
        
        align-items: center;
        i{
            
            // padding-top: 5px;
            font-size: 25px;
            
        }
       
    }
  }
}
</style>