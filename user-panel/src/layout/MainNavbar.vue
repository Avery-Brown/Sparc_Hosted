<template>
  <navbar
          type="info"
          :color-on-scroll="colorOnScroll"
          menu-classes="ml-auto"
  >
    <template>
      <router-link class="navbar-brand" to="/">
        <img src="sparcS.png" width="30"  alt="">
      </router-link>
      <!-- <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="100"
        trigger="hover"
      >
        <div class="popover-body">
          Sparco
        </div>
      </el-popover> -->
    </template>
    <template slot="navbar-menu" style="border-bottom: 1px solid gray">
      <!-- <li class="nav-item">
        <a
          class="nav-link"
          href="https://www.creative-tim.com/product/vue-now-ui-kit"
          target="_blank"
        >
          <i class="now-ui-icons users_circle-08"></i>
          <p>Login</p>
        </a>
      </li> -->
      <li class="nav-item" v-if="!this.logout">
        <router-link class="navbar-brand nav-link text-success" to="/events">
          <b>Home</b>
        </router-link>
      </li>
      <li class="nav-item dropdown" v-if="!this.logout">
        <a class="navbar-brand nav-link dropdown-toggle text-success" style="margin-right: 35px;">About</a>
        <div class="dropdown-content text-center">
          <li class="nav-item about-dropdown" v-if="!this.logout">
            <router-link class="navbar-brand nav-link text-success" to="/about">
              <b class = "drop-down-text">Meet the Team</b>
            </router-link>
          </li>
          <li class="nav-item about-dropdown" v-if="!this.logout">
            <router-link class="navbar-brand nav-link text-success" to="/contact">
              <b class = "drop-down-text">Contact Us</b>
            </router-link>
          </li>
        </div>
      </li>
      <!-- <li class="nav-item">
        <router-link class="navbar-brand nav-link text-success" to="/about">
          <b>About Us</b>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="navbar-brand nav-link text-success" to="/contact">
          <b>Contact</b>
        </router-link>
      </li> -->
      <li class="nav-item dropdown" v-if="!this.logout">
        <a class="navbar-brand nav-link dropdown-toggle text-success" style="margin-right: 35px;">Engagements</a>
        <div class="dropdown-content">
          <li class="nav-item engage-dropdown" v-if="!this.logout">
            <router-link class="navbar-brand nav-link text-success" to="/upcoming-events">
              <b class = "drop-down-text">Upcoming Engagements</b>
            </router-link>
          </li>
          <li class="nav-item engage-dropdown" v-if="!this.logout">
            <router-link class="navbar-brand nav-link text-success" to="/past-events">
              <b class = "drop-down-text">Past Engagements</b>
            </router-link>
          </li>
          <li class="nav-item engage-dropdown" v-if="!this.logout">
            <router-link class="navbar-brand nav-link text-success" to="/host">
              <b class = "drop-down-text">Hosted Engagements</b>
            </router-link>
          </li>
        </div>
      </li>
      <!-- <li class="nav-item" v-if="!this.logout">
        <router-link class="navbar-brand nav-link text-success" to="">
        Billing History
        </router-link>
      </li> -->
      <li class="nav-item dropdown" v-if="!this.logout">
        <router-link class="navbar-brand nav-link text-success" to="/profile">
          <b class="dropdown-toggle" style="margin-left: 15px; margin-right: 20px;">Profile</b>
        </router-link>
        <div class="dropdown-content">
          <li class="nav-item logout-dropdown" v-if="!this.logout">
            <router-link class="navbar-brand nav-link text-success" to="/billing-history">
              <b class = "drop-down-text">Billing History</b>
            </router-link>
          </li>
          <li class="nav-item logout-dropdown" v-if="!this.logout" @click="userLogout">
            <router-link class="navbar-brand nav-link text-success" to="/">
              <b class = "drop-down-text">Logout</b>
            </router-link>
          </li>
        </div>
        <!-- <div class="dropdown-content">
          <li class="nav-item logout-dropdown" v-if="!this.logout" @click="userLogout">
            <router-link class="navbar-brand nav-link text-success" to="/">
              <b class = "drop-down-text">Logout</b>
            </router-link>
          </li>
        </div> -->
      </li>
      <!-- <li class="nav-item" v-if="!this.logout">
        <router-link class="navbar-brand nav-link text-success" to="/profile">
          <b>Profile</b>
        </router-link>
      </li>

      <li class="nav-item" v-if="!this.logout" @click="userLogout">
        <router-link class="navbar-brand nav-link text-success" to="/">
          <b>Logout</b>
        </router-link>
      </li> -->

      <li class="nav-item">
        <router-link class="navbar-brand nav-link btn btn-info" style="width: 100%;" to="/login" v-if="this.logout">
          <b>Login</b>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="navbar-brand nav-link btn btn-info text-white" to="/create_engagement" v-if="!this.logout">
          Create Engagement
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="navbar-brand nav-link btn btn-info text-white" to="/host" v-if="!this.logout">
          Become a Host
        </router-link>
      </li>
    </template>
  </navbar>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import { DropDown, NavbarToggleButton, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';
export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  computed: { ...mapGetters(['loggedUser'])},
  components: {
    DropDown,
    Navbar,
    NavbarToggleButton,
    NavLink,
    [Popover.name]: Popover
  },
  data() {
    return {
      logout: true,
      userEmail: '',
    }
  },
  methods: {
    ...mapActions(['finalSignoutrequest']),

    userLogout() {
      this.finalSignoutrequest();
    }
  },
  watch: {
    loggedUser(val) {
      if(!val) {
        console.log('No Val')
        //this.$router.push({path: '/'})
        this.logout = true
        // window.location.reload(false);
      }
      else {
        this.logout = false;
        this.userEmail = JSON.parse(localStorage.getItem('loggedUser')).email;
      }
    }
  },
  created() {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    console.log(loggedUser)
    if(loggedUser != null) {
      this.logout = false;
    }
  }
};
</script>

<style scoped>
  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    display: none;
    position: absolute;
    text-align: center;
    /*background-color: #f1f1f1;*/
    /*background-color: white;*/
    width: 100%;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0);
    z-index: 1;
    background-color: white;
  }

  /* Show the dropdown menu on hover */
  .dropdown:hover .dropdown-content {display: block;}

  .dropdown {
    font-weight: bold;
  }

  .drop-down-text {
    font-size: 12px;
    color: rgb(29, 104, 47);
  }

  .logout-dropdown {
    width: 100%;
    margin-right: 0px;
    color: rgb(29, 104, 47);
  }
  .about-dropdown {
    width: 100%;
    color: rgb(29, 104, 47);
  }
  .engage-dropdown {
    width: 100%;
    color: rgb(29, 104, 47);
  }



</style>
