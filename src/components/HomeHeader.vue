<template>
  <div class="home-header">
    <van-nav-bar left-arrow>
      <template #left>
        <van-image
          width="75"
          height="18"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAToAAABIBAMAAACU8SQRAAAALVBMVEVHcEz////////////////////////////////////////////////////////NXt0CAAAADnRSTlMA4fGcFXjOJ7Q7WmlLh+5Ft9UAAAOBSURBVGje5ZpNaxNBGMfHJmnaWEPxIl5CDl68hIIHPZUIS/VUetBrqSAeQw5CPYUcRDwF8SaI5Oyh5C7I4lmkX0AwSV82L93PYLKZzO48u7M7MztP3OJz6TJMpj/+O/O8zRKytIYbtiPC2Q06PCYkx0+8IPH2fT6pTfStE0HXzgydGe344a6Ybs2bMFqnM89Jwfs73KID/WtAt3humnqzaekcAV22tUOh241Y1K0G6AjZ4OkI2bx+dBIWoBNZWjon03S42gH7T+iiTsXCtldI5+jTPaYDE2thT44DhqtdJ46u7CZZX3wqTn1v3EJ5s8l0Tqbpzs3QOTh0UxTtQAbV48a+yNOdZZqummm6Nsq+M0V3mmntuuHFbOqNY+gCR74Q6T8N0TVR6IBHEdCJ4ixbckAQ6eqadBuCghaJTjFHWRYt892sRidn6ejYfpxg0hFNutZyzkgxc19LPGaD9HQnyzl/EOnmTxUdukNYW2aKrgN7Grh0PbWqh22HA0S6vi4dW8vOIF2RrVVXrbb95o9nL2M8yoUmXSkUs5XobsGqRJMuOQugiEHXbsdVjHwz2Mu/8r5T65mnG9LlmpJ0ey6INDkXBkYmbCVd1UPLsijtBJGsyP7jwIbu031rnG4q0E5A95H98C7bxzWW89RN010qaRci4Ynv+3RDI3RVJe1Cb9F72+xgDLqG6Y5UtAufAM+e8s0FNqGWmm5HQbu8700eWpYV1bXaCdM981pfGlUP9Uay2u25CZn7Yjt6D1eMTrsmm9kHee02K8l07h1ZOmHvM7hmXV67H64E3cwNsh2oR5cDVZScdjddGbpZCElJtw76i9Jndl++uzjRpgvkaVdExd+1VkHX8unGJrRzjNL94gMZinbjJG8spPPj0aJolM7v9ldBtwsuJKXzOwW6qTZdgw9kqbVzjNIFfnWApd0oVK9I0hUD02ysfadNtwUCGYp2c2fg38e9tgIWX20XotqBpvfdpVw3LUyXgxdl0tqV1bTTolsHgUxeOwW6M126MghkKNrJ3TLF9T6X3U+gnfhrmbLCHaMu3QkIZFA7ZTqj2h2CQJZaO6N0HXiNh6FdX5euAQIZvBFI+kpL6jblXkeTDgYyFLrtUk2Lrii6xjNLR95o0ZVAmxeLjnz++u357weP3r96cbsm/2ZjPyK103+Vyt2FUMtbx59+Utp3M9p/RvcXlN2FjxlfktkAAAAASUVORK5CYII="
        />
      </template>
      <template #title>
        <van-button
          @click="$router.push('/?gender=male')"
          :class="{ active: gender === 'male' }"
          plain
          type="default"
          size="small"
          >男生</van-button
        >
        <van-button
          @click="$router.push('/?gender=female')"
          :class="{ active: gender === 'female' }"
          plain
          type="default"
          size="small"
          >女生</van-button
        >
      </template>
      <template #right>
        <van-icon
          @click="RouteF"
          name="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAKlBMVEVHcEz///////////////////////////////////////////////////+LBpLMAAAADXRSTlMApSzS4boSaI048EtBf5mWRgAAANhJREFUOMvV0z0KwjAYxvGItVqK4AWEro6CqyDSVRB3wQsI7iLoAQQv4OxBvIDgt/DexTchjX3gOYDN8ELz69D+Q4ypwornIicqLdG1YFKzkv2F9H57ySDPZ17S3VA6Qeq6dffS1TEK0tanq5eJjgcVTSRvKnsdTyobHS8qR/c1TJY6blQiOIuyNOw8MHHnt2LStHPLJLFzyiSWcriyGAgHAuFAIBwIhAOBcCAQDgTCgUA4EAgHAuFAIBwIhANx4S5eIvdzxZ3TcJ/iC1J9bRzu6bm/zkxl1xfJoE8h5ybMjAAAAABJRU5ErkJggg=="
          size="22"
        />
        <van-icon
          name="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAJ1BMVEVHcEz///////////////////////////////////////////////8NopmKAAAADHRSTlMA1sQO8CSnQW6ZWoSHROfVAAABhklEQVRYw+2Yr0+DMRCGl8HGwELAfGLJFGRi4AADCUFNoAgkiJGAmwCHQGAIZoJAcAgCFofFdCnj1/1RJGRhtGt7710yBPke/+Tr3bXvLSsUcnJcdvabdvZcYtzTNwu4cUx95lBjmX64xoyx+kDpNiBlkX4xLf0I+JlJcrgElFNXeQWUzFUMb0yRxx2rFH2lyip7vvLCKh1feWOVtq/0pA1DWtb0FcsqNMQoFMXBFOUrmqwYpeLCKK6l4vIrnpjmISviQhFKiuhzPmMao4pxzbLQrCTN4vtXnFzNbKzPX+DCykF/LpsPoLE7CCZ7AxnbzuU/BIxVN/zsE2uU/OwzW+IcY4OsPBzj1BK8YugxL1GIWkqpB5WusBKmmk5EiTdtgmIcQQlGUJzdRpV38bmiJysmlCq0JpCdkSUUIy4lUkw5qbSg9c3v8uek8imtPlx/idIEIqDCKGey2UfmP84oa9IeB7v8yCgf0rEEB9NmlB6aR8lkyhjFyBUL/KbmFeLI/2zI+TO+AHPambLIoiO3AAAAAElFTkSuQmCC"
          size="22"
        /> </template
    ></van-nav-bar>
    <div class="search"  @click="$router.push('/search')">
      <van-search
        left-icon=""
        right-icon="search"
       
      />

      <van-swipe
        class="my-swipe"
        vertical
        :autoplay="3000"
        :show-indicators="false"
        :loop="true"
      >
        <van-swipe-item>重生八零团宠小神医</van-swipe-item>
        <van-swipe-item>最强狂婿</van-swipe-item>
        <van-swipe-item>前女友黑化日常</van-swipe-item>
        <van-swipe-item>最强医圣</van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  props: ["gender"],
  data: function () {
    return {};
  },
  methods: {
     RouteF(){
          if(this.$route.name!=='Bookrack'){
                    this.$router.push('/bookrack')
          }
      }
  },
};
</script>

<style lang="less">
.home-header {
  border-bottom: 1px solid red;
  .van-nav-bar {
    background: #b83320;

    .van-nav-bar__title {
      .van-button {
        height: 28px;
        border-radius: 14px 0 0 14px;
        border-color: white;
        border-width: 1px;
        background-color: transparent;
        color: white;
        & + .van-button {
          border-left: none;
          border-radius: 0 14px 14px 0;
        }
        &.active {
          background: white;
          color: lightgray;
        }
      }
    }
  }

  .search {
    position: relative;
    margin: 5px;
    .van-search {
      padding: 0;
    }
    .my-swipe {
      width: 100%;
      height: 34px;
      line-height: 34px;
      position: absolute;
      top: 0;
      left: 0;
      //   z-index: -1;
    }
    .van-swipe-item{
      font-size:14px ;
      color: #999;
    }
  }
}
</style>