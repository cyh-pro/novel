<template>
  <div>
    <h3><slot></slot></h3>
    <ListItem
      v-for="book in booklists.books.slice(0, 4)"
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
    <div class="bot">
      <div class="more" :booklists="booklists" @click="$router.push({ name: 'Morebooklist', params: { booklists:booklists.books }})">
        查看更多<i class="arrow-right-red"></i>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from "@/components/ListItem.vue";

export default {
  props: ["booklists"],
  components: {
    ListItem
  },
  filters: {
    filterCount(n) {
      return (n / 10000).toFixed(1) + "万";
    }
  }
};
</script>

<style scoped lang='less'>
.bot{
  padding: 2px 16px;

  .more {
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  color: #b93321;
  border-bottom: #dddddd 1px solid;
  box-sizing: border-box;
  i {
    height: 12px;
    width: 12px;
    max-width: 12px;
    max-height: 12px;
    vertical-align: middle;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAEJklEQVR4Xu3dy1XbQBSA4ZlUQDpQB7HdADt8skpSQUIHpALogBJCB2FpZxPSALgDqwRY58TKEY8DGEnWY0aee+/PGizN/J8eHotj7/gxPQPe9OgZvAOAcQTJAfg9yQ7+evfh6Cb/Y7zNKMNPCsBylp0750/uR14Ut75w349W+cUoM2F0I8kAWM6yM+f86XYHvymOQRBPZzoAptmV8/6waqggMA6gHD4I4iBI5gywmGUn3vnzpmGCIDyCZACUQ1tOswvn/VcQhA9d94pJAQDBeOGftpQcABCMiyBJACAYD0GyAEAwDoKkAYAgPoLkAYAgLgIRAEAQD4EYACCIg0AUABCERyAOAAjCIhAJAAThEIgFAIIwCEQDAMFwBOIBgGAYAhUAQNAfgRoAIOiHQBUAEHRHoA4ACLohUAkABO0RqAUAgnYIVAMAwW4E6gGAoBmBCQAgqEdgBgAIqhGYAgCCtwjMAQDBawQmAYDgGYFZACB4QGAaAAgAcH8UWP6vZPNngKeroVUEAHhxU2wRAQC23hpbQwCAigUySwgAULNMbgUBABo+LLOAAAA7PjLXjgAAu5+ZUL1OAIAWADQvFgGgJQCtCADQAYBGBADoCEAbAgD0AKAJAQB6AtCCAAADAGhAAICBAKQjAEAAAJIRACAQAKkIABAQgEQEAAgMQBoCAEQAIAkBACIBkIIAABEBtEXgNsWX+Sq/jLwrlS8PgBFmfedDJUVxO7/J34+wK282AYCRZn0xzdbe+6xuc/Pr9V5a7GWjI815MptZzLIf3vlvDTt0N79eH+xjhwEQedZbxN/r1+ICICKA1OOXQwdAJAAS4gPAeHwARAAg5ch/GjqXgIAIpMXnDGA8PgACAZB45HMJIP79DHAPMACC5COfM8CA8OWfaojPGaAnAi3xAdADgKb4AOgIQFt8AHQAoDE+AFoC0BofAC0AaI4PgB0AtMcHQAMAC/EBUAPASnwAVACwFB8AWwCsxQfACwAW4wPgEYDV+ABQ9KleiyWNyl8x/TyA5SPf/PMAxH8gYPIMQPznq4E5AMR/fStgCgDx394HmgFA/Or3CSYAEL/+TaJ6AMRvXiFQDYD4u5eH1AIg/u74atcBiN8uvkoAxG8fXx0A4neLrwoA8bvHVwOA+P3iqwBA/P7xxQMg/rD4ogEQf3h8sQCIHya+SADEDxdfHADih40vCgDxw8cXA4D4ceKLAED8ePGTB0D8uPGTBkD8+PGTBUD8ceInCYD448VPDgDxx42fFIDlJPvs3vmfTVPgN8Xx0Sq/GH+a9G4xmYdCl9Psynl/WDfVxI+DUAQA4seJn9YlYJadOedPt4dK/HjxkwJQ7sximl167z89DvnOb4oTrvmGAJRD/TXJJv+cK79HN/+4yvO4w+fVk7kHIMV+ZgAA+5n3ZLb6H7/RWK5gVA+UAAAAAElFTkSuQmCC)
      50% no-repeat;
    background-size: contain;
  }
}
}
</style>