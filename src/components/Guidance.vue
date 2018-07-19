<template>
  <div class="guidance mask">
    <div class="guidancecont">{{$t('home.promt10')}}
      <i class="iconfont icon-zhishijiantou"></i>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Guidance"
    }
</script>

<style scoped>
  .guidance{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: ragb(0,0,0,.4);
  }
  .guidance .guidancecont{
    height: 50px;
    background: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 50px;
    color: #3287f5;
    position: relative;
  }
  .guidance .guidancecont i{
    font-size: 30px;
    position: absolute;
    top: 50%;
    margin-top: -26px;
    right: 35px;
  }
</style>
