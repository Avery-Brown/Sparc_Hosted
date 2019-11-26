import Vue from 'vue';
import App from './App.vue';
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './router';
import NowUiKit from './plugins/now-ui-kit';
import BootstrapVue from 'bootstrap-vue'
import Multiselect from 'vue-multiselect'
import store from './store'
import firebase from 'firebase'
import StarRating from 'vue-star-rating'
import Clipboard from 'v-clipboard'
import 'native-toast/dist/native-toast.css'
import VueStripeCheckout from 'vue-stripe-checkout'
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'
Vue.use(VueFroala)


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

// New Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDWuDyO5BASsDn5dy8NQeAalx71-QKpy_4",
  authDomain: "sparc-9d9cb.firebaseapp.com",
  databaseURL: "https://sparc-9d9cb.firebaseio.com",
  projectId: "sparc-9d9cb",
  storageBucket: "sparc-9d9cb.appspot.com",
  messagingSenderId: "1067799707116",
  appId: "1:1067799707116:web:24ab2a88a640e5ca4b94c9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// OLD Firebase

// var firebaseConfig = {
//   apiKey: "AIzaSyCqbvVcCTFMGK3AMGQ--zp0TWV8Jknrq5w",
//   authDomain: "sparc-bd7b1.firebaseapp.com",
//   databaseURL: "https://sparc-bd7b1.firebaseio.com",
//   projectId: "sparc-bd7b1",
//   storageBucket: "sparc-bd7b1.appspot.com",
//   messagingSenderId: "742857539802",
//   appId: "1:742857539802:web:ffeb73106f5a1293"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

window.firebase = firebase;

// register globally
Vue.component('multiselect', Multiselect)
Vue.component('star-rating', StarRating)

const options = {
  key: 'pk_live_w6Z8KIXE8kMyrpj5jZ0Tqd1G00DWtY0TU3',
  image: 'https://cdn.meme.am/images/100x100/15882140.jpg',
  locale: 'auto',
  currency: 'USD',
  billingAddress: true,
  panelLabel: 'Pay Now'
}

Vue.use(VueStripeCheckout, options)

Vue.use(Clipboard)
Vue.use(BootstrapVue)

Vue.config.productionTip = false;

Vue.use(NowUiKit);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
