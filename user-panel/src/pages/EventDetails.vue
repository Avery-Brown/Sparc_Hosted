<template>
  <div>
    <!-- <div class="main mt-5"> -->
    <div>
      <div style="background-color: rgb(18, 93, 248); height: 285px; box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);" class="section section-images">
        <div style="padding-top: 45px;" class="container" id="top">
          <div style="background-color: white; padding: 20px; padding-top:30px;  box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.5); margin-bottom: 40px;" class="col-md-12">
              <div class="row">
                  <div class="col-md-12">
                      <b-alert class="mb-5" v-if="!success && success != null" show variant="danger" dismissible> <i class="fa fa-warning"></i> {{msg}}</b-alert> <br/>
                      <b-alert class="mb-5" v-if="success" show variant="success" dismissible>{{msg}}</b-alert> <br/>
                  </div>
              </div>
            <div class="row" id="card-margin" style="padding-bottom: 0px;" >
                <div class="col-md-12">
                  <!-- <div style="font-size: 30px; margin-bottom: 0px; text-align: center; font-weight: 500; padding-top: 20px;">{{ getSelectedEvent[0].event_name }}</div> -->
                  <div style="display: flex; flex-direction: row; justify-content: space-between;">
                    <b-card v-if="getSelectedEvent[0].event_image != null" :img-src="getSelectedEvent[0].event_image == null ? noImage : getSelectedEvent[0].event_image" img-alt="Engagement image" style="margin-left: 30px; padding-top: 50px; width: 350px; box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0); margin-bottom: -20px;"></b-card>
                    <div style="padding-top: 50px; padding-right: 40px;">
                      <div style="font-size: 30px; margin-bottom: 10px; text-align: left; padding-left: 20px; font-weight: 500;">{{ getSelectedEvent[0].event_name }}</div>
                      <div style="display: flex; flex-direction: row; justify-content: flex-end;">
                        <div style="text-align: right; padding-right: 5px; font-size: 18px; padding-bottom: 5px;">
                          Hosted By
                        </div>
                        <div @click="viewProfile(getSelectedEvent[0].created_by)" style="text-align: right; padding-right: 15px; font-size: 18px; padding-bottom: 5px; color: rgb(54, 170, 252); text-decoration: underline;">{{userDetails.first_name}} {{userDetails.last_name}}</div>
                      </div>
                      <span class="pull-right" v-if="userDetails.first_name != undefined">
                        <h6 class="pull-right" style="margin-right: 15px; padding-bottom: 5px;">
                          <star-rating :rating="getAvgRatings(getSelectedEvent[0].created_by)" :increment="0.1" :star-size="16" :read-only="true"></star-rating>
                        </h6>
                        <h6 style="margin-right: 15px;" v-if="isUserLogged" class="text-info">
                          <i class="fa fa-mobile"></i> {{ getSelectedEvent[0].host_contact }}
                        </h6>
                      </span>
                    </div>
                  </div>


              	</div>
            </div>
            <div  style="border-bottom: 1px solid rgb(227, 227, 227); margin: 10px; padding-top: 10px; margin-bottom: 0px;">

            </div>

           	<div class= "row">
              <div class="col-sm-12">
              	  <div class="event-info">
              	  <h5 class="text-info"></h5>
              	  <h4 style="margin-top: -10px;"><b> Details </b></h4>
              	  <p style="color: black; font-weight: 400;">{{ getSelectedEvent[0].event_description }}</p>
                  <!-- <a class='btn btn-block' style="background-color: white; border: 1px solid #04773B; color: #04773B; width: 250px;" id="myBtn" @click="participateEvent" v-if="Date.parse(currentDate) <= Date.parse(getSelectedEvent[0].date) && shown "> -->
                  <a class='btn btn-block' style="background-color: rgb(18, 93, 248); color: white; width: 160px; margin: auto;" id="myBtn" @click="participateEvent" v-if="Date.parse(currentDate) <= Date.parse(getSelectedEvent[0].date) && shown ">
                    <span v-if="participated">Already Signed Up</span>
                    <span v-if="!participated">PARTICIPATE NOW</span>
                  </a>

              	  <h6 class="text-danger text-center"></h6>
              	  <div class="col-md-12" v-if="isUserLogged">
                      <h6 class="text-info"  style="font-size: 17px; margin-top: 20px; margin-left: -15px; font-weight: normal;">
                        <i class="fa fa-calendar" style = "color: #00487C;"></i> {{ getSelectedEvent[0].date }}
                        <i class="fa fa-clock-o" style = "color: #00487C; margin-left: 20px;"></i> {{ getSelectedEvent[0].start_time + " - " + getSelectedEvent[0].end_time }}
                      </h6>


                      <h6 class="text-info" style="font-size: 17px; margin-left: -15px; font-weight: normal;">
                        <i class="fa fa-map-marker" style = "color: #00487C;\"></i>
                        {{ getSelectedEvent[0].event_location }}
                        <i class="fa fa-address-card-o" style = "color: #00487C; margin-left: 20px;"></i>
                        {{ getSelectedEvent[0].event_address }}
                      </h6>

                      <h6 class="text-info" v-if= "getSelectedEvent[0].event_type == 'both'" style="font-size: 17px; margin-top: 10px; margin-left: -15px; font-weight: normal;">
                        <i class ="fa fa-network-wired" style = "color: #00487C"></i>   In Person and Virtual
                      </h6>

                      <h6 class="text-info"  v-else-if= "getSelectedEvent[0].event_type == 'virtual'" style="font-size: 17px; margin-top: 10px; margin-left: -15px; font-weight: normal;">
                        <i class ="fa fa-tv" style = "color: #00487C"></i> Virtual
                      </h6>

                      <h6 class="text-info"  v-else style="font-size: 17px; margin-top: 10px; margin-left: -15px; font-weight: normal;">
                        <i class ="fa fa-user-check" style = "color: #00487C"></i> {{getSelectedEvent[0].event_type.charAt(0).toUpperCase() + getSelectedEvent[0].event_type.substring(1)}}
                      </h6>

                      <h6 class="text-info"  v-if= "getSelectedEvent[0].event_free == 'yes'" style="font-size: 17px; margin-top: 10px; margin-left: -15px; font-weight: normal;">
                        <i class="fa fa-hand-holding-usd" style = "color: #00487C"></i>
                        Free
                      </h6>

                      <h6 class="text-info"  v-if="getSelectedEvent[0].event_price_per_person != null" style="font-size: 17px; margin-top: 10px; margin-left: -15px; font-weight: normal;">
                        $ {{getSelectedEvent[0].event_price_per_person}} PER PERSON
                      </h6>

                      <h6 class="text-info"  v-if="getSelectedEvent[0].event_cause1 != null" style="font-size: 17px; margin-top: 10px; margin-left: -15px; font-weight: normal;">
                        Charity 1: {{getSelectedEvent[0].charity1 + " (" + getSelectedEvent[0].event_cause1 + "%)"}}
                      </h6>

                      <h6 class="text-info" v-if="getSelectedEvent[0].event_cause2 != null" style="font-size: 17px; margin-top: 10px; margin-left: -15px; font-weight: normal;">
                        Charity 2: {{getSelectedEvent[0].charity2 + " (" + getSelectedEvent[0].event_cause2 + "%)"}}
                      </h6>

                      <h6 class="text-info"  v-if="getSelectedEvent[0].capacity != null" style="font-size: 17px; margin-top: 10px; margin-left: -15px; font-weight: normal;">
                        In Person Enrolled: {{total}}/{{getSelectedEvent[0].capacity}}
                      </h6>

                      <div v-if="getSelectedEvent[0].virtual_capacity != null">
                        <h6 class="text-info"  style="font-size: 17px; margin-top: 10px; margin-left: -15px; font-weight: normal;">
                          Virtual Enrolled: {{totalVirtual}}/{{getSelectedEvent[0].virtual_capacity}}
                        </h6>
                      </div>



                      <div class="row">
                        <div class="col-md-12">
                          <h6 class="text-info" style="font-size: 17px; margin-top: 5px; margin-left: -15px; font-weight: normal;" v-if="getSelectedEvent[0].event_location_access != null" :id="getHoverIdDirectionsByIndex(index)">
                            <i class="fa fa-compass" style = "color: #00487C"></i> Directions
                            <div style="color: black; font-size: 15px; margin-top: 5px;">
                              {{ getSelectedEvent[0].event_location_access }}
                            </div>
                          </h6>
                        <!-- <b-tooltip placement="right" :target="getHoverIdDirectionsByIndex(index)" triggers="hover">
                          	<b>{{ getSelectedEvent[0].event_location_access }}</b>
                        </b-tooltip> -->
                        </div>
                      </div>

                  </div>


              	  <div class= "col-md-12" v-if="isUserParticipant && (getSelectedEvent[0].event_type == 'virtual' || getSelectedEvent[0].event_type == 'both')">
                  	  <h6 class="title-up text-info" style="font-size: 17px; margin-left: -15px; margin-top: 5px; font-weight: normal;">
                        <i class ="fa fa-tv" style = "color: #00487C"></i> Engagement Links
                        <div style="color: black; font-size: 15px; margin-top: 5px;">
                          {{ getSelectedEvent[0].zoom_link }}
                        </div>
                      </h6>
                  		<!-- <div class="row">
                    	  <div class= "col-md-1">
                    	  </div>
                    	  <div class="col-md-8">
                      	    <h6>{{getSelectedEvent[0].zoom_link}}</h6>
                    	  </div>
                  		</div> -->
              	  </div>

              	  <div class="col-md-12" style="display: flex; flex-direction: row; justify-content: space-around;">
              	  	<span class="badge badge-pill badge-success" style="padding: 10px; margin-right: 10px; font-size: 15px; background-color: #e0e0e0; border: none; color: #505050; border-radius: 3px;" v-for="(tag,index) in getEventTags" :key="index">{{tag.value}}</span>
              	  </div>

              	  </div>
              	  <b-card class="mt-3 ml-auto mr-auto col text-center" v-if="getSelectedEvent[0].event_video != null">
                  <h4 class="title-up text-info">Engagement Video</h4>
                  <div class="row">
                    <div class="col">
                      <video :src="getSelectedEvent[0].event_video" controls class="ml-auto mr-auto video-element"></video>
                    </div>
                  </div>
                  </b-card>
              </div>



            </div>
            <!-- <div class="col-md-3">
                <div class="about-info">
                   <img class="rounded-circle" v-if="userDetails.profile_image != null" :src="userDetails.profile_image" width="30" alt="">
                   <span class="ml-3" v-if="userDetails.first_name != undefined">
                     <b>About {{userDetails.first_name}}</b>
                     <h6> {{userDetails.about}} </h6>
                     <h6> <star-rating :rating="getAvgRatings(getSelectedEvent[0].created_by)" :increment="0.1" :star-size="16" :read-only="true"></star-rating></h6>
                     <h6 v-if="isUserLogged" class="text-info"> <i class="fa fa-mobile"></i> {{ getSelectedEvent[0].host_contact }}</h6>
                   </span>
                   <button class="btn btn-info btn-block" @click="viewProfile(getSelectedEvent[0].created_by)">View Profile</button>
                </div>
            </div> -->

            <!-- <div class= "row" >

              <div class= "col-md-4">
              <b-card class="mt-3" v-if="Date.parse(currentDate) > Date.parse(getSelectedEvent[0].date) && isUserParticipant && !isUserRated">
                  <b-card-text>
                    <div class="col-md-12">
                      <h4 class="title-up text-info">Rate Your Experience</h4>
                      <star-rating v-model="submitEventRating.ratingStars" :star-size="36" :increment="0.5"></star-rating>
                      <h6 class="mt-3">Feedback</h6>
                      <div class="row">
                        <div class="col-md-8">
                        <textarea class="form-control" v-model="submitEventRating.feedback" placeholder="Give your Feedback..."></textarea>
                      </div>
                      <div class="col-md-3">
                        <button class="btn btn-success mt-3" @click="rateEngagementNow">Rate Now</button>
                      </div>
                      </div>
                    </div>
                  </b-card-text>
                </b-card>
                </div>

                <div class= "col-md-4">
                <b-card class="mt-2" v-if="Date.parse(currentDate) > Date.parse(getSelectedEvent[0].date)">
                  <b-card-text>
                    <h4 class="title-up text-info">Engagement Reviews</h4>
                    <div class="col-md-12" v-for="(rating, index) in getRatings" :key="index">
                      <h6 class="text-success">{{reviewedBy(rating.user_id).first_name}}</h6>
                      <star-rating :rating="rating.ratingStars" :read-only="true" :star-size="16" :increment="0.5"></star-rating>
                      <strong>{{rating.feedback}}</strong>
                      <hr>
                    </div>
                  </b-card-text>
                </b-card>
                </div>
            </div> -->








            <div class="row" >

              <div class="col-md-4">
                  <!-- <div class="event-info">
                      <h5 class="text-info"><b>Engagement Description</b></h5>
                      <p>{{ getSelectedEvent[0].event_description }}</p>
                      <h6 class="text-danger text-center"></h6>
                      <a class="btn btn-success text-white btn-block" id="myBtn" @click="participateEvent" v-if="Date.parse(currentDate) <= Date.parse(getSelectedEvent[0].date) && shown "> <span v-if="participated">Already Signed Up</span> <span v-if="!participated">PARTICIPATE NOW</span> </a>
                      <button class="btn btn-danger btn-block" v-else-if="Date.parse(currentDate) > Date.parse(getSelectedEvent[0].date)" disabled>Engagement Expired</button>
                  </div> -->
                  <!-- <div class="event-info mt-2">
                      <h5 class="text-info"><b>Engagement Extras</b></h5>
                      <h6><b class="text-success">Engagement Free: </b> {{getSelectedEvent[0].event_free}}</h6>
                      <h6><b class="text-success">Engagement Type: </b> {{getSelectedEvent[0].event_type}}</h6>
                      <h6 v-if="getSelectedEvent[0].event_cause1 != null"><b class="text-success">Charity 1: </b> {{getSelectedEvent[0].charity1 + " (" + getSelectedEvent[0].event_cause1 + "%)"}} </h6>
                      <h6 v-if="getSelectedEvent[0].event_cause2 != null"><b class="text-success">Charity 2: </b> {{getSelectedEvent[0].charity2 + " (" + getSelectedEvent[0].event_cause2 + "%)"}}</h6>
                      <h6 v-if="getSelectedEvent[0].event_price_per_person != null"><b class="text-success">Engagement Price: </b> $ {{getSelectedEvent[0].event_price_per_person}} PER PERSON</h6>
                      <h6><b class="text-success">Engagement Cause: </b> {{getSelectedEvent[0].cause}}</h6>

                      <h6 v-if="getSelectedEvent[0].capacity != null"><b class="text-success">People capacity: </b> {{getSelectedEvent[0].capacity}}</h6>
                      <h6 v-if="getSelectedEvent[0].capacity != null"><b class="text-success">Seats Reserved: </b> {{total}}</h6>
                      <div v-if="getSelectedEvent[0].capacity == null && getSelectedEvent[0].virtual_capacity != null">
                        <h6><b class="text-success">Virtual capacity: </b> {{getSelectedEvent[0].virtual_capacity}}</h6>
                        <h6><b class="text-success">Seats Reserved: </b> {{totalVirtual}}</h6>
                      </div>
                      <div v-if="getSelectedEvent[0].capacity != null && getSelectedEvent[0].virtual_capacity != null">
                        <h6><b class="text-success">Virtual capacity: </b> {{getSelectedEvent[0].virtual_capacity}}</h6>
                        <h6><b class="text-success">Seats Reserved: </b> {{totalVirtual}}</h6>
                      </div>

                      <h5 class="text-info mt-4"><b>Engagement Tags</b></h5>
                      <span class="badge badge-pill badge-success" style="margin: 1px; background-color: #e0e0e0; border: none; color: #505050; border-radius: 3px;" v-for="(tag,index) in getEventTags" :key="index">{{tag.value}}</span>
                  </div> -->
                  <!-- <div class="event-info mt-2"> -->
                    <!-- <h5 class="text-info"><b>Host Information</b></h5> -->
                     <p style="display:none;">{{getUserDetails(getSelectedEvent[0].created_by) }}</p>
                     <!-- <img class="rounded-circle" v-if="userDetails.profile_image != null" :src="userDetails.profile_image" width="30" alt=""> -->
                     <!-- <span class="ml-3" v-if="userDetails.first_name != undefined">
                       <b>{{userDetails.first_name + " " + userDetails.last_name}}</b>
                     </span> -->
                     <!-- <button class="btn btn-info btn-block" @click="viewProfile(getSelectedEvent[0].created_by)">View Profile</button> -->
                  <!-- </div> -->
                  <!-- <div class="mb-5">
                    <div class="event-info mt-2" v-if="getSelectedEvent[0].event_type == 'in Person' || getSelectedEvent[0].event_type == 'both'">
                    <h5 class="text-info"><b>In Person Participants</b></h5>
                      <div class="col-md-12" v-for="(user, index) in getParticipantsList" :key="index">
                        <strong class="text-success">{{ user.first_name + " " + user.last_name}}</strong>
                      </div>
                  </div>
                  <div class="event-info mt-2" v-if="getSelectedEvent[0].event_type == 'virtual' || getSelectedEvent[0].event_type == 'both'">
                    <h5 class="text-info"><b>Virtual Participants</b></h5>
                      <div class="col-md-12" v-for="(user, index) in getVirtualParticipantsList" :key="index">
                        <strong class="text-success">{{ user.first_name + " " + user.last_name}}</strong>
                      </div>
                  </div>
                  </div> -->

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :show.sync="modals.participateModal" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">Event Participation</h4>
      <h4 class="text-danger text-center">{{msg}}</h4>
      <a class="btn btn-success text-center text-white btn-block" v-clipboard="() => url" v-clipboard:success="clipboardSuccessHandler">Share</a>
      <button class="btn btn-danger btn-block" @click="dismiss">Close</button>
    </modal>

    <modal :show.sync="modals.selectModal" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">I want to Participate in</h4>
      <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">
            <button class="btn btn-warning" @click="virtualClick"> <i class="fa fa-video-camera"></i> Virtual</button>
          </div>
        <div class="col-md-4">
          <button class="btn btn-info" @click="inPersonClick"><i class="fa fa-user"></i> In Person</button>
        </div>

      </div>
      <a class="btn btn-success text-center text-white btn-block" v-clipboard="() => url" v-clipboard:success="clipboardSuccessHandler">Share</a>
      <button class="btn btn-danger btn-block" @click="dismiss">Close</button>
      </modal>

      <modal :show.sync="modals.payModal" headerClasses="justify-content-center">
        <h4 slot="header" class="text-danger text-center">Please Pay Participation Amount to Continue</h4>
        <div ref="card"></div>
        <button class="btn btn-primary btn-block" :disabled="disablePay" v-on:click="purchase(userEmail, getSelectedEvent[0].event_price_per_person)">Pay Now</button>
      </modal>

  </div>
