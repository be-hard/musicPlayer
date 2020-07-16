<template>
  <div class="home-comp">
    <!-- <div class="middle"> -->
      <div class="banner-container">
        <banner :list="list"></banner>
      </div>
      
  <recom-list/>
    <!-- </div> -->

     
  </div>
</template>
<script>
import banner from "./Banner";
import recomList from "./RecomList"
export default {
  name: "home",
  data() {
    return {
      list: [
        "http://p1.music.126.net/YNsttgnWJqg7EifwqNcf3w==/109951165034965284.jpg?imageView&quality=89",
        "http://p1.music.126.net/dvqKP9gufXtr2lzAVyaPOQ==/109951165034790688.jpg?imageView&quality=89",
        "http://p1.music.126.net/DFEGUuJnDA2skS47wuJu7w==/109951165034430863.jpg?imageView&quality=89",
        "http://p1.music.126.net/ppnVfB9LPsN1k6FAJViN1Q==/109951165036838161.jpg?imageView&quality=89",
        "http://p1.music.126.net/jLaTbyVz6wXm27Hm_nV9qg==/109951165036911885.jpg?imageView&quality=89",
        "http://p1.music.126.net/5CREHgBVnt24bDB0UMvadA==/109951165036909999.jpg?imageView&quality=89",
        "http://p1.music.126.net/tu8fR_PvsKYAIFI9DtD2lw==/109951165036833109.jpg?imageView&quality=89"
      ]
    };
  },
  components: {
    banner,
    recomList
  }
};
</script>
<style lang="less">
.home-comp {
  flex: 1;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar-track{
    width: 0px;
    height: 0px;
  }
  &::-webkit-scrollbar-thumb{
    width: 0px;
    height: 0px;
  }
  
  .banner-container {

      background-color: rgba(80, 77, 77, 0.8);
      padding: 10px;
    }

    
  
}
</style>