import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue'),
          meta: {
            requiresAuth: true,
          }
        },
        {
          path: '/users',
          name: 'users',
          component: () => import(/* webpackChunkName: "demo" */ './views/Users.vue'),
          meta: {
            requiresAuth: true,
          }
        },
        {
          path: '/agerange',
          name: 'agerange',
          component: () => import(/* webpackChunkName: "demo" */ './views/AgeRange.vue'),
          meta: {
            requiresAuth: true,
          }
        },
        {
          path: '/events',
          name: 'events',
          component: () => import(/* webpackChunkName: "demo" */ './views/Events.vue'),
          meta: {
            requiresAuth: true,
          }
        },
        {
          path: '/eventdetails/:id',
          name: 'eventdetails',
          component: () => import(/* webpackChunkName: "demo" */ './views/EventDetails.vue'),
          meta: {
            requiresAuth: true,
          }
        },
        // {
        //   path: '/icons',
        //   name: 'icons',
        //   component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue'),
        //   meta: {
        //     requiresAuth: true,
        //   }
        // },
        {
          path: '/profile',
          name: 'profile',
          props:true,
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue'),
          meta: {
            requiresAuth: true,
          }
        },
        // {
        //   path: '/maps',
        //   name: 'maps',
        //   component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue'),
        //   meta: {
        //     requiresAuth: true,
        //   }
        // },
        {
          path: '/tags',
          name: 'tags',
          component: () => import(/* webpackChunkName: "demo" */ './views/NewTags.vue'),
          meta: {
            requiresAuth: true,
          }
        },
        // {
        //   path: '/tables',
        //   name: 'tables',
        //   component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue'),
        //   meta: {
        //     requiresAuth: true,
        //   }
        // }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    }
  ]
})
