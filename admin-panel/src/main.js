import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
//importing store 
import store from '@/store/index'
import firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'
import 'native-toast/dist/native-toast.css'
import 'ant-design-vue/dist/antd.css';  // or 'ant-design-vue/dist/antd.less'

import Clipboard from 'v-clipboard' 
Vue.use(Clipboard)
import { Rate } from 'ant-design-vue';
Vue.use(Rate);

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
   //console.log(Vals) requiresAuth &&requiresAuth &&
  if ( requiresAuth &&  !localStorage.getItem("loggedUser")) {
    
      next('/login')
  } else if (requiresAuth && localStorage.getItem("loggedUser")) {
      next()
  } else {
      next()
  }
})



 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyCqbvVcCTFMGK3AMGQ--zp0TWV8Jknrq5w",
  authDomain: "sparc-bd7b1.firebaseapp.com",
  databaseURL: "https://sparc-bd7b1.firebaseio.com",
  projectId: "sparc-bd7b1",
  storageBucket: "sparc-bd7b1.appspot.com",
  messagingSenderId: "742857539802",
  appId: "1:742857539802:web:fb1271fcdffc30f6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false
Vue.use(BootstrapVue)


Vue.use(ArgonDashboard)
new Vue({
  router,
  store,
  firebase,
  render: h => h(App)
}).$mount('#app')
