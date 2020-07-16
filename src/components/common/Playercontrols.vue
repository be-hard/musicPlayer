<template>
  <div class="player-controls" v-show="!enterMv">
    <div class="play-bottom">
      <div class="icons-controls">
        <i class="iconfont icon-shangyishou prev" @click="prevOne"></i>
        <i class="iconfont play" :class="playClass" @click="changePlayState"></i>
        <i class="iconfont icon-xiayishou next" @click="nextOne"></i>
      </div>
      <div class="play-center">
        <span class="current-time">{{currentTime | songTime}}</span>
        <div class="play-bars" ref="playBar">
          <div class="bar-bottom" ref="barBottom"></div>
          <div class="bar-top" :style="{width:timeSchedule + '%'}">
            <div class="drag-circle" @mousedown="drag"></div>
          </div>
        </div>
        <span class="all-time">{{this.currentSong.duration | songTime}}</span>
        <div class="volumn">
          <i class="iconfont volumn-icon iconyinliang"></i>
          <div class="volumn-bars" ref="volumnBar">
            <div class="volumn-bottom" ref="volumnBottom"></div>
            <div class="volumn-top" :style="{width:currentVolume + '%'}">
              <div class="drag-circle" @mousedown="volumnDrag"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="play-aside">
        <div class="play-mode" @click="changeMode">
          <i class="iconfont mode" :class="modeClass"></i>
        </div>
        <div class="playlist" @click="changeListOpen">
          <i class="iconfont icon-bofangliebiao"></i>
          <span class="playlist-length">{{playlist.length}}</span>
        </div>
      </div>
      <audio
        ref="audio"
        autoplay
        :src="currentSong.audio"
        @play="storeSong"
        @timeupdate="currentUpdate"
        @ended="end"
      ></audio>
    </div>

    <div class="outer-showlist" v-show="playlistOpen">
      <showlist ></showlist>
    </div>
  </div>
</template>

