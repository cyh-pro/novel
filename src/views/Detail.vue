<template>
  <div>
    <GeneralHeader title="书籍详情" />

    <div v-if="bookInfo">
      <van-card
        :lazy-load="true"
        :title="bookInfo.title"
        :thumb="`http://statics.zhuishushenqi.com${bookInfo.cover}`"
      >
        <template #desc>
          <span class="desc-author">{{ bookInfo.author }}</span>
          <span class="line">|</span>
          <span>{{ bookInfo.cat }}</span>
          <span class="line">|</span>
          <span>{{ bookInfo.wordCount | wordNum }}</span>
          <span class="timea">{{ timea }}</span>
        </template>
      </van-card>

      <van-row>
        <van-col span="8" offset="2">
          <van-button type="default" v-if="!this.flag" @click="enterSelf"
            >加入书架
          </van-button>
          <van-button type="default" v-else @click="leaveSelf"
            >撤出书架
          </van-button></van-col
        >
        <van-col span="8" offset="4" type="info">
          <van-button
            type="info"
            color="#b93321"
            hairline
            @click="$router.push(`/book/${$route.params.id}/read`)"
            >开始阅读</van-button
          ></van-col
        >
      </van-row>
      <div class="detail-info">
        <van-row>
          <van-col span="8">追人气</van-col>
          <van-col span="8">读者留存率</van-col>
          <van-col span="8">日更字数/天</van-col>
        </van-row>
        <van-row>
          <van-col span="8">{{ bookInfo.latelyFollower | countN }}</van-col>
          <van-col span="8">{{ bookInfo.retentionRatio + "%" }}</van-col>
          <van-col span="8">{{ bookInfo.serializeWordCount }}</van-col>
        </van-row>
      </div>
      <div class="introduction">
        <p v-bind:class="{ active: isActive }" style=" user-select: text;">
          {{ bookInfo.longIntro }}
        </p>
        <span class="arrow" @click="clickFn" :class="{ up: isActive }"></span>
      </div>
      <div
        class="detail-catalog clearfix"
        @click="$router.push(`/book/${$route.params.id}/chapter`)"
      >
        <span>目录</span>
        <i class="arrow"></i>
        <span class="timea"
          >[ {{ timea }} ] &nbsp;&nbsp; {{ bookInfo.lastChapter }}</span
        >
      </div>
    </div>

    <Comments v-if="bookInfo"></Comments>

    <Recommendbooks v-if="bookInfo"></Recommendbooks>
  </div>
</template>

<script>
import Comments from "@/components/Comments.vue";
import Recommendbooks from "@/components/Recommendbooks.vue";

