<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        :class="setClass(index)"
        @click="changeCurIndex(index)"
        v-for="(item,index) in list"
        :key="index"
      >
        <div class="mask" v-show="hidden(index)"></div>
        <img :src="item" alt />
      </div>
      <div class="btns" v-show="btns">
        <div class="iconfont iconjiantou1 btn swiper-button-prev" @click="changePrev()"></div>
        <div class="iconfont iconjiantou btn swiper-button-next" @click="changeNext()"></div>
      </div>
    </div>
    <div class="swiper-pagination">
      <span
        class="dot"
        :class="{'active':isActive(index)}"
        v-for="(item,index) in list"
        :key="index"
        @mouseover="changeCurIndex(index)"
      ></span>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "banner",
  data() {
    return {
      curIndex: 0,
      
      timer: null
    };
  },
  props: {
    btns:{
      type:Boolean,
      default:true
    },
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    setClass(index) {
      switch (index) {
        case this.curIndex:
          return "active";
        case this.prevIndex:
          return "prev";
        case this.nextIndex:
          return "next";
      }
    },
    autoplay() {
      if (this.timer) {
        return;
      }
      this.timer = setInterval(this.play, 3000);
    },
    play() {
      this.curIndex++;
      if (this.curIndex >= this.list.length) {
        this.curIndex = 0;
      }
    },
    hidden(index) {
      if (index === this.prevIndex || index === this.nextIndex) {
        return true;
      }
    },
    changeCurIndex(index) {
      clearInterval(this.timer);
      this.curIndex = index;
      this.timer = setInterval(this.play, 3000);
    },
    changePrev() {
      clearInterval(this.timer);
      this.curIndex--;
      if (this.curIndex < 0) {
        this.curIndex = this.list.length - 1;
      }
      this.timer = setInterval(this.play, 3000);
    },
    changeNext() {
      clearInterval(this.timer);
      this.curIndex++;
      if (this.curIndex >= this.list.length) {
        this.curIndex = 0;
      }
      this.timer = setInterval(this.play, 3000);
    },
    isActive(index) {
      if (this.curIndex === index) {
        return true;
      }
    }
  },
  mounted() {
    this.autoplay();
  },
  watch: {},
  computed: {
    prevIndex() {
      return this.curIndex === 0 ? this.list.length - 1 : this.curIndex - 1;
    },
    nextIndex() {
      return this.curIndex === this.list.length - 1 ? 0 : this.curIndex + 1;
    }
  }
};
</script>
<style lang="less">
@import "//at.alicdn.com/t/font_1840920_pdv42sjzi39.css";
.swiper-container {
  // position: relative;

  min-width: 720px;
  width: 100%;
  height: 250px;


  .swiper-wrapper {
    max-width: 1200px;
    position: relative;
    width: 100%;
    height: 230px;
    // overflow: hidden;
    // perspective: 800;
    margin: 0 auto;
    transform-style: preserve-3d;
    .swiper-slide {
      position: absolute;
      left: 50%;
      width: 70%;
      height: 100%;
      transition: all 0.5s ease-in-out;
      transform: translate3d(-50%, 0, 0px) scale(0.93);
      transform-origin: 0 100%;
      text-align: center;

      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
      }
      img {
        position: relative;
        width: 100%;
        height: 100%;
         &[lazy="loading"]{
           position: absolute;
           left: 50%;
           top: 50%;
           transform: translate(-50%,-50%);
        width: 100px;
        height: 100px;
      }
      }
     
      &.active {
        transform: translate3d(-50%, 0, 100px);
      }
      &.prev {
        transform: translate3d(-65%, 0, 0px) scale(0.93);
      }
      &.next {
        transform: translate3d(-28%, 0, 0px) scale(0.93);
      }
    }
    .btns {
      .btn {
        position: absolute;
        top: 50%;

        // transform: translate3d(0,-50%,0);
        font-weight: bolder;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.4);
        opacity: 0;
      }
      .swiper-button-prev {
        left: 9%;
      }
      .swiper-button-next {
        right: 9%;
      }
    }

    &:hover {
      .btns .btn {
        opacity: 1;
      }
    }
  }
  .swiper-pagination {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    .dot {
      width: 25px;
      height: 4px;
      margin: 0 5px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.5);
      &.active {
        background-color: #c62f2f;
      }
    }
  }
}
</style>