<template>
  <li class="list-item" @click="$router.push('/book/' + book._id)">
    <van-card
      :lazy-load="true"
      :thumb="`http://statics.zhuishushenqi.com${book.cover}`"
      :desc="book.shortIntro"
      :title="book.title"
      centered
    >
    
      <template #price>
        <slot name="authorInfo" v-bind:book="book">
          <!-- <span plain class="booknum">{{ book.minorCate }}</span>
          <span class="line">|</span>
          <span class="count">{{ book.latelyFollower | filterCount }}</span
          ><span>人气</span> -->
          <span>{{ book.author }}</span>
        </slot>
      </template>
      <template #num>
        <van-tag size="mini" plain type="warning">{{ book.majorCate }}</van-tag>
      </template>
    </van-card>
  </li>
</template>

<script>
export default {
  props: ["book"]
};
</script>

<style lang="less" scoped>
.list-item {
  list-style: none;
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
    .van-card__content {
      .van-card__desc {
        max-height: 40px;
        white-space: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
    .van-card__price {
      .line {
        color: #989898;
        display: inline-block;
        height: 12px;
        line-height: 12px;
        margin: 0 5px;
      }
      .count {
        color: #dc9122;
      }
    }
  }
}
</style>