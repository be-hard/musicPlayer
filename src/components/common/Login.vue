<template>
  <div class="login-comp">
    <div class="close" @click="close"><i class="iconfont icon-code"></i></div>
    <div class="return-login" @click="returnLogin" v-show="registerShow">返回登录</div>
    <div class="main">
      <div class="code"></div>
      <div class="phone">
        <i class="iconfont iconicon--"></i>
        <span>+86</span>
        <i class="iconfont iconxiala"></i>
        <input type="text"  placeholder="请输入手机号"  v-model="phoneNum"  maxlength="11"/>
        
      </div>
      
      <div class="key">
        <i class="iconfont iconmima"></i>
        <input type="password" :placeholder="keyPlaceholder" maxlength="10" v-model="keyNum"/>
   
      </div>
  
      <div class="login-mode" >
        <div class="square" v-show="!registerShow">
          <i class="iconfont iconicon"></i>
        </div>
        <span v-show="!registerShow">自动登录</span>
        <div class="phone-tip" >{{error}}</div>
      </div>
      <div class="btns">
<button class="login-btn" @click="volidate">登录</button>
<button class="register-btn" @click="register" v-show="registerShow">注册</button>
      </div>
      
      <div class="register" @click="goRegister" v-show="!registerShow">注册</div>
      <div class="other-mode-tip">其他登录方式</div>
      <div class="other-login-mode">
        <div class="wechat"></div>
        <div class="QQ"></div>
        <div class="weibo"></div>
      </div>
    
    </div>
      <div class="success" v-show="success"><i class="iconfont icondui"></i>登录成功</div>
  </div>
</template>
<script>
export default {
  name: "loginRegister",
  data(){
    return {
      phoneNum:"",
      keyNum:"",
      showPhoneTip:false,
      error:"",
      success:false,
      registerShow:false,
      keyPlaceholder:"请输入密码"
    }
  },
  methods:{
    inputVolidate(){
let reg = /^1[345678]\d{9}$/;
      if(!this.phoneNum){
        this.error = "请输入手机号"
        return false;
      }
      if(!this.phoneNum.match(reg)){
        this.error = "请输入正确的手机号"
        return false;
      }
      if(!this.keyNum){
        this.error = "请输入密码"
        return false;
      }
      return true;
    },
    volidate(){
      
      if(this.inputVolidate()){
 this.error = "";
      this.success = true;
      let _this = this;
      setTimeout(function(){
        _this.success = false;
        _this.$emit("login")
      },1000)
      }
      
     
     
    },
   close(){
     this.$emit("close")
   },
   goRegister(){
     this.init()
     this.error = "";
     this.keyPlaceholder = "设置登录密码";
     this.registerShow = true;
   },
   register(){
     if(this.inputVolidate()){
         let _this = this;
     setTimeout(function(){
_this.registerShow = false;
     },1000)
      
     }
   },
   returnLogin(){
     this.init()
 this.registerShow = false
     
   },
   init(){
  this.phoneNum = "";
    this.keyNum = ""
   }
  },
  beforeDestroy(){
  this.init()
  }

};
</script>
<style lang="less">
.login-comp {
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/images/loginBg.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  
  .close{
    position: absolute;
    top: 10px;
    right: 10px;
    color: rgba(0,0,0,.5);
    &:hover{
      
        color: rgba(0,0,0,.9);
      
    }
  }
  .return-login{
    padding: 10px;
    font-size: 14px;
    color: rgba(0,0,0,.7);
    cursor: pointer;
  }
  .main{
      position: absolute;
      top: 120px;
      left: 50%;
      transform: translate(-50%,0);
      .phone{
          width: 300px;
          height: 35px;
          border: 1px solid #ddd;
          border-radius: 5px;
          display: flex;
          align-items: center;
          font-size: 14px;
        //   background-color: rgba(0,0,0,.4);
          i{
             
              color: rgba(255,255,255,1);
              margin: 0 8px;
          }
          .iconxiala{
              font-size: 12px;
              height: 25px;
              line-height: 25px;
              padding-right: 5px;
              border-right: 1px solid #ddd;
          }
          span{
              font-size: 13px;
              color: #fff;
          }
          input{
              flex: 1;
              height: 30px;
              line-height: 30px;
              font-size: 14px;
              color: #fff;
              background-color: transparent;
          }
      }
     
      .key{
           width: 300px;
          height: 35px;
          border: 1px solid #ddd;
          border-radius: 5px;
          display: flex;
          align-items: center;
          font-size: 14px;
          margin: 10px 0;
           i{
             
              color: rgba(255,255,255,1);
              margin: 0 8px;
          }
             input{
              flex: 1;
              height: 30px;
              line-height: 30px;
              font-size: 14px;
              color: #fff;
              background-color: transparent;
          }
          span{
              margin: 0 5px;
              color: #fff;
          }
      }
      .login-mode{
          margin-bottom: 20px;
          overflow: hidden;
          .square{
              display: inline-block;
              width: 10px;
              height: 10px;
              border: 1px solid #ddd;
              border-radius: 2px;
              position: relative;
              .iconicon{
                  position: absolute;
                  top: -1px;
                  left: -1px;
                  font-size: 12px;
                  color: rgba(0,0,0,.6);
              }
          }
          span{
              font-size: 14px;
              color: #eee;
              // margin: 0 5px;
          }
           .phone-tip{
             float: right;
        font-size: 13px;
        line-height: 14px;
        color: rgb(172, 13, 13);
      }
      }
      .btns{
        position: relative;
        width: 300px;
          height: 35px;
           margin-bottom: 10px;
           .login-btn,
           .register-btn{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(172, 13, 13, 0.9);
          color: #fff;
          font-size: 16px;
          border-radius: 5px;
         
          &:hover{
              background-color: rgba(172, 13, 13, 1);
          }
      }
      }
     
      .register{
          
          text-align: center;
          text-decoration: underline;
      }
      .other-mode-tip{
          position: relative;
          margin: 20px 0;
          text-align: center;
          font-size: 12px;
          color: #fff;
             &::before{
              content: "";
              position: absolute;
              top: 8px;
              left: 0;
              width: 95px;
              height: 2px;
              background-color: #ccc;
              z-index: -1;
          }
          &::after{
              content: "";
              position: absolute;
              top: 8px;
              right: 0px;
              width: 95px;
              height: 2px;
              background-color: #ccc;
              z-index: -1;
          }
      }
      .other-login-mode{
        display: flex;
        justify-content: center;
  div{
    margin: 0 15px;
  }
        .wechat{
          width:38px;
          height: 38px;
          background: url(~@/assets/images/logo.png) no-repeat;
          background-position:-150px -670px;
}
  .QQ{
      width:38px;
          height: 38px;
          background: url(~@/assets/images/logo.png) no-repeat;
    background-position: -190px -670px;;
  }
  .weibo{
          width:38px;
          height: 38px;
          background: url(~@/assets/images/logo.png) no-repeat;
    background-position:  -231px -670px;
   
  }

        
      }
        
  }
.success{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          width: 120px;
          height: 40px;
          line-height: 40px;
          background-color: rgba(255,255,255,1);
          border-radius: 10px;
          color: #0f0;
          .icondui{
            font-size: 16px;
            margin: 0 10px
          }
  }
}
</style>