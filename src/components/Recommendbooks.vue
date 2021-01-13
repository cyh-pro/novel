<template>
  <div class="remmendBook">
    <div class="listbox">
      <div class="rembooks">
        <h3>你可能感兴趣的小说</h3>
        <!-- <span>更多</span> -->
      </div>
    </div>
    <div class="books">
      <ul class="lis">
        <li
          class="li"
          v-for="(item, index) in this.remmendBooks"
          :key="index"
          @click="$router.push('/book/' + item._id)"
        >
          <img :src="`http://statics.zhuishushenqi.com${item.cover}`" alt="" />
          <span class="title">{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      remmendBooks: null
    };
  },
  created() {
    this.getRem();
  },
  watch: {
    $route(to, from) {
      // console.log(to, from);
      // 路由发生变化页面刷新
      if (to.params.id != from.params.id) {
        this.$router.go(0);
      }
    }
  },
  methods: {
    getRem() {
      this.axios
        .get("http://novel.kele8.cn/recommend/" + this.$route.params.id)
        .then(res => {
          console.log(res);

          this.remmendBooks = res.data.books;
        });
    }
  }
};
</script>

<style scoped lang='less'>
.rembooks {
  display: flex;
  padding: 0 17px;
  justify-content: space-between;
  align-items: center;
}
.books {
  padding: 0 10px;
  ul {
    display: flex;
    width: calc(100%-20px);
    justify-content: space-between;
    flex-wrap: nowrap;
    box-sizing: border-box;
    overflow: scroll;
    li {
      flex: 0 0 85px;
      text-align: center;
      

      img {
        width: 65px;
        height: 83px;
        border-radius: 0;
      }
      .title {
        max-width: 80px;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        vertical-align: center;
      }
    }
  }
}
</style>