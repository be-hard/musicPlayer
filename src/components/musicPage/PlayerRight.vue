<template>
  <div class="aside-right">
    <h3>热门留言</h3>
    <ul class="comment-list">
      <li v-for="(item) in currentSongComments" :key="item.commentId">
        <div class="avatar">
          <img v-lazy="item.user.avatarUrl" alt />
        </div>
        <div class="words">
          <div class="user-name">{{item.user.nickname}}</div>
          <p>{{item.content}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import preload from "@/assets/js/preload";
export default {
  name: "asideRight",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentSongComments"])
  }
};
</script>
<style lang="less">
.aside-right {
  position: relative;
  box-sizing: border-box;
  padding-top: 33.6px;
  width: 25%;
  min-width: 250px;
  height: 100%;
  float: right;

  h3 {
    position: absolute;
    top: 0px;
    padding: 10px 0px 10px 10px;
    font-size: 14px;
    color: #000;
    font-weight: bolder;
  }
  .comment-list {
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
    li {
      margin: 0 15px 25px 10px;
      .avatar {
        float: left;
        width: 50px;
        height: 50px;
        margin: 10px 10px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 50px;
          border-radius: 50%;
        }
      }
      .words {
        overflow: hidden;
        font-size: 12px;
        .user-name {
          font-weight: bold;
          padding: 8px 0;
        }
        p {
          line-height: 16px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
      &::after {
        content: "";
        display: block;
        clear: both;
      }
    }
  }
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
    width: 5px;
    height: 100%;
    display: inline-block;
    background-image: url(~@/assets/images/line.png);
    background-size: contain;
    // background-position: center;
    background-repeat: no-repeat;
  }
}
</style>