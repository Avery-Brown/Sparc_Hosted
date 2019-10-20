import Vue from 'vue';
import Router from 'vue-router';
import Index from './pages/Index.vue';
import About from './pages/About.vue';
import Contact from './pages/Contact.vue';
import Host from './pages/Host.vue';
import CreateEngagement from './pages/CreateEngagement.vue';
import Landing from './pages/Landing.vue';
import Login from './pages/Login.vue';
import ForgotPassword from './pages/ForgotPassword.vue';
import Register from './pages/Register.vue';
import Profile from './pages/Profile.vue';
import Events from './pages/Events.vue';
import EventDetails from './pages/EventDetails.vue';
import UserDetails from './pages/UserDetails.vue';
import UpcomingEvents from './pages/UpcomingEvents.vue';
import PastEvents from './pages/PastEvents.vue';
import HostUpcomingEvents from './pages/HostUpcomingEvents.vue';
import HostPastEvents from './pages/HostPastEvents.vue';
import BillingHistory from './pages/BillingHistory.vue';
import MainNavbar from './layout/MainNavbar.vue';
import StarterNavbar from './layout/StarterNavbar.vue';
import MainFooter from './layout/MainFooter.vue';
import Messages from './pages/Messages.vue';
Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'index',
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path:'/about',
      name: 'about',
      components: { default: About, header: MainNavbar, footer: MainFooter},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/contact',
      name: 'contact',
      components: { default: Contact, header: MainNavbar, footer: MainFooter},
      props: {
        header: { colorOnScroll: 400 }, 
        footer: { backgroundColor: 'black' }
      }
    }, 
    {
      path: '/host',
      name: 'host',
      components: { default: Host, header: StarterNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/create_engagement',
      name: 'create_engagement',
      components: { default: CreateEngagement, header: StarterNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/landing',
      name: 'landing',
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/login',
      name: 'login',
      components: { default: Login, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      components: { default: ForgotPassword, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/register',
      name: 'register',
      components: { default: Register, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/events',
      name: 'events',
      components: { default: Events, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 }
      },
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/events/:eventId',
      name: 'event-details',
      components: { default: EventDetails, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/users/:userId',
      name: 'user-details',
      components: { default: UserDetails, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 }
      },
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/upcoming-events',
      name: 'upcoming-events',
      components: { default: UpcomingEvents, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 }
      },
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/past-events',
      name: 'past-events',
      components: { default: PastEvents, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 }
      },
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/host-upcoming-engagements',
      name: 'host-upcoming-engagements',
      components: { default: HostUpcomingEvents, header: StarterNavbar },
      props: {
        header: { colorOnScroll: 400 }
      },
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/host-past-engagements',
      name: 'host-past-engagements',
      components: { default: HostPastEvents, header: StarterNavbar },
      props: {
        header: { colorOnScroll: 400 }
      },
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/billing-history',
      name: 'billing-history',
      components: { default: BillingHistory, header: StarterNavbar },
      props: {
        header: { colorOnScroll: 400 }
      },
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/messages',
      name: 'messages',
      components: { default: Messages, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },
      meta: {
        requiresAuth: true,
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
