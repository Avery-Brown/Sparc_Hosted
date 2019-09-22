<template>
  <navbar type="info" menu-classes="ml-auto">
    <template >
      <router-link class="navbar-brand" to="/host">
        <img src="sparcS.png" width="30"  alt="">
      </router-link>
      
    </template>
    <template slot="navbar-menu">
        
        <li class="nav-item" v-if="!logout">
          <router-link class="navbar-brand nav-link" to="/host-upcoming-engagements">
          Upcoming Engagements
          </router-link>
        </li>
        <li class="nav-item" v-if="!logout">
          <router-link class="navbar-brand nav-link" to="/host-past-engagements">
          Past Engagements
          </router-link>
        </li>
        <li class="nav-item" v-if="!logout">
          <router-link class="navbar-brand nav-link" to="/billing-history">
          Billing History
          </router-link>
        </li>
        <li class="nav-item">
        <router-link class="navbar-brand nav-link" to="/create_engagement" v-if="!logout">
        Create Engagement
        </router-link>
      </li>
      <li class="nav-item" v-if="!logout" @click="userLogout">
        <router-link class="navbar-brand nav-link" to="/">
        Logout
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="navbar-brand nav-link btn btn btn-neutral text-info" to="/" v-if="!logout">
        Participate
        </router-link>
      </li>
    </template>
  </navbar>
</template>

<script>
import { DropDown, NavbarToggleButton, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'main-navbar',
  components: {
    DropDown,
    Navbar,
    NavbarToggleButton,
    NavLink,
    [Popover.name]: Popover
  },
  data() {
    return {
      logout: false
    }
  },
  computed: { ...mapGetters(['loggedUser'])},
  methods: {
    ...mapActions(['finalSignoutrequest']),
    userLogout(){
      this.finalSignoutrequest();
      
    }
  },

  watch: {
    loggedUser(val) {
      if(!val) {
        console.log('No Val')
        //this.$router.push({path: '/'})
        this.logout = true
        window.location.reload(false);
      }
      else {
        this.logout = false;
        this.userEmail = JSON.parse(localStorage.getItem('loggedUser')).email;
      }
    }
  },
};
</script>

<style scoped></style>
