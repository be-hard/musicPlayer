<template>
<div class="songBox" :style="{width:`${width}%`}">
    <ul class="album">
      <li class="item" :class="{active:item === activeItem}" v-for="(item,index) in songList" :key="index" @click="clickSong(item)" @dblclick="playSong(item)">
        <div class="song-detail">
            <div class="play-active"><i class="iconfont play" v-show="item === playingSong">&#xe6db;</i></div>
            <span class="name">{{item.song}}</span>
            <span class="songTv">{{item.album}}</span>
            <i class="iconfont icon-sq sq" v-show="item.sq"></i>
          <i class="iconfont icon-mv mv-play" v-show="item.mv"></i>
        </div>
        <span class="singer">{{item.singer}}</span>
        <i class="link iconfont icon-xiazai"></i>
        <span class="duration">{{item.duration | timefilter}}</span>
      </li>
    </ul>
</div>
</template>
<script>
import {mapMutations,mapGetters} from "vuex"
export default{
    name:"album",
    data(){
        return {
            activeItem:null,
            playingSong:null
        }
    },
    methods:{
         ...mapMutations([
      "setPlaylist",
      "setPlayState",
      "setPlayMode",
      "setCurrentIndex"
    ]),
        clickSong(item){
            this.activeItem = item;
        },
        playSong(item){
            this.playingSong = item;
           let index = this.playlist.findIndex((value)=>{
                return value.audio === item.audio
            })
            this.setCurrentIndex(index);
            this.audio.play()
            this.setPlayState(true)
        }
    },
    filters:{
        timefilter(value){
            let min = Math.floor(value / 60);
            let sec = Math.floor(value % 60);
            return `${min < 10 ? 0 : ""}${min}:${sec < 10 ? 0 : ""}${sec}`
        }
    },
    computed:{
        ...mapGetters([
      "playlist",
      "currentSong",
      "currentIndex",
      "playState",
      "playMode",
      "audio"
    ]),
    },
    props:{
        width:{
            type:Number
        },
        songList:{
            type:Array
        }
    }
}
</script>
<style lang="less">
.songBox{
    // position: absolute;
    overflow: hidden;
    // z-index: 100;
    height: 100%;
 
.album{
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        font-size: 12px;
        overflow-y: auto;
           &::-webkit-scrollbar {
        width: 8px;
        height: 0;
        background: rgba(188,188,188,.3);
    }
     &::-webkit-scrollbar-track {
        border-right:1px solid rgba(100,100,100,.2);
        background: rgba(188,188,188,.1);
    }
    &::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: rgba(236,236,236,1);
        &:hover {
          background: #CFCFD1;
        }
    }
    
        li:nth-of-type(2n-1){
            background-color: #fff;
        }
        li:nth-of-type(2n){
            background-color: #eef;
        }
        .item{
            display: flex;
            // width: 100%;
            align-items: center;
            padding: 7px 40px 7px 0;
            color: #777;
            &:hover{
                background-color: #ddd;
            }
            &.active{
                background-color: #ccc;
            }
            .song-detail{
                flex: 1;
                display: flex;
                align-items: center;
                .play-active{
                    width: 25px;
                .play{
                    font-size: 16px;
                    color: #C62F2F;
                    padding: 0 5px;
                }
                }
                .name{
                    font-size: 13px;
                    color: #333;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                .songTv{
    
                    max-width: 160px;
                    padding: 0 5px;
                    color: #888888;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                i{
                    font-size: 16 px;
                    padding: 0 2px;
                    cursor: pointer;
                }
                .sq{
                    position: relative;
                    top: 3px;
                    color:#FE672E;
                }
                .mv-play{    
                    color: #FE672E;    
                }
            }
            .singer{
                width: 20%;
                font-size: 13px;
                white-space: nowrap;
                text-overflow:ellipsis;
                overflow: hidden;
            }
            .link{
                cursor: pointer;
                font-size: 14px;
                padding: 0 20px;
            }
            .duration{
                font-size: 13px;
                
            }
        }
    }

}
 
   
</style>