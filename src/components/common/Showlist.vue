<template>
  <div class="showlist" ref="showlist">
    <div class="header">
      <div class="list-header">
        <div class="select-item">
          <div class="playlist" :class="{active:activeItem === 1}" @click="playActive">播放列表</div>
          <div class="history" :class="{active:activeItem === 2}" @click="historyActive">历史记录</div>
        </div>

        <i class="iconfont icon-code close" @click="changeListOpen"></i>
      </div>
      <div class="list-detail">
        <div class="nums">总{{curlist.length}}首</div>
        <div class="clear-all" @click="clearAll">
          <i class="iconfont iconshanchu clear"></i>
          <span>清空</span>
        </div>
      </div>
    </div>
    <div class="album">
      <album :songList="playlist" :width="width" v-show="activeItem === 1" />
      <album :songList="historylist" :width="width" v-show="activeItem === 2" />
    </div>
  </div>
</template>
<script>
import { mapGetters,mapMutations, mapActions, mapState } from "vuex";
import album from "./Album";
export default {
  name: "showList",
  components: {
    album
  },
  data() {
    return {
      width: 100,
      activeItem:1,
      
    };
  },
  created(){
    this.getHistorylist();
  },
  mounted(){
    this.init()
  },
  computed: {
    ...mapGetters([
      "playlist",
      "currentSong",
      "currentIndex",
      "playState",
      "playMode",
      "historylist",
      "playlistOpen"
    ]),
    curlist(){
      console.log(this.historylist)
      return this.activeItem === 1 ? this.playlist : this.historylist
    }
  },
  methods:{
     ...mapMutations([
      "setPlaylist",
      "setHistorylist",
      "pushHistorylist",
      "setPlaylistOpen"
    ]),
    ...mapActions(["getHistorylist"]),
    changeListOpen(e){
      e.stopPropagation();
      console.log(3)
      this.setPlaylistOpen(false)
    },
    playActive(e){
      e.stopPropagation();
      this.activeItem = 1;
    },
    historyActive(e){
      e.stopPropagation();
      this.activeItem = 2;
      console.log(2)
    },
    clearAll(e){
      // e.stopPropagation();
      if(this.activeItem === 1){
        this.setPlaylist([])
      }else{
        this.setHistorylist([])
      }
    },
    init(){
      this.$refs.showlist.addEventListener("click",function(e){
        console.log(2)
        e.stopPropagation()
      })
      window.addEventListener("click",this.clickWindow,false)
    },
      clickWindow(e){
    console.log(1)
 let isWindow = e.target.classList.contains("showlist")

        this.setPlaylistOpen(false)
  }
  },
  
  beforeDestroy(){
    window.removeEventListener("click",this.clickWindow)
  }
}
</script>

<style lang="less" scoped>
.showlist {
  // overflow: hidden;
  width: 100%;
  // transform: translateX(0);
  box-shadow: -2px -2px 2px 0px #ddd;
  height: 100%;
    z-index: 100;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  .header {
    position: relative;
    width: 100%;
    // height: 10%;
    overflow: hidden;
    background-color: #ddd;
    box-shadow: -2px -2px 2px 0px #eee;

    .list-header {
      text-align: center;
      padding: 5px;
      background-color: rgba(245, 241, 241, 0.9);
      white-space: nowrap;
      &::after {
        content: "";
        display: block;
        clear: both;
      }
      .select-item {
        display: inline-block;
        border-radius: 4px;
        overflow: hidden;
        .playlist,
        .history {
          display: inline-block;
          font-size: 13px;
          color: #555555;
          background-color: #fff;
          padding: 5px 20px;
          cursor: pointer;
          &.active {
            background-color: #7c7d85;
            color: #f1f1f1;
          }
        }
      }
      .close {
        float: right;
        font-size: 14px;
        font-weight: bold;
        padding: 5px;
        color: #ccc;
        &:hover {
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
    .list-detail {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #e1e1e2;
      border-bottom: 1px solid #e1e1e2;
      background-color: #fff;
      & > {
        font-size: 12px;
        padding: 8px 10px;
        color: #666;
      }
      .clear-all {
        cursor: pointer;
        .clear {
          padding: 0 5px;
          font-size: 15px;
        }
      }
    }
  }
  .album {
    position: absolute;
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    // top: 66.8px;
    height:433.2px;
    z-index: 1;
    background-color: #fff;
  }
}
</style>