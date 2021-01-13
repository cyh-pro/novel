<template>
  <div>
    <!-- Read {{ $route.params.id }} -->
    <div
      class="contents"
      ref="dvtop"
      :style="{ fontSize: value + 'px' }"
      @scroll="orderScroll"
    >
      <h3 class="content-title" ref="title">{{ con.title }}</h3>
      <div @click="clickF">
        <article class="read-content">
          <div
            style="white-space: pre-wrap;"
            class="aa"
            v-for="(item, i) in con.cpContent"
            :key="i"
            ref="content"
          >
            <p v-html="item.trim()">{{ con.cpContent }}</p>
          </div>
        </article>
      </div>
    </div>

    <div class="opp" v-show="this.isShow" @click.stop="clickF">
      <transition
        name="custom-classes-transition"
        enter-active-class="animate__animated animate__slideInUp"
        leave-active-class="animate__animated animate__slideOutDown"
      >
        <div class="up">
          <van-nav-bar
            class="nav"
            title="标题"
            left-text="返回"
            left-arrow
            @click-left="$router.back(-1)"
          >
          </van-nav-bar>
        </div>
      </transition>

      <transition
        enter-active-class="animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOut"
        :duration="{ enter: 200, leave: 400 }"
      >
        <div class="bottom">
          <div class="item1">
            <span class="btn font-btn-w">Aa-</span>
            <van-slider
              v-model="value"
              @change="onChange"
              active-color="#ee0a24"
              inactive-color="#b2b2b2"
              :min="11"
              :max="30"
              button-size="20"
              :step="1"
              default-value="16"
            >
            </van-slider>
            <span class="btn font-btn-w">Aa+</span>
          </div>

          <div class="item2">
            <span @click="defaultColor" :class="{ active: num == 0 }"
              >默认</span
            >
            <span @click="darkColor" :class="{ active: num == 1 }">夜间</span>
            <span @click="protectionColor" :class="{ active: num == 2 }"
              >护眼</span
            >
          </div>
          <div class="item3">
            <span @click="beforePage">上一章</span>
            <span @click.stop="clickMU">目录</span>
            <span @click="nextPage">下一章</span>
          </div>
        </div>
      </transition>
    </div>
    <div class="muLU" v-show="flag" @click="cliFn">
      <Chapter class="Chapter" @readShow="readshows"></Chapter>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "vant";
import Chapter from "@/views/Chapter.vue";

