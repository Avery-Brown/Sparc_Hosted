<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 600px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <!-- <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Hello Jesse</h1>
                        <p class="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
                        <a href="#!" class="btn btn-info">Edit profile</a>
                    </div>
                </div> -->
            </div>
        </base-header>

        <div class="container-fluid " style="margin-top: -29.5rem !important;">
            <div class="row">
                <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">

                    <div class="card card-profile shadow">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img :src="user.profile_image" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                            <div class="d-flex justify-content-between">
                                <!-- <base-button size="sm" type="info" class="mr-4">Connect</base-button> -->
                                <!-- <base-button size="sm" type="default" class="float-right">Message</base-button> -->
                            </div>
                        </div>
                        <div class="card-body pt-0 pt-md-4">
                            <div class="row mt-md-5">
                                <div class="offset-md-2 col-md-10">
                                            <a-rate v-model="value" disabled  allowHalf /> (191)

                                    <!-- <div class="card-profile-stats d-flex justify-content-center \mt-md-5">

                                        <div>
                                            <span class="heading">22</span>
                                            <span class="description">
                                        
                                            </span>
                                        </div>
                                        <div>
                                            <span class="heading">10</span>
                                            <span class="description">33</span>
                                        </div>
                                        <div>
                                            <span class="heading">89</span>
                                            <span class="description">Comments</span>
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                            <div class="text-center">
                                <h3>
                                    {{user.first_name}} {{user.last_name}}<span class="font-weight-light">, 27</span>
                                </h3>
                                <div class="h5 font-weight-300">
                                    <i class="ni location_pin mr-2"></i>{{user.email}}
                                </div>
                                <div class="h5 mt-4">
                                    <i class="ni business_briefcase-24 mr-2"></i>{{user.job_occupation}}
                                </div>
                                <div>
                                    <i class="ni education_hat mr-2"></i>{{user.institute}}
                                </div>
                                <b-row>
                                    <b-col class="col-md-12 h5 mt-4">Interests</b-col>
                                    <b-col v-for="tag_item in get_tags" :key="tag_item.id">
                                      <b-badge variant="primary">{{tag_item.value}}</b-badge>
                                    </b-col>
                                </b-row>
                                <hr class="my-4" />
                                <p>{{user.about}}</p>
                                <a href="#">Profile Video</a>
                                <b-row>
                                    <b-col >
                                        <video width="250" height="150"  controls>
                                                <source :src="user.profile_video" type="video/mp4">
                                                Your browser does not support the video tag.
                                        </video>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Engagements Created</h3>
                                </div>
                                <!-- <div class="col-4 text-right">
                                    <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                                </div> -->
                            </div>
                        </div>
                        <template>
                            <b-row>
                                <b-col class="col-md-6"   v-for="event_item in getSelectedEvents" v-bind:key="event_item.id">
                                 <!--  -->
                                   <b-card
                                        :img-src="event_item.event_image"
                                        img-alt="Image"
                                        img-top
                                        tag="article"
                                        img-height="197px;"
                                        style="max-width: 20rem;border-color:blue;"
                                        class="mb-2"
                                        >
                                        <b-card-body style="margin-top:-20px;">
                                            <b-card-title>
                                                    {{event_item.event_name}}</b-card-title>
                                            <div class="row" style="margin-top:-25px;">
                                                <div class="col-md-10">
                                                <a-rate v-model="value" allowHalf />
                                                <!-- (32) -->
                                                </div>
                                                <div class="col-md-2">
                                                    <i class="fa fa-clipboard"
                                                    v-clipboard="()=>newurl+'/'+event_item.id"
                                                        v-clipboard:success="clipboardSuccessHandler" 
                                                        v-clipboard:error="clipboardErrorHandler"
                                                     aria-hidden="true"></i>
                                                </div>
                                            
                                            </div>
                                            <b-card-sub-title style="margin-top:8px;font-size:12px;" class="mb-2">
                                                <i class="fa fa-map-marker" aria-hidden="true"></i>
                                                23, Rue Traversiere,Paris</b-card-sub-title>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <h5 class="text-muted">
                                                        <i class="fa fa-clock-o" aria-hidden="true"></i>
                                                        {{event_item.start_time}}-{{event_item.end_time}}</h5>
                                                </div>
                                            </div>
                                            <div class="row" style="margin-top:-17px;">
                                                <div class="col-md-12">
                                                    <h5 class="text-muted"> 
                                                        <i class="fa fa-calendar" aria-hidden="true"></i>

                                                        {{event_item.date}}</h5>
                                                </div>
                                            </div>
                                            <div class="row" style="margin-top:-17px;">
                                                <div class="col-md-12">
                                                    <router-link :to="`eventdetails/${event_item.id}`">
                                                      <b-button class="pull-right" size="sm" variant="outline-primary">View Details</b-button>
                                                    </router-link>
                                                        <!-- <i class="fa fa-calendar" aria-hidden="true"></i>
                                                        <button v-clipboard="()=>newurl+'/'+event_item.id"
                                                        v-clipboard:success="clipboardSuccessHandler" 
                                                        v-clipboard:error="clipboardErrorHandler"
                                                        variant="primary">    
                                                        Copy to clipboard
                                                        </button> -->
                                                </div>
                                            </div>
                                        </b-card-body>
                                    </b-card>
                                 <!--  -->
                                </b-col>
                                        
                            </b-row>
                            <!-- <b-row v-else>
                                <p>No events</p>

                            </b-row> -->
                            <!-- <form @submit.prevent>
                                <h6 class="heading-small text-muted mb-4">User information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Username"
                                                        placeholder="Username"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.username"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Email address"
                                                        placeholder="jesse@example.com"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.email"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="First name"
                                                        placeholder="First name"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.firstName"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Last name"
                                                        placeholder="Last name"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.lastName"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" /> -->
                                <!-- Address -->
                                <!-- <h6 class="heading-small text-muted mb-4">Contact information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <base-input alternative=""
                                                        label="Address"
                                                        placeholder="Home Address"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.address"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="City"
                                                        placeholder="City"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.city"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Country"
                                                        placeholder="Country"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.country"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Postal code"
                                                        placeholder="Postal code"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.zipCode"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" /> -->
                                <!-- Description -->
                                <!-- <h6 class="heading-small text-muted mb-4">About me</h6>
                                <div class="pl-lg-4">
                                    <div class="form-group">
                                        <base-input alternative=""
                                                    label="About Me">
                                            <textarea rows="4" class="form-control form-control-alternative" placeholder="A few words about you ...">A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>
                                        </base-input>
                                    </div>
                                </div>
                            </form> -->
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import nativeToast from 'native-toast'
  export default {
    name: 'user-profile',
    props: ["user"],
    
    methods : {
        clipboardSuccessHandler ({ value, event }) {
        nativeToast({
                message: "Event link copied on clipboard",
                position: 'north-east',
                timeout: 5000,
                type: 'success'
            })
        },
        clipboardErrorHandler ({ value, event }) {
        console.log('error', value)
        },
    },
    data() {
      return {
        model: {
          username: '',
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          country: '',
          zipCode: '',
          about: '',
        },
        value:3.5

      }
    },
    created() {
        console.log(this.user)
    },
    computed : {
        ...mapGetters(['tags','allevents']),
        get_tags () {
           return this.user.interests.map(tag_id=>{
                // console.log("came"+tag_id)
               return this.tags.find(tag_item=>tag_item.id==tag_id)
            })
        },
        newurl(){
           return window.location.href.replace('profile', 'eventdetails' )
        }, 
        getSelectedEvents () {
            return this.allevents.filter(event_item=>event_item.created_by==this.user.id)
        }
            
    }
  };
</script>
<style></style>
