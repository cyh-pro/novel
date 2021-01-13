<template>
  <div>
    <GeneralHeader title="分类书籍" />
    <van-skeleton title :row="5" :loading="loading">
      <template>
        <div>
          <van-tabs @click="onClick">
            <van-tab title="全部">
              <ListItem
                v-for="(book, index) in this.majorbooks"
                :key="index"
                :book="book"
              ></ListItem>
            </van-tab>
            <van-tab v-for="(item, index) in dataDs" :key="index" :title="item">
            </van-tab>
          </van-tabs>
          <ListItem
            v-for="(book, index) in this.databooks"
            :key="index"
            :book="book"
          ></ListItem>
        </div>
      </template>
    </van-skeleton>
  </div>
</template>

<script>
import ListItem from "@/components/ListItem.vue";
import GeneralHeader from "@/components/GeneralHeader.vue";
import { mapState } from "vuex";

export default {
  components: {
    GeneralHeader,
    ListItem
  },
  data() {
    return {
      type: this.$route.params.gender,
      major: this.$route.params.major,
      databooks: [],
      majorbooks: [],
      loading: false
    };
  },
  created() {
    this.getCategory();
  },

  computed: {
    ...mapState(["minsCategory"]),

    dataDs() {
      var arr = [];
      this.minsCategory[this.type].forEach(element => {
        if (element.major == this.major) {
          arr = element.mins;
        }
      });
      return arr;
    }
  },
  methods: {
    onClick(name, title) {
      this.databooks = [];
      this.majorbooks.map(e => {
        if (e.minorCate == title) {
          this.databooks.push(e);
        }
      });
    },
    getCategory() {
      this.loading = true;
      this.axios
        .get("http://novel.kele8.cn/category-info/", {
          params: {
            methods: "get",
            gender: this.type,
            major: this.major
            // major: this.$route.params.major
          }
        })
        .then(res => {
          this.majorbooks = res.data.books;
          this.loading = false;
        });
      // http://novel.kele8.cn/category-info?gender=male&type=hot&major=奇幻&minor=&start=0&limit=20
    }
  }
};
</script>

<style lang='less' scoped>
.tabbar {
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  li {
    flex: 1;
  }
}
</style>