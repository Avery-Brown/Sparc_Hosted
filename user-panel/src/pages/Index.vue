<template>
  <div>
    <div class="main">
      <div class="section section-images" style="max-height: 80vh;">
        <div class="container">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12 text-center">
                <img src="sparclogo1.png" width="400" alt="">
              </div>
            </div>
            <div class="row">
              <div class="col-md-8 ml-auto mr-auto mt-3 text-center">
                <validation-provider rules="required" v-slot="{ errors }" mode="eager">
                  <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text" style="width: 48px;"><i class="fa fa-search fa-sm"></i></span>
                    </b-input-group-prepend>
                      <b-form-input style="border: solid #e3e3e3 1px; color: black; border-left: none; border-top-right-radius:30px; border-bottom-right-radius: 30px"  @keyup.enter="saveAndSearch" v-model="search" size="lg" placeholder="What would you like to learn today?" autofocus/>

                  </b-input-group>
                  <span style="color: red;">{{errors[0]}}</span>

                </validation-provider>

                  <!-- <fg-input v-model="search" class = "rq-form-element" placeholder="What would you like to learn today?" autofocus></fg-input> -->
              </div>
            </div>
            <div class = "row">
              <div class = "col-md-12 text-center">
                <button class="btn" style="background: #f4f4f4; color: #5f6368; font-weight: 500; font-size: 15px;" @click="saveAndSearch">Search</button>
              </div>
            </div>
          </div>
          <div style="position: absolute; bottom: 15px; margin-left: 10px;">
          <!-- <div style="margin-top: 150px;"> -->
            <router-link class="link footer-link pull-left" to="/about" style= "color: #00487c">
              Meet the Team&nbsp;|
            </router-link>
            <a class = "social-link" style = "color: #00487c" href="https://www.facebook.com/SparcTheWorld/"><i class="fab fa-facebook fa-lg"/></a>
            <a class = "social-link" style = "color: #00487c" href="https://www.instagram.com/SparcTheWorld/"><i class="fab fa-instagram fa-lg"/></a>
            <a class = "social-link" style = "color: #00487c" href="https://twitter.com/SparcTheWorld/"><i class="fab fa-twitter fa-lg"/></a>
            <a class = "social-link" style = "color: #00487c" href="linkedin.com/company/SparcTheWorld"><i class="fab fa-linkedin fa-lg"/></a>
            <a class = "social-link" style = "color: #00487c" href="https://www.youtube.com/channel/UCJldpwGu1lritWkFXbQBGMg"><i class="fab fa-youtube fa-lg"/></a>
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
    <!-- <modal :show.sync="modals.classic" headerClasses="justify-content-center">
      <h6 slot="header" class="text-danger">Please Login to View Engagements</h6>
      <template slot="footer">
          <n-button type="success" @click="gotoLogin" class="pull-right">Login</n-button>
      </template>
    </modal> -->
  </div>
</template>
<script>
import { Parallax, Modal, FormGroupInput, Button } from '@/components';
import { mapGetters, mapActions } from 'vuex'
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'Please search for something!'
});

export default {
  name: 'index',
  bodyClass: 'index-page',
  components: {
    Parallax,
    Modal,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    ValidationProvider,
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

    saveAndSearch() {
      if(this.search == null || this.search.trim() =='') {
        return;
      }  else {
        this.saveSearch(this.search);
        this.$router.push({path: '/events/search/' + this.search})
      }
    },
  },
  created() {
    this.fetchEvents();
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }
};
</script>
<style scoped>
  input[type="text"] {
    color: #fff;
  }

  .social-link {
    margin-left: 3px;
    margin-right: 3px;
  }
</style>
