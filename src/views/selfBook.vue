<template>
  <div v-if="bookInfo" @click="pushRoute" class="selfbook">
    <van-card
      :lazy-load="true"
      :title="bookInfo.title"
      :thumb="`http://statics.zhuishushenqi.com${bookInfo.cover}`"
    >
      <template #desc>
        <span class="desc-author">{{ bookInfo.author }}</span>
        <slot name="timenow"> </slot>
        <span>阅读到第{{ bookInfo.aa + 1 }}章</span>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  props: ["bookInfo"],
  data() {
    return {
      flag: false
    };
  },
  methods: {
    pushRoute() {
      this.flag = false;
      this.axios
        .get(
          "http://novel.kele8.cn/book-sources?view=summary&book=" +
            this.bookInfo._id
        )
        .then(res => {
          // 根据书籍源id 获取 章节
          console.log("res", res);
          // console.log(res.data[0]._id);
          this.axios
            .get("http://novel.kele8.cn/book-chapters/" + res.data[0]._id)
            .then(res => {
              console.log(res.data);
              window.localStorage.setItem("book", JSON.stringify(res.data));
              this.flag = true;
              if (this.flag) {
                this.$router.push(`/book/${this.bookInfo._id}/read`);
                this.flag = false;
              }
              this.$store.commit("updateChapter", res.data);
            });
        });
    }
  }
};
</script>

<style scoped lang='less'>

  .van-card {
  .van-card__thumb {
    width: 60px;
    height: 80px;
    img {
      border-radius: 0;
    }
  }
  .van-card__title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .desc-author {
    color: #be6063;
  }
  span {
    display: block;
    padding: 2px 0;
    color: #b4a8b0;
  }
}

</style>