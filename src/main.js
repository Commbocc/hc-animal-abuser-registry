import Vue from 'vue/dist/vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(App)

new Vue({
  // render: h => h(App),
}).$mount('#app')
