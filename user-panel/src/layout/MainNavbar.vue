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
      <li class="nav-item" v-if="!this.logout">
        <router-link class="navbar-brand nav-link text-success" to="/events">
          <b>Home</b>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="navbar-brand nav-link text-success" to="/about">
          <b>About Us</b>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="navbar-brand nav-link text-success" to="/contact">
          <b>Contact</b>
        </router-link>
      </li>
      <li class="nav-item dropdown">
        <a class="navbar-brand nav-link dropdown-toggle text-success">Your Engagements</a>
        <div class="dropdown-content">
          <li class="nav-item" v-if="!this.logout">
            <router-link class="navbar-brand nav-link text-success" to="/upcoming-events">
              <b>Upcoming Engagements</b>
            </router-link>
          </li>
          <li class="nav-item" v-if="!this.logout">
            <router-link class="navbar-brand nav-link text-success" to="/past-events">
              <b>Past Engagements</b>
            </router-link>
          </li>
        </div>
      </li>
      <!-- <li class="nav-item" v-if="!this.logout">
        <router-link class="navbar-brand nav-link text-success" to="">
        Billing History
        </router-link>
      </li> -->
      <li class="nav-item" v-if="!this.logout">
        <router-link class="navbar-brand nav-link text-success" to="/profile">
          <b>Profile</b>
        </router-link>
      </li>
      <li class="nav-item" v-if="!this.logout" @click="hide=true">
        <router-link class="navbar-brand nav-link text-success" to="/messages" >
          <b>Messages<b-badge v-if="getNewMessages>0 && hide==false"  style="position:relative;top:-0.5rem;" variant="danger">{{getNewMessages}} </b-badge></b>

        </router-link>
      </li>

      <li class="nav-item" v-if="!this.logout" @click="userLogout">
        <router-link class="navbar-brand nav-link text-success" to="/">
          <b>Logout</b>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="navbar-brand nav-link btn btn-info" to="/login" v-if="this.logout">
          <b>Login</b>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="navbar-brand nav-link btn btn-info text-white" to="/host" v-if="!this.logout">
          Host
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
  computed: { 
    ...mapGetters(['loggedUser']),
    getNewMessages(){
      let user=JSON.parse(localStorage.getItem('loggedUser'))
      let cnt=0
      if(user.message_connections!=null){
      Object.keys(user.message_connections).forEach(key=>{
        cnt=cnt+user.message_connections[key].new_messages
              console.log(user.message_connections[key].new_messages)


      })
      // console.log(cnt)
      return cnt
      }
      else{
        return 0
      }
    }
  
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
      hide:false,
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
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }

  /* Show the dropdown menu on hover */
  .dropdown:hover .dropdown-content {display: block;}

</style>
