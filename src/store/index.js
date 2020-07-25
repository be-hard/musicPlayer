import Vue from 'vue'
import Vuex, { mapState } from 'vuex'
import * as actions from "./actions.js"
import * as mutations from "./mutations.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songs:{
      playlist:[],
      currentIndex:0,
      playState:false,
      historylist:[],
      playlistOpen:false,
      searchlist:[],
      currentUrl:"",
      currentSongComments:[],
      songImg:"",
      songMv:""
    },                                    
    audio:{

    },
    enterMv:false,
    mvControls:{
      refs:null,
      curTime:0,
      duration:0,
      mvVolume:1
    }
    
  },
  mutations, 
  actions,
  getters:{
    playlist(state){
      console.log(state.songs)
      return state.songs.playlist
    },
    historylist(state){
      return state.songs.historylist    
    },
    currentIndex(state){
      return state.songs.currentIndex
    },
    currentSong(state){
      return state.songs.playlist[state.songs.currentIndex] || {};
    },
    playState(state){
      return state.songs.playState
    },
    playMode(state){
      return state.songs.playMode
    },
    playlistOpen(state){
      return state.songs.playlistOpen
    },
    audio(state){
      return state.audio
    },
    searchlist(state){
      return state.songs.searchlist;
    },
    currentUrl(state){
      return state.songs.currentUrl;
    },
    currentSongComments(state){
      console.log(state.songs.currentSongComments,"get")
      return state.songs.currentSongComments
    },
    songImg(state){
      console.log(state.songs.songImg,"get图片")
      return state.songs.songImg
    },
    songMv(state){
      return state.songs.songMv
    },
    enterMv(state){
      return state.enterMv
    },
    mvPlayer(state){
      return state.mvControls.refs
    },
    curTime(state){
      return state.mvControls.curTime
    },
    duration(state){
      return state.mvControls.duration
    },
    mvVolume(state){
      return state.mvControls.mvVolume
    }
  },
  modules: {
  }
})