</template>

<script>
let stripe = Stripe('pk_live_w6Z8KIXE8kMyrpj5jZ0Tqd1G00DWtY0TU3'),
    elements = stripe.elements(),
    card = undefined;
import { Parallax, FormGroupInput, Alert, Modal } from '@/components';
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import nativeToast from 'native-toast'
import moment from 'moment'
export default {
  name: 'event-details',
  bodyClass: 'event-details-page',
  destroyed() {
    card.destroy(this.$refs.card)
  },

   mounted: function () {

     let style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }

    };
    card = elements.create('card', {style: style});
    card.mount(this.$refs.card);
  },
  components: {
    Parallax,
    Alert,
    Modal,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {

      noImage: require('../../public/sparcS.png'),
      modals: {
        participateModal: false,
        selectModal: false,
        payModal: false
      },
      url: window.location.href,
      rating: 0,
      eventRating: 5,
      success: null,
      event: [],
      fetchedTags: [],
      tagName: [],
      newEvent: {
          id: null,
          userId: null
      },
      msg: null,
      userEvents: [],
      ratedEvents: [],
      total: 0,
      totalVirtual: 0,
      currentDate: null,
      userDetails: {},
      participated: false,
      participantsList: [],

      submitEventRating: {
        ratingStars: 0,
        feedback: null,
        host_id: null,
        event_id: null,
        user_id: null,
      },

      isUserParticipant: false,
      isUserRated: false,
      isUserLogged: false,
      fetchedRatings: [],
      shown: true,
      userEmail: null,
      type: null,
      disablePay: false,
      avgRating: []
    }
  },
  computed: {
    ...mapGetters(['getSelectedEvent', 'allTags', 'getParticipants', 'getVirtualParticipants', 'user','allUsers', 'allRatings', 'ratingDone']),

    getEventTags() {
        this.fetchedTags = this.getSelectedEvent[0].tags
        return this.fetchedTags.map(element => {
            let eventTag = this.allTags.find(tag => tag.id==element)
            return eventTag
        });
    },

    getParticipantsList() {
      this.participantsList = [];
      return this.getParticipants.map(item => {
        let user_item = this.allUsers.find(user => user.id == item)
          return user_item
      })
    },

    getVirtualParticipantsList() {
      return this.getVirtualParticipants.map(item => {
        let user_item = this.allUsers.find(user => user.id == item)
          return user_item
      })
    },

    getRatings() {
      this.fetchedRatings = [];
      let rating = this.allRatings.filter(item => item.event_id == this.newEvent.id)
      return rating;
    },
  },
  methods: {
    ...mapActions(['fetchEventById','createBill', 'fetchVirtualParticipants', 'fetchRatings', 'fetchTags', 'fetchParticipants', 'eventParticipant', 'virtualParticipant', 'fetchUser', 'fetchUserById', 'saveRating']),
    dismiss() {
      this.modals.participateModal = false
      this.modals.selectModal = false
    },

    getHoverIdDirectionsByIndex(index) {
      return "tooltip-target-direction" + index;
    },

    inPersonClick() {
      this.inPersonParticipate();
    },
    virtualClick() {
      console.log(this.getSelectedEvent[0].virtual_capacity)
      this.virtualParticipate();
    },
    copyLink() {
      var copyText = window.location.href;
      console.log(copyText)
      document.execCommand("copy");
    },

    clipboardSuccessHandler({ value, event }) {
        console.log('success', value)

        nativeToast({
          message: 'Link Copied to Clipboard',
          position: 'north-east',
          // Self destroy in 5 seconds
          timeout: 3000,
          type: 'success'
        })
    },

    reviewedBy(id) {
      let user_obj = {};
      this.allUsers.find(user_item=>{
        if(user_item.id===id) {
          user_obj = user_item
        }
      })
      return user_obj
    },

    getUserDetails(id) {
       let user_obj=this.allUsers.find(user_item=>user_item.id==id)
       this.userDetails = user_obj
       return user_obj
    },

    participateEvent() {
      const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
      if(loggedUser != null) {
        // for(var key in this.getSelectedEvent[0].users_attending){
        //     this.userEvents.push(this.getSelectedEvent[0].users_attending[key])
        // }
        console.log(this.userEvents)
        if(this.userEvents.find(element => element == this.newEvent.id)) {
          console.log("Already Signed Up")
          this.msg = "You are Already Signed Up"
          this.modals.participateModal = true
          this.participated = true
          return;
        }
        if(this.getSelectedEvent[0].event_type == 'in Person'){
          this.inPersonParticipate();
        }
        if(this.getSelectedEvent[0].event_type == 'virtual'){
          this.virtualParticipate();
        }
        if(this.getSelectedEvent[0].event_type == 'both') {
          this.modals.selectModal = true
          return;
        }
      }
      else {
        this.modals.participateModal = true
        this.msg = "Please Login to Participate"
      }
    },

    inPersonParticipate() {
      this.modals.selectModal = false
      if(this.total >= this.getSelectedEvent[0].capacity) {
        this.modals.participateModal = true
        this.msg = "Sorry! All seats are reserved"
        return;
      }
      if(this.getSelectedEvent[0].event_price_per_person != null){
        this.type = 'in Person'
        this.modals.payModal = true
        //this.msg = "Please Pay Engagement Fee to particpate"
        return;
      }

      this.sendEmail()
      this.eventParticipant(this.newEvent)
      this.total++;
      this.modals.participateModal = true
      this.msg = "Your Seat has been confirmed"
      this.shown = false
      return;

    },

    virtualParticipate() {
      this.modals.selectModal = false
      if(this.totalVirtual >= this.getSelectedEvent[0].virtual_capacity) {
        this.modals.participateModal = true
        this.msg = "Sorry! All seats are reserved"
        return;
      }
      if(this.getSelectedEvent[0].event_price_per_person != null){
        this.type = 'virtual'
        this.modals.payModal = true
        //this.msg = "Please Pay Engagement Fee to particpate"
        return;
      }
      this.sendEmail()
      this.virtualParticipant(this.newEvent);
      this.totalVirtual++;
      this.modals.participateModal = true
      this.msg = "Your Seat has been confirmed"
      this.shown = false
      return;
    },

    paidParticipant(price, by) {
      if(this.type == 'in Person') {
        this.sendEmail()
        this.eventParticipant(this.newEvent)
        const bill = {
          user_id: this.newEvent.userId,
          event_id: this.newEvent.id,
          amount: price,
          host_id: by
        }
        this.createBill(bill, by);
        this.total++;
        this.modals.payModal = false
        this.modals.participateModal = true
        this.msg = "Your Seat has been confirmed"
        this.shown = false
        this.disablePay = false
        return;
      }
      if(this.type == 'virtual') {
        this.sendEmail()
        this.virtualParticipant(this.newEvent);
        const bill = {
          user_id: this.newEvent.userId,
          event_id: this.newEvent.id,
          amount: price,
          host_id: by
        }
        this.createBill(bill);
        this.totalVirtual++;
        this.modals.payModal = false
        this.modals.participateModal = true
        this.msg = "Your Seat has been confirmed"
        this.shown = false
        this.disablePay = false
        return;
      }
    },

    viewProfile(id) {
      this.$router.push({path:'/users/'+id})
    },

    rateEngagementNow() {
      if(this.submitEventRating.ratingStars > 0) {
        this.submitEventRating.host_id = this.getSelectedEvent[0].created_by;
        this.submitEventRating.user_id = this.newEvent.userId;
        this.submitEventRating.event_id = this.$route.params.eventId;

        this.saveRating(this.submitEventRating);

        console.log("Feedback " +  this.submitEventRating.feedback)
        console.log("Stars " +  this.submitEventRating.ratingStars)
        console.log("Host " +  this.submitEventRating.host_id)
        console.log("User " +  this.submitEventRating.user_id)
        console.log("Event " +  this.submitEventRating.event_id)
      }
    },

    sendEmail() {
      axios.post('https://us-central1-sparc-9d9cb.cloudfunctions.net/sendMail', {
        dest: this.userEmail,
        event: this.getSelectedEvent[0].event_name,
        end_time: this.getSelectedEvent[0].end_time,
        start_time: this.getSelectedEvent[0].start_time,
        date: this.getSelectedEvent[0].date,
        host_contact: this.getSelectedEvent[0].host_contact,
        event_address: this.getSelectedEvent[0].event_address,
        event_location_access: this.getSelectedEvent[0].event_location_access,
        event_space: this.getSelectedEvent[0].event_space,

      }).then(() => {
        console.log('Email Sent')
      }).catch(err => console.log("Error " + err))
    },

    sendReminder(){
        axios.post('https://us-central1-sparc-9d9cb.cloudfunctions.net/sendReminder', {
            dest: this.userEmail,
            event: this.getSelectedEvent[0].event_name,
            end_time: this.getSelectedEvent[0].end_time,
            start_time: this.getSelectedEvent[0].start_time,
            date: this.getSelectedEvent[0].date,
            host_contact: this.getSelectedEvent[0].host_contact,
            event_address: this.getSelectedEvent[0].event_address,
            event_location_access: this.getSelectedEvent[0].event_location_access,
            event_space: this.getSelectedEvent[0].event_space,

        }).then(() => {
            console.log('Email Sent')
        }).catch(err => console.log("Error " + err))
    },

    purchase(userEmail, price) {
      console.log('pay')
      this.disablePay = true
      //console.log(e)
      var self = this;
    stripe.createToken(card).then(function(result) {
      if (result.error) {
        self.hasCardErrors = true;
        self.disablePay = false;
        self.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
        return;
      }
      // Access the token with result.token
      console.log(result)
      console.log(price*100)
      axios.post('https://us-central1-sparc-9d9cb.cloudfunctions.net/CheckoutSession', {
        amount: price*100,
        email: userEmail,
        stripeToken: result.token
      }).then(result => {
          if(result.data.status == 'succeeded'){

            self.paidParticipant(price, self.getSelectedEvent[0].created_by);
          }
        }).catch(err => {
          self.disablePay = false;
          console.log(err)
        })

    });
  },

  getAvgRatings(id) {
      let avgRating = [];
      this.allRatings.filter(rating => {
        if(rating.host_id == id) {
          avgRating.push(rating.ratingStars)
        }
      })

      if(avgRating.length > 0) {
        let sum = 0.0;
        let avg = 0.0;

        for(var i = 0; i < avgRating.length; i++) {
          sum += avgRating[i]
        }
        avg = sum / avgRating.length;
        return avg
      }
    },
  },
  created() {

    this.fetchUser();
    this.newEvent.id = this.$route.params.eventId
    this.fetchTags();
    this.fetchParticipants(this.newEvent);

    this.fetchVirtualParticipants(this.newEvent);

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    this.currentDate = mm + "/" + dd + "/" + yyyy;

    this.fetchEventById(this.newEvent);

    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if(loggedUser != null) {
        this.userEmail = loggedUser.email
        console.log("Email")
      console.log(this.userEmail)
        this.newEvent.userId = loggedUser.id
        this.isUserLogged = true;
        for(var key in loggedUser.events_attended){
          this.userEvents.push(loggedUser.events_attended[key])
        }
        // for(var key in this.getSelectedEvent[0].users_attending){
        //   this.userEvents.push(this.getSelectedEvent[0].users_attending[key])
        // }
        if(this.userEvents.find(element => element == this.newEvent.id)) {
          this.isUserParticipant = true
          console.log(this.isUserParticipant)
        }

        for(var key in loggedUser.events_rated) {
          this.ratedEvents.push(loggedUser.events_rated[key])
        }
        if(this.ratedEvents.find(element => element == this.newEvent.id)) {
          this.isUserRated = true
          console.log("Rated" + this.isUserRated)
        }
    }
  },
  watch: {
      getParticipated(val) {
        console.log('Watching')
          if(val) {
              setTimeout(() => {
                  if(val == 'success'){
                    this.success = true
                    this.modals.payModal = false
                    this.modals.participateModal = true
                    this.msg = "Your Seat Has Been Confirmed. Please check your Email"
                    console.log("Confirmed")
                    document.getElementById("myBtn").style.display = 'none';
                  }
                }, 500)
          }
          else {
            console.log('No Val')
          }
      },

      ratingDone(val) {
        if(val) {
          setTimeout(() => {
                  if(val == 'success'){
                    this.isUserRated = true
                    console.log("You Rated")
                  }
                }, 500)
        }
      },

      getParticipants(val) {
        if(val) {
          this.total = val.length;
        }
      },
      getVirtualParticipants(val) {
        if(val) {
          this.totalVirtual = val.length;
        }
      }
  }
};

</script>
<style scoped>
  input[type="text"] {
    color: #fff;
  }
  #image {
      max-width: 100%;
      width: 100%;
      height: 400px;
  }
  #card-margin {
      margin-top: -70px;
  }
  .about-info {
    padding: 10px;
    border: 2px solid #F5F5F5;
    background-color: #F5F5F5;
  }
  .event-info {
    padding: 10px;
    border: 2px solid #ffffff;
  }
  #top {
    margin-top: -70px;
  }

  .StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}

video {
  width: 100%;
}
</style>
