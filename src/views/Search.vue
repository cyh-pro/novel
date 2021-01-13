<template>
  <div>
    <GeneralHeader :title="something" />
    <div class="search">
      <div class="inputcover">
        <i class="svg-srch"></i>
        <input
          class="input"
          type="text"
          @keyup.enter="clickFn(something)"
          v-model.trim="something"
          placeholder="搜索喜欢的小说"
          ref="input"
        />
        <i class="svg-right" @click="clearFn">x</i>
      </div>
      <div class="sure">确定</div>
    </div>

    <div v-if="something" class="recom " v-show="condition">
      <h3 class="title">搜索" {{ something }} "</h3>

      <van-list
        v-if="searchD"
        finished-text="没有更多了"
     
      >
        <van-cell
          v-for="(item, index) in searchD"
          :key="index"
          :title="item.title"
          @click="clickFn(item.title, item._id)"
        />
      </van-list>
    </div>

    <div v-if="!something" class="m-hotlist">
      <div class="hotSkey">
        <h2 class="h3">热门搜索</h2>
        <span @click="changess" class="icon icon1">换一批 <i></i></span>
      </div>
      <ul class="list">
        <li v-for="(item, index) in currentRecommends" :key="index">
          {{ item.id }}
        </li>
      </ul>
    </div>
    <div v-if="!something" class="m-hotlist">
      <div class="hotSkey">
        <h2 class="h3">历史记录</h2>
        <span @click="delFn" class="icon icon2">删除 <i></i></span>
      </div>

      <ul class="list">
        <li v-for="(item, index) in hisDatas" :key="index" class="item">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      something: "",
      condition: true,
      recommendsIndex: 0,
      hisDatas: [],
      searchD: [],
      list: [],
      loading: false,
      finished: false,
      recommends: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
        { id: 12 },
        { id: 13 },
        { id: 14 },
        { id: 15 },
        { id: 16 },
        { id: 17 }
      ]
    };
  },
  computed: {
    currentRecommends: function() {
      return this.recommends.slice(
        this.recommendsIndex * 5,
        (this.recommendsIndex + 1) * 5
      );
    },
    searchDateS: function() {
      return this.searchD.slice(0, 10);
    }
  },
  created() {
    this.getHistory();
  },
  watch: {
    something: function(n) {
      console.log(n, "something==");
      if (n) {
        this.adebounce(this.getSearch(), 3000);
      }
    }
  },
  methods: {
    //记录历史搜索数据
    clickFn(n, id) {
      console.log(n);
      var searchBooks =
        JSON.parse(window.localStorage.getItem("searchBooks")) || [];
      if (searchBooks && searchBooks.indexOf(n) === -1) {
        searchBooks.unshift(n);
      }
      window.localStorage.setItem("searchBooks", JSON.stringify(searchBooks));
      this.$router.push("/book/" + id);
      // this.clickFn=null
    },
    getHistory() {
      var searchBooks =
        JSON.parse(window.localStorage.getItem("searchBooks")) || [];
      this.hisDatas = searchBooks;
    },
    clearFn() {
      console.log("点击了");
      (this.something = ""), (this.searchD = []);
    },
    changess() {
      console.log("切换一批");
      var maxnum = Math.ceil(this.recommends.length / 6);
      console.log(maxnum);
      this.recommendsIndex =
        this.recommendsIndex >= maxnum ? 0 : this.recommendsIndex + 1;
    },
    delFn() {
      console.log("删除l");
      localStorage.removeItem("searchBooks");
      this.hisDatas = [];
    },
    getHotWord() {
    this.axios.get("https://novel.juhe.im/search-hotwords").then(res => {
      console.log(res);
    });
    },
    adebounce(fn, wait) {
      var timer = null;
      return function() {
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(fn, wait);
      };
    },
    
    getSearch() {
      if (this.something) {
        this.axios
          .get("http://novel.kele8.cn/search?keyword=" + this.something)
          .then(
            res => {
              console.log(res);
              this.searchD = res.data.books;
            },
            err => {
              //请求出错的处理函数

              return Promise.reject(err);
            }
          );
      }
    }
  }
};
</script>

