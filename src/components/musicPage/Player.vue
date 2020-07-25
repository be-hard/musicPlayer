<template>
  <div class="body" ref="musicPlayBody">
    <div class="content">
      <aside-left/>
      <aside-right/>
  <center/>
    </div>

  </div>
</template>
<script>
import { mapMutaions, mapGetters, mapActions, mapMutations } from "vuex";
import asideLeft from "./PlayerLeft"
import asideRight from "./PlayerRight"
import center from "./PlayerCenter"
export default {
  components:{
    asideLeft,
    asideRight,
    center
  },
 
  created() {
    
    let search = localStorage.getItem("searchlist");
    if(search){
      this.setSearchlist(JSON.parse(search))
    }
    this.getSearchlist("Shape of you").then(res => {
      this.getSongComments(this.searchlist[1].id);
      this.getSongImg(this.searchlist[1].id);
    })

  },
 mounted(){
   this.init()
 },
  beforeDestroy(){
    console.log("dd")
    this.setPlayState(false);
    
    
  },
  computed: {
    ...mapGetters([
      "playlist",
      "searchlist",
      "currentUrl",
      "currentIndex",
      "currentSong",
      "currentSongComments",
      "songImg",
      "playState"
    ]),
    // isPlay() {
    //   return this.playState;
    // },
    // commentsList(){
    //   return this.currentSongComments.map((item)=>{
    //     return item.user.avatarUrl;
    //   })
    // }
  },
  watch: {
searchlist(val){
  localStorage.setItem("searchlist",JSON.stringify(val))
},

    songImg(val){
      localStorage.setItem("songImg",JSON.stringify(val))
    },
    currentIndex(val){
       localStorage.setItem("currentIndex",JSON.stringify(val))
    },
    currentSongComments(val){
      localStorage.setItem("comments",JSON.stringify(val))
    },
    currentSong(val){
      localStorage.setItem("currentSong",JSON.stringify(val))
    }
    

  },
  methods: {
    ...mapActions([
      "getSearchlist",
      "getSongUrl",
      "getSongComments",
      "getSongImg",
      "getMv",
     
    ]),
    ...mapMutations(["setSearchlist", "setCurrentSongComments", "setPlayState", "setSongImg","setCurrentIndex","setCurrentSong"]),
    init(){
      let search = localStorage.getItem("searchlist");
      let songImg = localStorage.getItem("songImg");
      let currentIndex = localStorage.getItem("currentIndex");
      let comments = localStorage.getItem("comments");
      let currentSong = localStorage.getItem("currentSong")
    search ? this.setSearchlist(JSON.parse(search)) : "";
   
     songImg ? this.setSongImg(JSON.parse(songImg)) : "";
      currentIndex ? this.setCurrentIndex(JSON.parse(currentIndex)) : "";
      comments ? this.setCurrentSongComments(JSON.parse(comments)) : "";
      currentSong ? this.setCurrentSong(JSON.parse(currentSong)) : ""
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
};
</script>
<style lang="less" scoped>
.body {
  // position: absolute;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow: hidden;
  width: 100%;
  min-width: 750px;
  background-image: url(~@/assets/images/bg.jpg);
  background-position: center;
  .content {
    // position: absolute;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.4);
    }
}  
</style>