export default {
  data() {
    return {
      isActive: false,
      bookInfo: null,
      time: null,
      flag: false,
      nums: 0
    };
  },
  components: {
    Comments,
    Recommendbooks
  },
  filters: {
    wordNum(v) {
      return parseInt(v / 10000) + "万字";
    },
    countN(v) {
      return (v / 10000).toFixed(1) + "万";
    }
  },

  computed: {
    timea() {
      let arr = "";
      if (this.bookInfo.updated) {
        var d, h, m;
        var now = new Date();
        var deadline = new Date(this.bookInfo.updated);
        var second = (now - deadline) / 1000;
        if (second < 0) return;
        (d = Math.floor(second / (60 * 60 * 24))), //计算天数
          (h = Math.floor((second / (60 * 60)) % 24)), //计算小时数
          (m = Math.floor((second / 60) % 60)), //计算分钟数
          console.log(d, m, h);
        if (d > 0) {
          arr = d + "天前更新";
        } else if (h > 0) {
          arr = h + "小时前更新";
        } else {
          arr = m + "分钟前更新";
        }
        // console.log(arr);
      }
      return arr;
    }
  },

  // watch: {
  //   $route(to, from) {
  //     console.log(to, from);
  //     // 路由发生变化页面刷新
  //     this.$router.go(0);
  //   }
  // },

  methods: {
    clickFn() {
      this.isActive = !this.isActive;
    },
    getTime(a) {
      var d, h, m;
      var now = new Date();
      var deadline = new Date(a);
      var second = (now - deadline) / 1000;
      if (second < 0) return;
      (d = Math.floor(second / (60 * 60 * 24))), //计算天数
        (h = Math.floor((second / (60 * 60)) % 24)), //计算小时数
        (m = Math.floor((second / 60) % 60)); //计算分钟数
      if (d > 0) {
        return d + "天前更新";
      } else if (h > 0) {
        return h + "小时前更新";
      } else {
        return m + "分钟前更新";
      }
    },
    enterSelf() {
      this.flag = !this.flag;
      var id = this.$route.params.id;
      var bookindex = JSON.parse(window.localStorage.getItem("bookindex"));
      var bookself = JSON.parse(
        window.localStorage.getItem("bookself") || "{}"
      );
      this.nums =
        bookindex && bookindex[this.bookInfo._id]
          ? bookindex[this.bookInfo._id].bookindex
          : this.nums;
      bookself[this.bookInfo._id] = {
        bookId: id,
        bookindex: this.nums,
        isenter: this.flag
      };
      window.localStorage.setItem("bookself", JSON.stringify(bookself));

      console.log(this.flag);
    },
    leaveSelf() {
      this.flag = !this.flag;

      var bookself = JSON.parse(window.localStorage.getItem("bookself"));
      bookself[this.bookInfo._id].isenter = this.flag;

      window.localStorage.setItem("bookself", JSON.stringify(bookself));
    }
  },

  beforeRouteEnter(to, from, next) {
    window.axios
      .get("http://novel.kele8.cn/book-info/" + to.params.id)
      .then(res => {
        next(vm => {
          vm.bookInfo = res.data;
          var bookself = JSON.parse(window.localStorage.getItem("bookself"));
          vm.flag =
            bookself && bookself[vm.bookInfo._id]
              ? bookself[vm.bookInfo._id].isenter
              : vm.flag;
          console.log(vm.flag);
          // window.localStorage.setItem("bookinfo", JSON.stringify(res.data));
        });
      });

    // http://novel.kele8.cn/recommend/5d020a2e035a4416960fd2f1
  },
  beforeRouteUpdate: function(to, from, next) {
    // http://novel.kele8.cn/book-info/:id
    // console.log(to);
    next();
  },

  beforeRouteLeave(to, from, next) {
    // ...

    if (to.name == "Read" || to.name == "Chapter") {
      console.log("获取章节");

      // 获取书籍源
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

              this.$store.commit("updateChapter", res.data);
              next();
            });
        });
    } else {
      next();
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
    padding: 2px 0;
    color: #b4a8b0;
  }
  .line {
    color: #989898;
    display: inline-block;
    height: 14px;
    line-height: 14px;
    margin: 0 5px;
  }
  span.timea {
    display: block;
  }
}
.van-row {
  .van-col {
    text-align: center;
  }
}
.detail-info {
  padding: 18px 0;
  border-bottom: 1px solid #ebebeb;
  .van-row {
    .van-col {
      text-align: center;
    }
    &:first-of-type {
      font-size: 12px !important;
    }
  }
}
.introduction {
  position: relative;
  padding: 17px;
  background: #fff;
  p {
    line-height: 21px;
    font-size: 13px;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    transition: all 0.4s ease;
  }
  .active {
    height: auto !important;
    overflow: auto !important;
    display: block !important;
  }
  .arrow {
    position: absolute;
    width: 18px;
    height: 18px;
    bottom: 27px;
    right: 8px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAENklEQVR4Xu3dzW0TURTF8feClHXowIvYYukFyTolQAWYEqgASoAKCB3QAVnHkWAb2xIpwTTghybgKB8zztzxfNx3zvEO8oJ87//Hk5PNxKAX9QYi9fQaPggAOQIBEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4z+5ASaT03cxpVmKcb3ZbL6sVlcX5DvKdvyiZQjhzf8Bvi0Wl98fD/MAwGR88jXGOLt/aJPS++Vyfp7tFkjfeFnLsNl8uF5dfb6/kjsA4/HJ9CDGn2X7EoK8FJXGDyGklNaL5fxlKYDj49dnLw4OflSNKgR5IKiKv33314vLB7f+3R9ejaajdHj4e9eYQuAbwXPxU0p/Fsv5UekNUPzlZHL6KYbwUQh8hy57d8/FL74nhfD28QfBpz8FjE/OY4zFp8fKl24CX0DqxK9qVvqLoIkQ+Cq8493sE7/4Zyt/EygE/g3sG38ngNvPBLoJ3CpoI/6zAITAZ/+24tcCIAS+ELQZvzYAIfCBoO34JgBCMCyCLuKbAQjBMAi6it8IgBD0i6DL+I0BCEE/CLqOvxcAIegWQR/x9wYgBN0g6Ct+KwCEoF0EfcZvDYAQtIOg7/itAhCC/RAMEb91AELQDMFQ8TsBIAQ2BEPG7wyAENRDMHT8TgEIwW4EHuJ3DkAIyhF4id8LACF4iMBT/N4ACME/BN7i9wqAHYHH+L0DYEXgNf4gANgQeI4/GAAWBN7jDwoAHUEO8QcHgIogl/guAKAhyCm+GwAoCHKL7wpA7ghyjO8OQK4Ico3vEkBuCHKO7xZALghyj+8agHcECPHdA/CKACV+FgC8IUCKnw0ALwjQ4mcFYGgEiPGzAzAUAtT4WQLoGwFy/GwB9IUAPX7WALpGwBA/ewBdIWCJDwGgbQRM8WEAtIWALT4UgH0RMMaHA9AUAWt8SABWBMzxYQHURRBSuggxnhXnq17oT0eBfnRsnecdMMeHvgG2YZsiQP+fv90P9A3QFAFLfIobwIqAKT4VgDofDNni0wHYhYAxPiWAWwT3npBaPE41xDgre7T6rp8QUL5G8SGwKtZoND26ufm1RonZZA5qAE0WhvY9AoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxHgEwLgztuACgFTXOIwDGhaEdFwC0osZ5BMC4MLTjAoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxnr+aEMOu5NitsQAAAABJRU5ErkJggg==)
      50% no-repeat;
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: 50%;
    transition: all 0.1s ease;
  }
  .up {
    transform: rotate(180deg);
  }
}
.detail-catalog {
  padding: 17px;
  position: relative;
  font-size: 14px;
  border-top: 1px solid #f4f4f4;
  span.timea {
    float: right;
    max-width: 60%;
    color: #999;
    font-size: 12px;
    word-break: break-all;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .arrow {
    float: right;
    width: 18px;
    height: 18px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAENklEQVR4Xu3dzW0TURTF8feClHXowIvYYukFyTolQAWYEqgASoAKCB3QAVnHkWAb2xIpwTTghybgKB8zztzxfNx3zvEO8oJ87//Hk5PNxKAX9QYi9fQaPggAOQIBEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4z+5ASaT03cxpVmKcb3ZbL6sVlcX5DvKdvyiZQjhzf8Bvi0Wl98fD/MAwGR88jXGOLt/aJPS++Vyfp7tFkjfeFnLsNl8uF5dfb6/kjsA4/HJ9CDGn2X7EoK8FJXGDyGklNaL5fxlKYDj49dnLw4OflSNKgR5IKiKv33314vLB7f+3R9ejaajdHj4e9eYQuAbwXPxU0p/Fsv5UekNUPzlZHL6KYbwUQh8hy57d8/FL74nhfD28QfBpz8FjE/OY4zFp8fKl24CX0DqxK9qVvqLoIkQ+Cq8493sE7/4Zyt/EygE/g3sG38ngNvPBLoJ3CpoI/6zAITAZ/+24tcCIAS+ELQZvzYAIfCBoO34JgBCMCyCLuKbAQjBMAi6it8IgBD0i6DL+I0BCEE/CLqOvxcAIegWQR/x9wYgBN0g6Ct+KwCEoF0EfcZvDYAQtIOg7/itAhCC/RAMEb91AELQDMFQ8TsBIAQ2BEPG7wyAENRDMHT8TgEIwW4EHuJ3DkAIyhF4id8LACF4iMBT/N4ACME/BN7i9wqAHYHH+L0DYEXgNf4gANgQeI4/GAAWBN7jDwoAHUEO8QcHgIogl/guAKAhyCm+GwAoCHKL7wpA7ghyjO8OQK4Ico3vEkBuCHKO7xZALghyj+8agHcECPHdA/CKACV+FgC8IUCKnw0ALwjQ4mcFYGgEiPGzAzAUAtT4WQLoGwFy/GwB9IUAPX7WALpGwBA/ewBdIWCJDwGgbQRM8WEAtIWALT4UgH0RMMaHA9AUAWt8SABWBMzxYQHURRBSuggxnhXnq17oT0eBfnRsnecdMMeHvgG2YZsiQP+fv90P9A3QFAFLfIobwIqAKT4VgDofDNni0wHYhYAxPiWAWwT3npBaPE41xDgre7T6rp8QUL5G8SGwKtZoND26ufm1RonZZA5qAE0WhvY9AoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxHgEwLgztuACgFTXOIwDGhaEdFwC0osZ5BMC4MLTjAoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxnr+aEMOu5NitsQAAAABJRU5ErkJggg==)
      50% no-repeat;
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: 50%;
    transform: rotate(-90deg);
  }
  .clearfix:before {
    content: "";
    display: table;
  }
}
</style>