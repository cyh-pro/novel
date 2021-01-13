<template>
  <div v-if="categories">
    <h4>男生</h4>
    <van-grid :column-num="3">
      <van-grid-item
        v-for="(value, index) in categories.male"
        :key="index"
        @click="clickRoute(value.name, 'male')"
      >
        <b>{{ value.name }}</b>
        <span>{{ value.bookCount }}</span>
      </van-grid-item>
    </van-grid>
    <h4>女生</h4>
    <van-grid :column-num="3">
      <van-grid-item
        v-for="(value, index) in categories.female"
        :key="index"
        @click="clickRoute(value.name, 'female')"
      >
        <b>{{ value.name }}</b>
        <span>{{ value.bookCount }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: null
    };
  },
  created() {
    this.axios.get("http://novel.kele8.cn/categories").then(res => {
      // console.log(res);
      this.categories = res.data;
    });
    this.axios.get("http://novel.kele8.cn/sub-categories").then(res => {
      console.log(res.data);
      this.$store.commit("minsCategory", res.data);
    });
  },
  methods: {
    clickRoute(name, type) {
      var params = { "gender": type, "major": name };
      // window.localStorage.setItem("param", JSON.stringify(params));
      this.$router.push({
        name: "CategoryMajor",
        params
      });
    }
  }
};
</script>

<style lang='less'>
h4 {
  color: #999;
}
.van-grid-item__content {
  padding: 7px 0;
}
</style>