<template>
  <div class="mv">
    <div class="mv-player">
      <video :src="songMv" ref="mvControls" @timeupdate="updateCurTime" @loadedmetadata="getDuration"></video>
    <div class="load"  :class="{'over':!loadShow}" >
        <load-animation/>
        </div>
    </div>

    <div class="mv-controls-container">
        <mv-controls @play="hideLoad"></mv-controls>    
    </div>
  </div>
</template>
<script>
import mvControls from "./MvControls.vue";
import loadAnimation from "./LoadAnimation"
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "MvPlayer",
  data(){
    return {
      loadShow:true
    }
  },
  computed: {
    ...mapGetters(["songMv", "enterMv"])
  },
  beforeRouteEnter(to,from,next){
    
    next(vm=>{
      vm.setEnterMv(true);
    })
  },
  methods: {
    ...mapMutations(["setEnterMv","setMvControls","setMvCurTime","setMvDuration","setMvVolume"]),
    ...mapActions(["getMv"]),
    updateCurTime(e){
        this.setMvCurTime(e.target.currentTime)
    },
    getDuration(e){
 this.setMvDuration(e.target.duration );
 this.setMvVolume(e.target.volume)
    },
    hideLoad(){
      this.loadShow = false;
    }
  },
  components: {
    mvControls,
    loadAnimation
  },

  mounted(){
      
      console.log(this.$refs.mvControls,this.$refs.mvControls.duration ,"zheng")
      this.setMvControls(this.$refs.mvControls)
     
  },
  activated(){
    this.loadShow = true
  },
  beforeDestroy() {
    this.setEnterMv(false);
  }
};
</script>
<style lang="less">
.mv {

  flex-grow: 1;
  width: 100%;
   min-width: 750px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.8);

  .mv-player {
    position: relative;
    flex-grow: 1;
    display: flex;
    align-items: center;
    .load{
      position: absolute;
      top: 50%;
      left:50%;
      width: 110px;
      height: 100px;
      // transform: translate3d(-50%,-50%);
      &.over{
        animation: over .8s forwards;
      }
    }
    video {
      // position: absolute;
      width: 100%;
      margin: 0 auto;
      // left: 50%;
      // bottom: 50%;
      // transform: translate(-50%,-50%);
     
      min-height: 606px;
      max-width: 1000px;
    }
  }

  .mv-controls-container {
    position: relative;
    // bottom: 0px;
    // width: 100%;
    min-width: 750px;
    height: 55px;
   
  }
  @keyframes over{
    0%{
        transform:translate(-50%,-50%) scale(1) rotate(0) ;
    }
    100%{
        transform:translate(-50%,-50%) scale(0) rotate(360deg) ;
        display: none;
    }
}
}
</style>