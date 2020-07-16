<template>
  <div class="mv-controls">
    <div class="iconfont mv-play" :class="mvPlayClass" @click="changePlayState"></div>
    <div class="mv-timeSchedule">{{curTime | mvTime}} / {{duration | mvTime}}</div>
    <div class="mv-timeBar" ref="mvTimeBar">
      <div class="bar-bottom" ref="mvBarBottom"></div>
      <div class="bar-top" :style="{width:timeWidth + '%'}">
        <div class="drag-circle" @mousedown="drag"></div>
      </div>
    </div>
    <div class="mv-volume">
      <i class="iconfont iconyinliang mv-volume-icon"></i>
      <div class="mv-volume-bar" ref="volumeBar">
        <div class="bar-bottom" ></div>
        <div class="bar-top" :style="{width:volumeSchedule + '%'}">
          <div class="drag-circle" @mousedown="dragVolume"></div>
        </div>
      </div>
    </div>
  </div>
</template>
      <script>
      import {mapMutations,mapGetters} from "vuex"
export default {
  name: "mvControls",
  data() {
    return {
      isPlayMv:false,
      offsetL:0,
      allWidth:0,
      volumeWidth:0,
      timeWidth:0,

    };
  },
  computed:{
    ...mapGetters(["mvPlayer","curTime","duration","mvVolume"]),
    mvPlayClass(){
      return this.isPlayMv ? "iconziyuan" : "iconbofang2"
    }

  
  },
    filters: {
    mvTime(value) {
      let min = Math.floor(value / 60);
      let sec = Math.floor(value % 60);
      return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
    }
  },
  watch:{
curTime(newValue){
    this.timeWidth = (newValue / this.duration  * this.allWidth - 6)/this.allWidth * 100
  },
  mvVolume(newValue){
    this.volumeSchedule = newValue * 100;
    console.log(this.volumeSchedule,"25444")
  }
  },
  mounted(){
this.init()
   this.volumeSchedule = this.mvVolume *100
  },
  beforeDestroy(){
window.removeEventListener("resize",this.getBarWidth)
  },
  methods:{
    ...mapMutations(["setMvCurTime","setMvVolume"]),
    changePlayState(){
      this.isPlayMv = !this.isPlayMv;
console.log(this.mvPlayer.currentTime)
      if(this.isPlayMv){
        console.log(this.mvPlayer,"hk")
        this.mvPlayer.play()
      }else{
        this.mvPlayer.pause()
      }
      this.$emit("play")
    },
    drag(e) {
    
      this.offsetL = this.$refs.mvTimeBar.offsetLeft;

      e.stopPropagation();
      e.preventDefault();
      let _this = this;
      let disx;
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
      function move(e) {
        console.log(_this.offsetL, 777);
        e.stopPropagation();
        e.preventDefault();
        // console.log(_this.timeSchedule, "start");
        disx = e.clientX - _this.offsetL;
        if (disx < 0) {
          disx = 0;
        } else if (disx >= _this.allWidth) {
          disx = _this.allWidth;
        } else {
          disx = disx;
        }
        // else {
        //   console.log("nor")
          // _this.timeWidth = (disx / _this.allWidth) * 100;
        // }
        _this.mvPlayer.currentTime =
          (disx / _this.allWidth) * _this.duration;
          console.log(_this.mvPlayer.currentTime,disx,_this.allWidth)
          _this.setMvCurTime(_this.mvPlayer.currentTime)
      }
      function up(e) {
        document.removeEventListener("mousemove", move);
      }
    },
    dragVolume(e){

     let offsetL = this.$refs.volumeBar.offsetLeft;

      e.stopPropagation();
      e.preventDefault();
      let _this = this;
      let disx;
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
      function move(e) {
        console.log(offsetL, 777);
        e.stopPropagation();
        e.preventDefault();
        // console.log(_this.timeSchedule, "start");
        disx = e.clientX - offsetL;
        if (disx < 0) {
          disx = 0;
        } else if (disx >= _this.volumeWidth) {
          disx = _this.volumeWidth;
        } else {
          disx = disx;
        }
        // else {
        //   console.log("nor")
          // _this.timeWid th = (disx / _this.allWidth) * 100;
        // }
        _this.mvPlayer.volume =
          disx / _this.volumeWidth
          console.log(_this.mvPlayer.volume)
          _this.setMvVolume(_this.mvPlayer.volume)
      }
      function up(e) {
        document.removeEventListener("mousemove", move);
      }
    },
    init(){
      this.allWidth =  this.$refs.mvBarBottom.offsetWidth;
      this.volumeWidth = this.$refs.volumeBar.offsetWidth;
      window.addEventListener("resize",this.getBarWidth)
    },
    getBarWidth(){
      console.log(this,this.$refs.mvBarBottom)
     this.allWidth =  this.$refs.mvBarBottom.offsetWidth
    }
  }
}
 
</script>
<style lang="less">
.mv-controls {
  // position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  background-image: linear-gradient(rgba(255, 255, 255, 0.1), rgb(20, 19, 19));
  .mv-play {
    font-size: 16px;
    margin: 0 20px;
    color: rgba(255, 255, 255, 0.6);
  }
  .mv-timeSchedule {
    flex-shrink: 0;
    font-size: 15px;
    margin-right: 40px;
    color: rgba(241, 241, 241, 0.6);
  }
  .mv-timeBar {
    flex: 1;
    width: 100px;
    position: relative;
    margin-right: 50px;
    .bar-bottom {
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 4px;
      margin-top: -2px;
      border-radius: 3px;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .bar-top {
      position: absolute;
      left: 0;
      top: 50%;
      width: 0px;
      height: 4px;
      border-radius: 3px;
      margin-top: -2px;
      background-color: #d23030;
      .drag-circle {
        position: absolute;
        box-sizing: border-box;
        top: -5px;
        right: -6px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #f1f1f1;
        z-index: 100;
        border: 1px solid #c2c2c4;
        &::after {
          content: "";
          position: absolute;
          width: 4px;
          height: 4px;
          left: 3px;
          top: 3px;

          background-color: #d23030;
          border-radius: 50%;
        }
      }
    }
  }
  .mv-volume {
    font-size: 16px;
    display: flex;

    .mv-volume-icon {
      font-size: 16px;
      margin: 0 15px;
    }
    .mv-volume-bar {
      position: relative;
      width: 90px;
      margin-right: 20px;
      .bar-bottom {
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        height: 4px;
        margin-top: -2px;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.4);
      }
      .bar-top {
        position: absolute;
        left: 0;
        top: 50%;
        width: 0px;
        height: 4px;
        margin-top: -2px;
        border-radius: 3px;
        background-color: #d23030;
        .drag-circle {
          position: absolute;
          top: -5px;
          right: -6px;
          box-sizing: border-box;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #f1f1f1;
          z-index: 100;
          border: 1px solid #c2c2c4;
          &::after {
            content: "";
            position: absolute;
            width: 4px;
            height: 4px;
            left: 3px;
            top: 3px;
            background-color: #d23030;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>