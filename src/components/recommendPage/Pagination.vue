<template>
  <div class="pagination">
    <ul>
      <li class="prev-page" :class="pagePresent === 1 ? 'disabled' : ''">
        <a href="javascript:;" @click="jumpPrev"><i class="iconfont  iconarrowleft"></i>上一页</a>
      </li>
      <li
        v-for="(item,index) in pagelist"
        :key="index"
        :class="item === pagePresent ? 'active' : ''"
        @click="jumpPage(item,$event)"
      >
        <a href="#">{{item}}</a>
      </li>

      <li class="next-page" :class="pagePresent === totalPage ? 'disabled' : ''">
        <a href="javascript:;" @click="jumpNext" >下一页<i class="iconfont iconnext"></i></a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "pagination",
  data() {
    return {
      pagePresent: this.pageNow
    };
  },
  props: {
    totalPage: {
      type: Number,
      default: 20
    },
    pageNow: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 0
    },
    paginationNum: {
      type: Number,
      default: 10
    }
  },
  methods: {
    jumpPage(index, e) {
      if (index !== "...") {
        console.log(index);
        this.pagePresent = index || this.pageNow;
        this.$emit("jumpPage", this.pagePresent);
      }

      console.log(e);
    },
    jumpPrev() {
      if (this.pagePresent > 1) {
        this.pagePresent--;
        this.$emit("jumpPage", this.pagePresent);
      }
    },
    jumpNext() {
      if (this.pagePresent < this.totalPage) {
        this.pagePresent++;
        this.$emit("jumpPage", this.pagePresent);
      }
    },
    getStartNum(end) {
      let arr = [];
      for (let i = 1; i <= this.paginationNum - 2; i++) {
        arr.push(i);
      }
      arr.push(...["...", end]);
      return arr;
    },
    getEndNum(end, paginationNum) {
      let arr = [];
      arr.push(1, "...");
      for (let i = end - paginationNum + 3; i <= end; i++) {
        arr.push(i);
      }
      console.log(arr);
      return arr;
    },
    getMidNum(nowPage, final, pagination) {
      let arr = [];
      let start = Math.floor(nowPage - (pagination - 4) / 2);
      let end = Math.ceil(nowPage + (pagination - 4) / 2);
      arr.push(...[1, "..."]);
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
      arr.push(...["...", final]);
      return arr;
    }
  },
  computed: {
    pagelist() {
      let start = this.pagePresent;
      let end = this.totalPage;
      let paginationNum = this.paginationNum;
      if (end <= paginationNum) {
        return end;
      } else if (start <= paginationNum / 2) {
        return this.getStartNum(end);
      } else if (start >= end - paginationNum / 2) {
        return this.getEndNum(end, paginationNum);
      } else {
        return this.getMidNum(start, end, paginationNum);
      }
    }
  }
};
</script>
<style lang="less">
.pagination {
  ul {
    display: flex;
    li {
      border: 1px solid rgb(204, 204, 204);
      padding: 6px 8px;
      font-size: 13px;
      margin: 0 3px;
      a {
        color: #333;
        text-decoration: none;
        .iconarrowleft,.iconnext{
            font-size: 12px;
            // line-height: 16px;
            // height: 16px;
        }
      }
      &.active {
        background-color: rgb(162, 22, 27);
        a {
          color: #fff;
        }
      }
      &.disabled{
         a{
cursor: context-menu;
         }
         
      }
    }
  }
}
</style>