<style scoped lang='less'>
.search {
  padding: 15px 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  .inputcover {
    position: relative;
    flex: 1;
    height: 30px;
    padding: 0 30px;
    box-sizing: border-box;
    background: #ebecec;
    border-radius: 30px;
    .svg-srch {
      position: absolute;
      left: 0;
      top: 9px;
      margin: 0 8px;
      vertical-align: middle;
      width: 13px;
      height: 13px;
      background: url("../assets/search.svg");
    }
    .svg-right {
      position: absolute;
      right: 0;
      top: 7px;
      margin: 0 8px;
      vertical-align: middle;
      width: 13px;
      height: 13px;
    }
    .input {
      width: 100%;
      height: 30px;
      line-height: 18px;
      background: rgba(0, 0, 0, 0);
      font-size: 14px;
      color: #333;
      border-radius: 0;
      border: 0;
      outline: 0;
    }
  }
  .sure {
    flex: 0 0 30px;
    font-size: 13px;
    padding: 5px 10px;
  }
}
.recom {
  padding: 15px 10px 0;
}
.m-hotlist {
  padding: 15px 10px 0;
  .hotSkey {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .h3 {
      margin: 0;
      padding: 0;
    }
    .icon1 {
      i {
        display: inline-block;
        height: 12px;
        width: 12px;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAnCAMAAABUv8o5AAAAjVBMVEX////8/P77+/34+Pr6+vz29viUlJaFhYf09PaIiIqPj5GKiozy8vSMjI6RkZPs7O7o6Ori4uTKysynp6mampyXl5nCwsTv7/Hl5ee7u72wsLKhoaOCgoTb293R0dPGxsienqDf3+HV1de4uLqtra+kpKbq6uy/v8G0tLapqaucnJ5/f4HNzc/W1ti9vb9Qf31QAAACK0lEQVQ4y+WU6bKbMAyFJeMF25gdQoDse3Lb93+8yr6X0LnJtNPf1QwMjD9LOgdh+A+Dicjf6RICAQEQ8T0ZcQAeVlH4Z2DsOxLTOoFZvFhQMgIj9g6jJZGt2qpJ5eladpy2eBxfMLHvG6eNVkrL4yZjxL1irLvUajT3YdjWRptmWVA+9oKJjVRpddjsimLfHuVDXgvmNX2LclDpdb2AiArFxc+7lsuMdMwApWawatx4OAt65ZzkLcrmUZcQ4YwhcuAHl95W7MvTCDBbprbKGYhZIiaQG1X/CM6Dx4gvbm5bwIz5XqAcbUV9UV66eZjhUtlLjr8lQ8ZutjlwSBh7YrCWuj/DjPmlRt4/Pr2cikJ3UkMC8dNXRrtTU+8gxCSB5ce03s1SYwQBcmxyakzg0xDrFPmdniYsoc1x5eQKWJidiFH+bONS87DSVhMmCAOSVYbxYV/t5SdnjVHyx4QFbXtlr3kY2TgKI5x81No43c9KOVKRrduuI7/lUxWLklY+dF/MGFWNcGNcX/gswGPBff3zUg4rwAlDwmI4D9r2+8XXR026XEBXrpMnxsJXAP5RjerUrrwlLG9vxx3wRPC5/yCBfFjXo5HDst20h8qq+xp4GKuXX2t/dKOWJpWpVrIS0ac33ynGu3ZrtNJW6+bSkax3GGCEmJV97ez2souBIbxiM/yXd2/WdGhw/qejxo+utzcOs/Q+iAnHQTKdMO8DQzYUVD7hfgop4F/jF16jG+TevfgUAAAAAElFTkSuQmCC);
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
    .icon2 {
      i {
        display: inline-block;
        height: 18px;
        width: 17px;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAoCAMAAABU4iNhAAAArlBMVEX////9/P+Qj5T5+fz7+v/4+Pv7+/2NjJH08/eTkpbe3uDKys2Lio6MjI/n5uv39/nT0tfHxsubm52WlZq6ub6Ghonu7vGTk5b29frz8vXw7/Ph4ePW1tnMy8+pqauJiI2ysbWlpamYmJuPj5LZ2dvT09XQ0NLOztDExMe/v8KhoKOIiIrb2929vMCurbKrqq+Wlpjq6uyjoqWdnKCEhIbl5eeXl5m2triAf4R+fYIt4g+bAAABxUlEQVQ4y+2TaW/bMAyGX1qWfCpunPqKj8TOfZ/ttv//x0ZnG7CtQj8U6LdS4AtJfChSEITPNAklSboQ9FgSXEk8FyaW6KFScly8c6ZiBIzQnxoMc5Iywj2lGHfdXynEbrAHxUKqDz9cChYjSRyJgm2y2yXXWnImjCQUKUHjRXZPui5JzlXBxY3gwN/v5/PDzInbpmlus2yz932/vPxTlUXIRofOTuv7tuz35q+evp+TcNe+IUVzzl7P3bapJISkYnWNdZzF8fT/6ygxr+rVMliWAkSkEM0X62WwqHy8QYGi4NP+LkRj1/SSKgpWzKlL2qel6Ri4rJamu0dlHFeR8KcHTooOz3slh/E2NaEvll4ptdaZgCgsb0G00V4Bg5XebAF8y0KCcnddQFjPsshE+s7oycazZdmEgeUFoKFluV/kB0l6GXlM1lmbg9I2rnLadJOxgRSl5z1JDIY1wc7rOgU2nWMiyddOJUF5znPk3AK/ppFEaU2Wrm3bILIFQcr8kMxSE5m2P+Lj8XSaHqdTllPbeN+vhQF03WA0mYTORIdas1hJEt5q2/jfB5ubwyiP37JdG9tEROj7owhkQ7LbkleELwN+AmK6JDKO8B81AAAAAElFTkSuQmCC);
        background-size: cover;
        background-position: -4px 3px;
        background-repeat: no-repeat;
      }
    }
  }
  .list {
    margin: 10px 0 7px;
  }
}
</style>