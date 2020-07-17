 <template>
  <div class="aside-left">
    <h3>搜索列表</h3>
    <ul class="aside-list">
      <li
        v-for="(item,index) in searchlist"
        :class="{active:isClick === item.id}"
        :key="item.id || index"
        @click="changeClick(item.id)"
        @dblclick="playSong(item)"
      >
        <i class="iconfont iconbofang aside-playico"></i>
        <span class="song-name">{{item.name}}</span>

        <i class="iconfont icon-mv mv-play" v-if="item.mvid" @click="mvPlayer(item.mvid)"></i>
        <i class="iconfont icontianjia add-song" @click="addSong(item)"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters ,mapActions,mapMutations} from "vuex";
export default {
  name: "asideLeft",
  data() {
    return {
      isClick: 0
    };
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
    ])
  },
  methods: {
    ...mapActions([
      "getSearchlist",
      "getSongUrl",
      "getSongComments",
      "getSongImg",
      "getMv"
    ]),

    ...mapMutations([
      "pushPlaylist",
      "setCurrentIndex",
      "setPlayState",
      "setEnterMv"
    ]),
    changeClick(id) {
      console.log(id);
      this.isClick = id;
    },
    isStored(id) {
      let index = this.playlist.findIndex(item => {
        return item.id === id;
      });
      return index;
    },
    SongUrlHandle(item) {
      let index = this.isStored(item.id);
      if (index === -1) {
        this.pushSong(item);
        console.log(this.playlist[this.playlist.length - 1]);
        this.setCurrentIndex(this.playlist.length - 1);
      } else {
        this.setCurrentIndex(index);
      }
    },
    pushSong(item) {
      this.pushPlaylist({
        image: item.artists[0].img1v1Url,
        album: item.album.name,
        song: item.name,
        id: item.id,
        singer: item.artists[0].name,
        audio: this.currentUrl || " ",
        duration: item.duration / 1000
      });
      localStorage.setItem("playlist",JSON.stringify(this.playlist))
    },
    playSong(item) {
      
      this.getSongComments(item.id);
      this.getSongImg(item.id);
      this.getSongUrl(item.id).then(res => {
        this.SongUrlHandle(item);
        this.currentUrl ? this.setPlayState(true) : this.setPlayState(false);
        console.log(this.playlist, "加上");
        console.log(this.currentIndex);
      });
    },
    addSong(item) {
      let index = this.isStored(item.id);
      if (index === -1) {
        this.pushSong(item);
      }
    },
    mvPlayer(mvid) {
      console.log(this);
      this.$router.push("/mv");
    
      this.getMv(mvid)
    }
  }
};
</script>

<style lang="less">
.aside-left {
      position: relative;
      padding-top:33.6px ;
      width: 25%;
      // z-index: 100;
      min-width: 200px;
      box-sizing: border-box;
      height: 100%;
      float: left;
      -webkit-user-select: none;
      overflow: hidden;
      h3 {
        position: absolute;
        top: 0px;
        padding: 10px 0 10px 10px;
        font-size: 14px;
        color: #000;
        font-weight: bolder;
      }
      &::after {
        content: "";
        position: absolut4;
        top: 50%;
        right: 0px;
        transform: translateY(-50%);
        width: 5px;
        height: 100%;
        display: inline-block;
        background-image: url(~@/assets/images/line.png);
        background-size: contain;
        // background-position: center;
        background-repeat: no-repeat;
      }
      .aside-list {
        display: flex;
        flex-direction: column;
        padding: 0px 10px 10px 5px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.7);
        box-sizing: border-box;
        height: 100%;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 0px;
          height: 0px;
        }
        // &::-webkit-scrollbar-track {
        //   border-right: 1px solid rgba(100, 100, 100, 0.2);
        //   background: rgba(188, 188, 188, 0.1);
        // }
        // &::-webkit-scrollbar-thumb {
        //   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        //   border-radius: 10px;
        //   background: rgba(236, 236, 236, 1);
        //   &:hover {
        //     background: #cfcfd1;
        //   }
        // }

        li {
          padding: 10px;
          display: flex;
          align-items: center;
          cursor: context-menu;
          &:nth-of-type(2n) {
            background-color: rgba(139, 127, 127, 0.15);
          }
          &:hover {
            background-color: rgba(247, 238, 238, 0.4);
          }
          &.active {
            background-color: rgba(202, 65, 65, 0.4);
          }
          .aside-playico {
            font-size: 18px;
            padding: 2px 5px;
            color: #c62f2f;
            font-weight: bold;
          }
          .song-name {
            flex: 1;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .add-song {
            color: #c62f2f;
            font-weight: bold;
            font-size: 12px;
            border-radius: 50%;
            // border: 1px solid #c62f2f ;
          }
          .mv-play {
            font-size: 14px;
            padding: 0 10px;
            color: #fe672e;
          }
        }
      }
}
      

      
    
</style>