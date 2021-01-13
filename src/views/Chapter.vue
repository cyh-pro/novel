<template>
  <div class="list">
    <GeneralHeader title="优质书源" v-if="this.name == 'Chapter'" />
    <div class="sort-p">
      <span>共{{ this.list.length }}章</span>
      <span @click="sortFn">
        <span v-if="flag">倒序</span>
        <span v-else>正序</span>
      </span>
    </div>

    <ul>
      <li
        v-for="(item, index) in this.list"
        :key="index"
        @click="getMulu(item.order - 1)"
      >
        {{ item.title.replace(/全部章节||(\s) /gi, "").trim() }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      list: [],
      flag: false,
      id: this.$route.params.id,
      name: this.$route.name
    };
  },
  computed: {
    ...mapState(["chapter"])
  },
  created() {
    if (this.chapter) {
      this.list = this.chapter.chapters;
    } else {
      var chapter1 = JSON.parse(window.localStorage.getItem("book") || "{}");
      // console.log("localstorage", chapter1);
      this.list = chapter1.chapters;
    }
    // console.log(this.$route.name)
  },

  methods: {
    sortFn() {
      this.flag = !this.flag;
      this.list.reverse();
    },
    getMulu(i) {
      // console.log(i);
      this.$emit("readShow", i); //将点击的章节传给父组件 read.vue
      // console.log(this.$route);
      if (this.$route.name == "Chapter") {
        this.$router.push({ name: "Read" });
        var bookindex = JSON.parse(
          window.localStorage.getItem("bookindex") || "{}"
        ); //章节位置
        if (this.chapter) {
          bookindex[this.chapter.book] = {
          bookindex: i
        };
        } else {
          var book = JSON.parse(
            window.localStorage.getItem("book") || "{}"
          );
         bookindex[book.book] = {
          bookindex: i
        };
        }
        // bookindex[this.chapter.book] = {
        //   bookindex: i
        // };
        window.localStorage.setItem("bookindex", JSON.stringify(bookindex));
      }
    }
  }
};
</script>

<style scoped lang='less'>
.list {
  position: fixed;
  overflow: scroll;
  height: 100%;
  width: 100%;
  background: white;
  ul {
    li {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>