export default {
  data() {
    return {
      flag: false,
      isShow: false,
      content: [],
      loading: false,
      finished: false,
      con: [],
      value: 16,
      booklinkss: [],
      booktitle: [],

      iss: 0,
      isBottom: true,
      id: this.$route.params.id,
      num: 0
    };
  },
  components: {
    Chapter
  },
  computed: {
    ...mapState(["chapter"])
  },

  created() {
    this.getMulu();
  },

  methods: {
    onChange(value) {
      Toast("当前值：" + value);
      // this.$refs.dvtop.style.fontSize = value+'px';
    },
    defaultColor() {
      this.num = 0;
      this.$refs.dvtop.style.background = "#eee6dd";
    },
    darkColor() {
      this.num = 1;
      this.$refs.dvtop.style.background = "#0c0c0c";
      this.$refs.dvtop.style.color = "#666666";
    },
    protectionColor() {
      this.num = 2;
      this.$refs.dvtop.style.background = "#b8cd8d";
      this.$refs.dvtop.style.color = "#324d35";
    },

    cliFn() {
      this.flag = !this.flag;
    },
    clickF() {
      this.isShow = !this.isShow;
      this.flag = false;
    },
    clickMU() {
      this.flag = !this.flag;
      this.isShow = !this.isShow;
    },
    getMulu() {
      this.booklinkss = [];
      this.booktitle = [];
      var bookindexs = JSON.parse(
        window.localStorage.getItem("bookindex") || "{}"
      ); //章节位置
      console.log(bookindexs);
      var book = JSON.parse(window.localStorage.getItem("book"));
      console.log("book", book);
      book.chapters.forEach(element => {
        // this.axios
        //   .get(
        //     "http://novel.kele8.cn/chapters/" + encodeURIComponent(element.link)
        //   )
        //   .then(res => {
        //     // console.log(res.data);
        //     this.content = res.data.chapter;
        //   });
        // console.log(element.link.replace(/^yuewen/gi, ""))
        this.booklinkss.push(encodeURIComponent(element.link));
        this.booktitle.push(element.title);
      });

      this.iss =
        bookindexs && bookindexs[book.book]
          ? bookindexs[book.book].bookindex
          : this.iss;
      this.getcontent(this.booklinkss[this.iss]);
    },
    getcontent(link) {
      var content = [];
      this.axios.get("http://novel.kele8.cn/chapters/" + link).then(res => {
        if (res.status == 200) {
          var datas = res.data.chapter;
          //  console.log(datas);

          content.push({
            // cpContent: datas.cpContent ? datas.cpContent.trim().split("\n") : datas.body.trim().split("\n"),
            cpContent: datas.isVip
              ? ["vip章节，请购买VIP"]
              : datas.cpContent
              ? datas.cpContent.trim().split("\n")
              : datas.body.trim().split("\n"),
            title: datas.title
          });
          this.con = content[0];
        }
      });
    },
    //   上一章
    beforePage() {
      this.$refs.dvtop.scrollTop = 0;
      if (this.iss <= 0) {
        Toast("已经是第一章了");
        return;
      }
      this.iss--;
      this.getBookindex();
      this.getcontent(this.booklinkss[this.iss]); // 内容是根据目录来的 所以this.getmulu  然后将源id传给目录 默认第一个源
    },
    //   下一章
    nextPage() {
      this.$refs.dvtop.scrollTop = 0;
      if (this.iss >= this.booktitle.length - 1) {
        Toast("已经是第最后一章了");
        return;
      }
      this.iss++;
      this.getBookindex();
      this.getcontent(this.booklinkss[this.iss]);
    },
    //缓存章节位置
    getBookindex() {
      var bookindex = JSON.parse(
        window.localStorage.getItem("bookindex") || "{}"
      );
      var book = JSON.parse(window.localStorage.getItem("book"));
      bookindex[book.book] = {
        bookindex: this.iss
      };
      window.localStorage.setItem("bookindex", JSON.stringify(bookindex));
    },

    readshows(index) {
      // console.log(111111, index);
      this.iss = index;
      this.getBookindex();
      this.getcontent(this.booklinkss[this.iss]);
      this.$refs.dvtop.scrollTop = 0;
    },

    // 加载更多
    orderScroll() {
      let a = this.$refs.dvtop.scrollHeight;
      let b = this.$refs.dvtop.clientHeight;
      let c = this.$refs.dvtop.scrollTop;
      // console.log("滚动条" + a);
      // console.log("可视区" + b);
      // console.log("距离顶部" + c);

      if (b + c == a) {
        this.isBottom=true
        if (this.isBottom) {
          setTimeout(() => {
            this.iss++;
            this.getBookindex();
            this.getcontent(this.booklinkss[this.iss]);
             this.$refs.dvtop.scrollTop = 0;
            this.isBottom = false;
          }, 1000);
        }
      } else {
        return;
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    console.log("to", to);
    var book = JSON.parse(window.localStorage.getItem("book"));
    console.log(book.book);

    var bookself = JSON.parse(window.localStorage.getItem("bookself")) || {};
    if (to.name == "Detail"||to.name == "Bookrack"||to.name == "Bookhistory") {
      if (bookself && bookself[book.book]) {
        bookself[book.book].bookindex = this.iss;
      } else {
        bookself[book.book] = {
          bookId: book.book,
          bookindex: this.iss,
          isenter: false
        };
      }

      window.localStorage.setItem("bookself", JSON.stringify(bookself));
    next();
    }else{
      next()
    }
  },
  mounted() {
    window.addEventListener("scroll", this.orderScroll);
  },

  destroyed() {
    window.removeEventListener("scroll", this.orderScroll);
  }
};
</script>

<style scoped lang='less'>
.muLU {
  overflow: scroll;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  .Chapter {
    width: 80%;
  }
}
.opp {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;

  .up {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 21;
    width: 100%;
    transition: all 0.2s ease;
    color: white;
    .van-nav-bar {
      background-color: rgba(50, 51, 52, 0.9);
      color: white;
      .van-nav-bar__text {
        color: #fff;
      }
      .van-nav-bar__title {
        color: #ffffff;
      }

      .van-nav-bar .van-icon {
        color: #fff;
      }
    }
    .van-nav-bar__text {
      color: #fff;
    }
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(3.2rem);
    opacity: 1;
    z-index: 21;

    width: 100%;
    height: 170px;
    padding: 10px 17px 0 17px;
    color: white;
    background-color: rgba(50, 51, 52, 0.9);
    transition: all 0.2s ease;
    box-sizing: border-box;
    .item1 {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .van-slider {
        width: 75%;
      }
      span {
        width: 25px;
        height: 25px;
        line-height: 25px;
      }
    }
    .active {
      border: 1px solid red;
      color: red;
    }
    .item2 {
      display: flex;
      margin-bottom: 10px;
      span {
        flex: 1;
        justify-content: center;
        text-align: center;
        border: 1px solid grey;
      }
    }
    .item3 {
      display: flex;
      span {
        flex: 1;
        justify-content: space-between;
        text-align: center;
      }
    }
  }
}
.contents {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #eee6dd;
  font-size: 16px;

  .content-title {
    margin: 0;
    font-weight: 400;
    // color: #333;
    padding: 0 17px;
    line-height: 1.5;
  }
  .read-content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    margin-bottom: 50px;

    .aa {
      // font-size: 16px;
      line-height: 1.5;
      padding: 0.26667rem 0.53333rem 0;
      text-align: justify;
      p {
        // font-size: inherit !important;
        line-height: 1.5;
        margin: 0.13333rem 0;
        text-indent: 2em;
        text-align: justify;
      }
    }
  }
}
</style>