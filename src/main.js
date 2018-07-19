// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'
import '@/assets/css/reset.css'
import '@/assets/css/public.css'
import '@/assets/font/iconfont.css'

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    locale: localStorage.getItem('lang') != undefined ? localStorage.getItem('lang') : 'zh-CN'
  }
});
const i18n = new VueI18n({
  locale:localStorage.getItem('lang')!=undefined?localStorage.getItem('lang'):'zh-CN',
  messages: {
    'zh-CN': require('./assets/js/lang/zh'),   // 中文语言包
    'en-US': require('./assets/js/lang/en')    // 英文语言包
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  i18n,
  store,
  template: '<App/>'
})
