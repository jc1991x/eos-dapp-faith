<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    var createElement = document.createElement;
    document.createElement = function (tag) {
      switch (tag) {
        case 'script':
          //console.log('禁用动态添加脚本，防止广告加载');
          break;
        default:
          return createElement.apply(this, arguments);
      }
    }
  }
}
</script>

<style>
  html,body,#app{
    width: 100%;
    height: 100%;
  }
</style>
