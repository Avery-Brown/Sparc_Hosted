<template>
  <div>
    <div class="main">
      <div class="section section-images">
        <div class="container">
          <div class="col-md-12">
            <div class="row text-center">
              
            </div>
            <div class="row">
              <div class="col-md-12 text-center">
                <img src="sparclogo1.png" width="500" alt="">
              </div>           
            </div>
            <div class="row">
              <div class="col-md-8 ml-auto mr-auto mt-3 text-center">
                <form action="" @submit="save">
                <fg-input v-model="search" placeholder="Sparc the world"></fg-input>
                <input type="submit" class="btn btn-info text-white" @click="save" value="Search" />
                </form>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <carousel-section></carousel-section>
    <javascript-components></javascript-components> -->
      <!-- <basic-elements></basic-elements> -->
    <!-- <navigation></navigation> -->
    <!-- <tabs-section></tabs-section>
    <progress-pagination></progress-pagination> -->
    <!-- <notifications></notifications>
    <typography></typography>
    <javascript-components></javascript-components>
    <carousel-section></carousel-section>
    <nucleo-icons-section></nucleo-icons-section> -->
    <!-- <div class="section">
      <div class="container text-center">
        <div class="row justify-content-md-center">
          <div class="col-md-12 col-lg-8">
            <h2 class="title">Completed with examples</h2>
            <h5 class="description">
              The kit comes with three pre-built pages to help you get started
              faster. You can change the text and images and you're good to go.
              More importantly, looking at them will give you a picture of what
              you can built with this powerful Bootstrap 4 ui kit.
            </h5>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <signup-form></signup-form> -->
    <!-- <examples-section></examples-section>
    <download-section></download-section> -->
    <modal :show.sync="modals.classic" headerClasses="justify-content-center">
      <h6 slot="header" class="text-danger">Please Login to View Engagements</h6>
      <template slot="footer">
          <n-button type="success" @click="gotoLogin" class="pull-right">Login</n-button>
      </template>
    </modal>
  </div>
</template>
<script>
import { Parallax, Modal, FormGroupInput, Button } from '@/components';


import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'index',
  bodyClass: 'index-page',
  components: {
    Parallax,
    Modal,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      rating: 5,
      search: null,
       modals: {
        classic: false,
      },
    }
  },
  computed: {
    ...mapGetters(['getEvents']),
  },
  methods: {
    ...mapActions(['fetchEvents', 'saveSearch']),

    save() {
      if(this.search !== null) {
        this.modals.classic = true
        console.log("Search")
        console.log(this.search)
        this.saveSearch(this.search)
        this.search = null
      }
      else {
        console.log("Please Enter Something")
      }
    },
    gotoLogin() {
      this.$router.push({path: '/login'})
    }
  },
  created() {
    this.fetchEvents();
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if(loggedUser != null) {
      this.$router.push({path: '/events'})
    }
  }
};
</script>
<style scoped>
  input[type="text"] {
    color: #fff;
  }
</style>
