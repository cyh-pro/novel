<template>
  <div class="hotComment">
    <h3 class="comment-title">热门书评</h3>
    <ul class="commentbox">
      <li v-for="(item, index) in comments" :key="index" class="lis">
        <div class="comment">
          <img class="avater" :src="item.img" />
          <div class="right">
            <p class="name">{{ item.name }}</p>
            <p class="title">{{ item.title }}</p>
            <p class="score">
              <i class="star-full"></i> <i class="star-full"></i>
              <i class="star-full"></i> <i class="star-full"></i>
              <i class="star-full"></i>
            </p>
            <p class="content">
              {{ item.content }}
            </p>
            <p class="love">
              <span>{{ item.updatetime }}</span>
              <span class="sco">{{ item.sco }}</span>
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: []
    };
  },
  created() {
    this.axios.get("/comments.json").then(response => {
      this.comments = response.data.comment;
    });
  }
};
</script>

<style scoped lang='less'>
.hotComment {
  background: #fff;
  margin-bottom: 0.26667rem;
  padding: 0 17px;
  box-sizing: border-box;

  .comment-title {
    height: 1.06667rem;
    line-height: 1.06667rem;
    font-size: 14px;
    font-weight: 400;
  }
  .commentbox {
    .lis {
      margin-bottom: 15px;
      .comment {
        position: relative;
        .avater {
          position: absolute;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 5px;
        }
        .right {
        padding-left: 35px ;
          box-sizing: border-box;
          p {
            margin: 0;
            padding: 0;
          }
          .name {
            height: 15px;
            line-height: 13px;
            color: #a58d5e;
            font-size: 12px;
          }
          .title {
            line-height: 17px;
            font-weight: 700;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #000;
          }
          .score {
            height: 15px;
            padding: 0.17333rem 0;
            font-size: 0;
            i {
              display: inline-block;
              vertical-align: middle;
              width: 10px;
              height: 10px;
              background: url(data:image/png;base64,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)
                50% no-repeat;
              background-size: 80%;
              background-repeat: no-repeat;
              background-position: 0;
            }
          }
          .content {
            height: 51px;
            line-height: 17px;
            overflow: hidden;
            text-align: justify;
            color: #999;
            overflow: hidden;
          }
          .love {
            color: #999;
            padding-top: 5px;
            height: 20px;
            overflow: hidden;
            .sco {
              float: right;
            }
          }
        }
      }
    }
  }
}
</style>