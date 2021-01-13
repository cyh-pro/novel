<template>
  <div ref="moretop" class="more-top">
    <GeneralHeader title="查看更多" />
    <ListItem
      v-for="book in this.$route.params.booklists.slice(0, 20)"
      :key="book._id"
      :book="book"
    >
      <template #authorInfo>
        <span plain class="booknum">{{ book.minorCate }}</span>
        <span class="line">|</span>
        <span class="count">{{ book.latelyFollower | filterCount }}</span
        ><span>人气</span>
      </template>
    </ListItem>
  </div>
</template>

<script>
import ListItem from "@/components/ListItem.vue";
import GeneralHeader from "@/components/GeneralHeader.vue";
export default {
  data() {
    return {
      // booklists: this.$route.params.booklists
    };
  },
  created() {
    window.scrollTop = 0;
  },
 
  components: {
    ListItem,
    GeneralHeader
  },
  filters: {
    filterCount(n) {
      return (n / 10000).toFixed(1) + "万";
    }
  }
};
</script>

<style >
.more-top {
  position: absolute;
  top: 0;
   width: 100%;
   height: 100%; 
  overflow-y: auto; 
}
</style>