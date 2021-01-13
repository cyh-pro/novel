<template>
  <div>
    <GeneralHeader title="阅读记录" />
    <van-grid :column-num="2">
      <van-grid-item icon="like-o" text="我的书架" to="/Bookrack" />
      <van-grid-item
        icon="home-o"
        text="阅读记录"
        to="/Bookhistory"
        class="home-o"
      />
    </van-grid>
    <div class="bookracks">
      <selfBook
        v-for="(bookInfo, index) in bookss"
        :key="index"
        :bookInfo="bookInfo"
      >
        <template #timenow>
          <div>
            <!-- <span>{{ bookInfo.cat }}</span> -->
          </div>
        </template>
      </selfBook>
    </div>

    <div class="gobooks">
      <span>逛逛书城</span>
    </div>
    <Bottom></Bottom>
  </div>
</template>

<script>
import selfBook from "@/views/selfBook.vue";
import Bottom from "@/components/Bottom.vue";

export default {
  components: {
    selfBook,
    Bottom
  },
  data() {
    return {
      bookInfo: null,
      bookss: []
    };
  },

  beforeRouteEnter(to, from, next) {
    // console.log(to);
    var bookself = JSON.parse(window.localStorage.getItem("bookself")) || {};
    // console.log(Object.keys(bookself));
    // var _this = this;
    // console.log(this)

    next(vm => {
      Object.keys(bookself).forEach(element => {
        // console.log(element);
        if (bookself[element]) {
          vm.axios
            .get("http://novel.kele8.cn/book-info/" + element)
            .then(res => {
              //  console.log(res);
              var bookinfo = res.data;
              bookinfo["aa"] = bookself[element].bookindex;
              vm.bookss.push(bookinfo);
            });
        }
      });
    });
  }
};
</script>

<style scoped lang='less'>
.home-o {
  color: red;
}
.bookracks {
  min-height: 350px;
}
.gobooks {
  padding: 0 17px;
  background: #f4f4f4;
  box-sizing: border-box;

  text-align: center;
  line-height: 50px;
  span {
    width: 100%;
    height: 50px;
    display: block;
    border-bottom: 1px solid rgba(153, 153, 153, 0.3);
  }
}
</style>