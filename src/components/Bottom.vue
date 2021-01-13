<template>
  <div class="bottom-section">
    <div></div>
    <div class="box">
      <ul>
        <li @click="$router.push('/category')">
          <b> 分类</b>
        </li>
        <li>
          <b @click="RouteF"> 书架</b>
        </li>
        <li>
          <b> 联系我么</b>
        </li>
      </ul>
      <span>学校 广州大学华软软件学院 </span>
      <span>电话：134359689X</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
      RouteF(){
          if(this.$route.name!=='Bookrack'){
                    this.$router.push('/bookrack')
          }
      }
  },        
};
</script>

<style  lang='less'>
.bottom-section {
  background: #f4f4f4;
  width: 100%;
  text-align: center;
}
.box {
  ul {
    padding: 16px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    li {
      flex: 1;
      border-right: 1px solid #999;
      &:nth-child(3) {
        border-right: none;
      }
    }
  }
  span {
    color: #999;
    display: block;
    padding: 16px 16px 0;
  }
}
</style>