<script>
import showlist from "./Showlist";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
const boxWidth = 12;
export default {
  name: "player-controls",
  components: {
    showlist
  },
  data() {
    return {
      width: 50,
      currentTime: 0,
      timeWidth: 0,
      timeSchedule: 0,
      allWidth: 0,
      volume: 0,
      currentVolume: 0,
      mode: ["sequency", "loop", "random"],
      currentMode: "loop"
    };
  },
  created() {
    console.log(this.$store);
    this.getMusiclist();

    
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters([
      "playlist",
      "currentSong",
      "currentIndex",
      "playState",
      "playMode",
      "historylist",
      "playlistOpen",
      "enterMv"
    ]),
    playClass() {
      // console.log(this.playState)
      return this.playState === false ? "icon-bofang" : "icon-zanting";
    },
    percent() {
      return this.currentTime / this.currentSong.duration;
    },
    modeClass() {
      if (this.currentMode === "sequency") {
        return "icon-biao-";
      } else if (this.currentMode === "loop") {
        return "icon-danquxunhuan";
      } else {
        return "icon-bofangye-caozuolan-suijibofang";
      }
    }
  },
  filters: {
    songTime(value) {
      value = value || 0
      let min = Math.floor(value / 60);
      let sec = Math.floor(value % 60);
      return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
    }
  },
  watch: {
    currentTime(newValue) {
      //  this.timeSchedule = this.percent * 100
      this.timeWidth = this.percent * this.allWidth - boxWidth / 2;
      // console.log(newValue / this.currentSong.duration);
    },
    timeWidth(newValue) {
      this.timeSchedule = (newValue / this.allWidth) * 100;
      if (this.timeSchedule < 0) {
        this.timeSchedule = 0;
      }
    },
    volume(newValue) {
      this.currentVolume = newValue * 100;
    }
  },
  updated() {
    this.allWidth = this.$refs.playBar.offsetWidth;
    this.volume = this.$refs.audio.volume;
    if (!this.playState) {
      this.$refs.audio.pause();
    }
   
  },
  methods: {
    ...mapActions(["getMusiclist"]),
    ...mapMutations([
      "setPlaylist",
      "setPlayState",
      "setPlayMode",
      "setCurrentIndex",
      "setAudio",
      "pushHistorylist",
      "setPlaylistOpen"
    ]),
    prevOne(item) {
      let index = this.currentIndex - 1 < 0 ? 0 : this.currentIndex - 1;
      this.setCurrentIndex(index);
      this.setPlayState(true);
      console.log(this.$refs.audio.play(), this.playState);
    },
    nextOne(e) {
      let index =
        this.currentIndex + 1 > this.playlist.length
          ? this.playlist.length - 1
          : this.currentIndex + 1;
      this.setCurrentIndex(index);
      this.setPlayState(true);
    },
    changePlayState() {
      this.setPlayState(!this.playState);
      this.playState === false
        ? this.$refs.audio.pause()
        : this.$refs.audio.play();
    },
    changeMode() {
      let index = this.mode.indexOf(this.currentMode);
      let len = this.mode.length;
      index++;
      index = index >= len ? 0 : index;
      this.currentMode = this.mode[index];
    },
    drag(e) {
      if (!this.playState) {
        this.$refs.audio.pause();
      }
      this.offsetL = this.$refs.playBar.offsetLeft;

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
        console.log(_this.timeSchedule, "start");
        disx = e.clientX - _this.offsetL;
        if (disx < 0) {
          disx = 0;
          console.log(5555);
        } else if (disx >= _this.allWidth) {
          disx = _this.allWidth;
        } else {
          disx = disx;
        }
        // else {
        //   console.log("nor")
        //   _this.timeSchedule = (disx / _this.allWidth) * 100;
        // }
        _this.$refs.audio.currentTime =
          (disx / _this.allWidth) * _this.currentSong.duration;
      }
      function up(e) {
        document.removeEventListener("mousemove", move);
      }
    },
    volumnDrag(e) {
      let offsetL = this.$refs.volumnBar.offsetLeft;
      let volumeWidth = this.$refs.volumnBottom.offsetWidth;
      e.stopPropagation();
      e.preventDefault();
      let _this = this;
      let disx;
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
      function move(e) {
        console.log(offsetL, 777);
        e.preventDefault();
        disx = e.clientX - offsetL;
        if (disx < 0) {
          disx = 0;
          console.log(5555);
        } else if (disx >= volumeWidth) {
          disx = volumeWidth;
        } else {
          disx = disx;
        }
        _this.$refs.audio.volume = disx / volumeWidth;
        console.log(_this.$refs.audio.volume, disx / volumeWidth);
        _this.volume = _this.$refs.audio.volume;
        // (disx / volumnWidth) * _this.currentSong.duration;
      }
      function up(e) {
        document.removeEventListener("mousemove", move);
      }
    },
    changeListOpen(e){
      e.stopPropagation();
      this.setPlaylistOpen(!this.playlistOpen)
    },
    storeSong() {
      console.log(888)
      let index = this.historylist.findIndex(item => {
        return item.audio === this.currentSong.audio;
      });
      if (index) {
        this.pushHistorylist(this.currentSong);
      }
    },
    currentUpdate(e) {
      this.currentTime = e.target.currentTime;

      // this.timeWidth = this.currentTime / this.currentSong.duration * allWidth
      // console.log(this.timeWidth)
    },
    end() {
      console.log("end");
      let currentMode = this.currentMode;
      if (currentMode === "loop") {
        this.loop();
      } else if (currentMode === "random") {
        this.random();
      } else {
        this.sequence();
      }
    },
    sequence() {
      let index =
        this.currentIndex + 1 >= this.playlist.length
          ? 0
          : this.currentIndex + 1;
      this.setCurrentIndex(index);
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
    },
    random() {
      let index = this.playlist.findIndex(item => {
        return item === this.currentSong;
      });
      let num = this.getNext(0, this.playlist.length, index);
      console.log(num);
      this.setCurrentIndex(num);
    },
    getNext(min, max, index) {
      let num = Math.floor(Math.random() * (max - min) + min);
      num = num === index ? this.getNext(min, max, index) : num;
      return num;
    },
    init() {
      this.setAudio(this.$refs.audio);
      window.onresize = () => {

        this.allWidth = this.$refs.barBottom.offsetWidth;
        this.offsetL = this.$refs.playBar.offsetLeft;
      };
    }
  },
  destroyed(){
    window.onresize = null
  }
};
</script>
<style lang="less" scoped>
@bordertopColor: #e1e1e2;
.player-controls {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 50px;
  background-color: #f6f6f8;
  z-index: 100;
  border-top: 1px solid @bordertopColor;

  .play-bottom {
    // position: absolute;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    .icons-controls {
      width: 200px;
      i {
        font-size: 35px;
        color: #d23030;
        
      }
      .prev {
        margin-left: 30px;
      }
      .play {
        margin: 0 20px;
      }
    }
    .play-center {
      display: flex;
      align-items: center;
      flex: 1;
      .current-time {
        font-size: 13px;
        padding: 0 20px;
      }
      .play-bars {
        width: 100px;
        flex: 1;
        position: relative;
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
      .all-time {
        font-size: 13px;
        padding: 0 10px;
      }
      .volumn {
        display: flex;
        width: 130px;
        align-items: center;
        .volumn-icon {
          font-size: 20px;
          color: rgba(0, 0, 0, 0.7);
          margin: 0 5px;
        }
        .volumn-bars {
          flex: 1;
          width: 90px;
          position: relative;
          margin-left: 10px;
          .volumn-bottom {
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            height: 4px;
            margin-top: -2px;
            border-radius: 3px;
            background-color: rgba(0, 0, 0, 0.4);
          }
          .volumn-top {
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
    .play-aside {
      display: flex;
      width: 130px;
      i {
        font-size: 20px;
        color: rgba(0, 0, 0, 0.8);
      }
      .mode {
        font-size: 16px;
        padding: 0 20px;
      }
      .playlist {
        display: flex;
        .playlist-length {
          width: 30px;
          height: 18px;
          font-size: 14px;
          line-height: 18px;
          text-align: center;
          border-radius: 0 10px 10px 0;
          background-color: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }
  .outer-showlist {
    position: absolute;
    right: 0;
    bottom: 51px;
    width: 60%;
    height: 500px;
    min-width: 400px;
    // overflow: auto;
    // background-color: aqua;
    // &::-webkit-scrollbar {
    //   width: 10px;
    //   height: 0px;
    //   background-color: aqua;
    // }
  }
}
</style>
