<template>
  <div class="recom-list">
    <h3>推荐歌单</h3>
    <ul class="recom-list-container">
      <li class="list-item" v-for="(item) in pageRecomList" :key="item.id">
        <div class="poster">
          <img :src="item.coverImgUrl" alt />
          <div class="poster-bottom">
            <i class="iconfont iconerji earphone"></i>
            <span class="play-num">{{item.playCount | num}}</span>
            <i class="iconfont iconbofang player" ></i>
          </div>
        </div>
        <div class="cate-name">{{item.name}}</div>
        <div class="creator">
          by
          <span>{{item.creator.nickname}}</span>
        </div>
      </li>
    </ul>
    <div class="pagination-container">
        <pagination
      @jumpPage="jumpPage"
      :totalPage="totalPage"
      :pageNow="pageNow"
      :pageSize="pageSize"
      :paginationNum="paginationNum"
    ></pagination>
        </div>
  </div>
</template>
<script>
import pagination from "./Pagination";
export default {
  name: "recomList",
  data() {
    return {
      recomList: [],
      pageNow: 1,
      totalPage: 0,
      pageSize: 10,
      paginationNum: 5
    };
  },
  components: {
    pagination
  },
  methods: {
    getRecomList() {
      this.$axios.get("http://musicapi.leanapp.cn/top/playlist").then(res => {
        this.recomList = res.data.playlists;
        this.totalPage = Math.ceil(this.recomList.length / this.pageSize);
        console.log(this.recomList, res);
      });
    },
    jumpPage(val) {
      console.log(val)
      this.pageNow = val;
    } 
  },
  computed: {
    pageRecomList() {
      return this.recomList.slice(
        (this.pageNow - 1) * this.pageSize,
        this.pageNow * this.pageSize
      );
    },
    imgUrlList(){
      return this.pageRecomList.map((item)=>{
          return item.coverImgUrl
      })
    }

  },

  created() {
    this.getRecomList();
  },
  filters: {
    num(value) {
      if (value > 9999) {
        value = (value + "").replace(/[0-9]{4}$/, "万");
      }
      return value;
    }
  }
};
</script>
<style lang="less">
.recom-list {
  width: 980px;
  margin: auto;
  padding: 20px 40px;
  // height: ;
  // overflow: auto;
  h3 {
    position: relative;
    margin: 10px 10px 50px 10px;
    font-size: 20px;
    font-weight: bold;

    &::after {
      position: absolute;
      bottom: -14px;
      left: 0;
      content: "";
      width: 100%;
      height: 4px;
      background-color: #c62f2f;
    }
    // color: #c62f2f;
  }
  .recom-list-container {
    // overflow: auto;

    width: 980px;
    display: grid;
    grid-template-columns: repeat(5, 150px);
    grid-template-rows: repeat(2, 218px);
    row-gap: 10px;
    column-gap: 50px;
    // justify-content: center;
    // align-items: center;
    .list-item {
        cursor: pointer;
      .poster {
        width: 140px;
        height: 140px;
        overflow: hidden;
        position: relative;
        img {
          width: 140px;
        }
        .poster-bottom {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 27px;
          background-image: linear-gradient(
            rgba(0, 0, 0, 0.45),
            rgba(0, 0, 0, 0.8)
          );
          line-height: 27px;
          color: #ccc;
          .earphone {
            margin: 5px;
          }
          .play-num {
            font-size: 13px;
          }
          .player {
            position: absolute;
            right: 5px;
            &:hover{
                color: #fff;
            }
          }
        }
      }
      .cate-name {
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 11px 0;
        color: rgba(0, 0, 0, .7);
        &:hover{
            color: rgba(0, 0, 0, .9);
        }
      }
      .creator {
        color: #999;
        font-size: 12px;
        span {
          color: #666;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
  .pagination-container{
     display: flex;
     justify-content: center;
     padding: 10px;
  }
}
</style>