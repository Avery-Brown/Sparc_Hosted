<template>
  <navbar
          type="info"
          :color-on-scroll="colorOnScroll"
          menu-classes="ml-auto"
          style="border-bottom: 0.5px solid #e4e4e4; margin-top: -7px;"
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
    <template slot="navbar-menu">
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
        <li class="nav-item">
        <router-link class="nav-link-v2" style="color: #484848" to="/events">
          Explore
        </router-link>
      </li>
      <!-- <li class="nav-item dropdown" v-if="!this.logout">
        <a class="navbar-brand nav-link dropdown-toggle" style="margin-right: 35px; color: #484848; font-weight: 400">About</a>
        <div class="dropdown-content text-center">
          <li class="nav-item about-dropdown" v-if="!this.logout">
            <router-link class="navbar-brand nav-link" to="/about">
              <b class = "drop-down-text">Meet the Team</b>
            </router-link>
          </li>
          <li class="nav-item about-dropdown" v-if="!this.logout">
            <router-link class="navbar-brand nav-link" to="/contact">
              <b class = "drop-down-text">Contact Us</b>
            </router-link>
          </li>
        </div>
      </li> -->
      <li class="nav-item">
        <router-link class="nav-link-v2" style="color: #484848" to="/about">
          Meet the Team
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link-v2" style="color: #484848" to="/contact">
          Contact Us
        </router-link>
      </li>
      <!-- <li class="nav-item">
        <router-link class="navbar-brand nav-link" to="/about">
          <b>About Us</b>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="navbar-brand nav-link" to="/contact">
          <b>Contact</b>
        </router-link>
      </li> -->
      <!-- <li class="nav-item dropdown" v-if="!this.logout">
        <a class="navbar-brand nav-link dropdown-toggle" style="margin-right: 35px; color: #484848; font-weight: 400">Engagements</a>
        <div class="dropdown-content">
          <li class="nav-item engage-dropdown" v-if="!this.logout">
            <router-link class="navbar-brand nav-link" to="/upcoming-events">
              <b class = "drop-down-text">Upcoming Engagements</b>
            </router-link>
          </li>
          <li class="nav-item engage-dropdown" v-if="!this.logout">
            <router-link class="navbar-brand nav-link" to="/past-events">
              <b class = "drop-down-text">Past Engagements</b>
            </router-link>
          </li>
          <li class="nav-item engage-dropdown" v-if="!this.logout">
            <router-link class="navbar-brand nav-link" to="/host">
              <b class = "drop-down-text">Hosted Engagements</b>
            </router-link>
          </li>
        </div>
      </li> -->
      <!-- <li class="nav-item" v-if="!this.logout">
        <router-link class="navbar-brand nav-link" to="">
        Billing History
        </router-link>
      </li> -->
      <li class="dropdown" v-if="!this.logout">
          <!-- <b class="nav-link-v2" style= "margin-right: 20px;" >Profile</b> -->
        <img :src="user.profile_image" width="35" height="35" style="margin-left: 15px; border-radius: 50%; margin-top: 5px; border: 1px solid #00487c" v-b-toggle.collapse-a.collapse-b/>
        <div class="dropdown-content-profile shadow-sm">
          <b-collapse id="collapse-a" v-if="!this.logout">
            <router-link to="/past-events">
              <p class="drop-down-text-v2">Past Engagements</p>
            </router-link>
          </b-collapse>
          <b-collapse id="collapse-a" v-if="!this.logout">
            <router-link to="/upcoming-events">
              <p class="drop-down-text-v2">Upcoming Engagements</p>
            </router-link>
          </b-collapse>
          <b-collapse id="collapse-a" v-if="!this.logout">
            <router-link to="/host">
              <p class="drop-down-text-v2">Hosted Engagements</p>
            </router-link>
          </b-collapse>
          <b-collapse id="collapse-a" v-if="!this.logout">
            <router-link to="/create_engagement">
              <p class="drop-down-text-v2">Create Engagement</p>
            </router-link>
          </b-collapse>
          <b-collapse id="collapse-a" v-if="!this.logout">
            <router-link to="/billing-history">
              <p class="drop-down-text-v2">Billing History</p>
            </router-link>
          </b-collapse>
          <b-collapse id="collapse-a" v-if="!this.logout">
            <router-link to="/">
              <p @click="userLogout" class="drop-down-text-v2">Logout</p>
            </router-link>
          </b-collapse>
        </div>
        <!-- <div class="dropdown-content">
          <li class="nav-item logout-dropdown" v-if="!this.logout" @click="userLogout">
            <router-link class="navbar-brand nav-link" to="/">
              <b class = "drop-down-text">Logout</b>
            </router-link>
          </li>
        </div> -->
      </li>
      <!-- <li class="nav-item" v-if="!this.logout">
        <router-link class="navbar-brand nav-link" to="/profile">
          <b>Profile</b>
        </router-link>
      </li>

      <li class="nav-item" v-if="!this.logout" @click="userLogout">
        <router-link class="navbar-brand nav-link" to="/">
          <b>Logout</b>
        </router-link>
      </li> -->

      <li class="nav-item">
        <router-link class="nav-link-v2" style="color: #484848" to="/login" v-if="this.logout">
          Log in
        </router-link>
      </li>
      <!-- <li class="nav-item">
        <router-link class="navbar-brand nav-link btn btn-info text-white" to="/create_engagement" v-if="!this.logout">
          Create Engagement
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="navbar-brand nav-link btn btn-info text-white" to="/host" v-if="!this.logout">
          Become a Host
        </router-link>
      </li> -->
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
  computed: { 
    ...mapGetters(['loggedUser']),
  },
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
      user: null,
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
        this.logout = true
        
      }
      else {
        this.logout = false;
        this.userEmail = JSON.parse(localStorage.getItem('loggedUser')).email;
      }
    },
  },
  async created() {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    console.log("test");
    if(loggedUser != null) {
      this.logout = false;
      this.user = loggedUser;
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


  .dropdown-content-profile {
    text-align: left;
    margin-top: 21px;
    margin-left: -60px;
    margin-right: 20px;
    position: absolute;
    z-index: 1;
    width: 250px;
    background-color: white;
  }

  .drop-down-text-v2 {
    color: #767676;
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    margin-top: -10px;
    padding: 15px;
    border-bottom: 1px solid #f2f2f2;
  }

  .drop-down-text-v2:hover {
    border-bottom: 1px solid #00487c;
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

  .nav-link:hover {
    background: white;
  }

  .nav-link-v2 {
    color: #484848;
    font-size: 13px;
    margin-top: 14px;
    padding-bottom: 12px;
    height: 100%;
    font-weight: 600;
    display: block;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    margin-left: 10px;
    margin-right: 10px;
  }

  .nav-link-v2:hover {
    border-bottom: 2px solid #00487c;

  }

  #collapse-a{
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 1px;
  }

</style>
