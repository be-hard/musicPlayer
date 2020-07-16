<template>
    <div class="center">
        <div class="player-bar" :class="{'active':playState}"></div>
        <div class="music-player" :class="{'active':playState}">
          <div class="disc-poster">
            <img :src="songImg" alt />
          </div>
        </div>
        <div class="song-name">{{currentSong.song || "" }}</div>
      <div class="singer">{{currentSong.singer}}</div>
      </div>
</template>
<script>
import {mapGetters} from "vuex"
import preload from '@/assets/js/preload'
export default{
    name:"center",
    computed:{
        ...mapGetters(["playState", "currentSong","songImg"])
    },
    created(){

    },
    watch:{
        songImg(val){
            preload([val])
        }
    },
    filters:{
    songName(value){
      console.log(value)
      let index = value.indexOf("(");
      let newValue = value.slice(0,index)
      console.log(index,newValue,"524")
      return newValue
    }
  }

}
</script>
<style lang="less">
.center {
      overflow: hidden;
      // width: 70%;
      height: 100%;
      position: relative;
      text-align: center;
      .player-bar {
        position: absolute;
        top: -10px;
        left: 50%;
        width: 92px;
        height: 128px;
        z-index: 2;
        transform: translateX(-50%);
        background-image: url(~@/assets/images/player_bar.png);
        background-size: cover;
        background-repeat: no-repeat;
        transform-origin: 5px 5px;
        transform: rotate(-15deg);
        transition: transform 0.5s linear;
        &.active {
          transform: rotate(0deg);
        }
      }
      .music-player {
        position: absolute;
        top: 70px;
        left: 50%;
        transform: translateX(-50%) rotate(30deg);
        width: 300px;
        height: 300px;
        transform-origin: center center;
        background-color: salmon;
        background: url(~@/assets/images/disc.png);
        background-size: contain;
        background-repeat: no-repeat;
        animation: discRotate 10s linear infinite paused;
        &.active {
          animation: discRotate 10s linear infinite;
        }
        .disc-poster {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 165px;
          height: 165px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 165px;
          }
        }
      }
      .song-name{
        position: absolute;
        left: 50%;
        top: 400px;
        font-size: 18px;
        font-weight: bold;
        color: rgba(202, 65, 65, 0.5);
        white-space: nowrap;
        transform: translate(-50%);
      }
      .singer{
        position: absolute;
        left: 50%;
        top: 430px;
        font-size: 17px;
        font-weight: 560;
        color: rgba(202, 65, 65, 0.3);
        white-space: nowrap;
        transform: translate(-50%);
      }
    }

  
@keyframes discRotate {
  0% {
    transform: translateX(-50%) rotate(0);
  }
  100% {
    transform: translateX(-50%) rotate(360deg);
  }
}
</style>