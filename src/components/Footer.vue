<template>
  <footer class="bottom">
    <div class="imgList">
    <!--  <img src="../assets/images/weibo.png"/>
      <img src="../assets/images/weixin.png"/>
      <img src="../assets/images/f.png"/>
      <img src="../assets/images/n.png"/>
      <a  href="https://t.me/faithtower"><i class="iconfont icon-dianbaoqunicon"></i></a>-->
    </div>
    <div class="record">
      {{$t('home.title')}} © 2018
    </div>
  </footer>
</template>
<script>
    export default {
        name: '',
        components: {},
        data() {
            return {}
        },
        created() {
        },
        mounted: function () {
        },
        methods: {}
    }
</script>

<style>

  footer .imgList{
    text-align: center;
    padding-top: 30px;
  }
  footer .imgList img,footer .imgList i{
    width: 36px;
    height: 36px;
    margin: 0 12px;
    display: inline-block;

  }
  footer .imgList i{
    font-size: 39px;
    vertical-align: top;
    color: #676d79;
  }
  footer .record{
    padding:36px 0 37px 0 ;
    text-align: center;
    color:rgba(158,157,157,1);
    font-size:14px;
  }
  @media screen and (min-width: 1200px){
    footer{
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  @media screen and (max-width: 1200px){

  }
</style>
