<!--This code was developed in part by Lizzet Clifton, Eric Lin, Jordan Shapiro, and Katelyn Chang for Duke CS408-->
<template>
  <div>
    <div class="main">
      <div class="section section-images">
        <div class="container" id="top">
          <div class="col-md-12">
            <div class ="row" style="margin-top: 3rem;">
              <div class ="col">
                <h2 style="color: #484848;">View your past engagements</h2>
              </div>
            </div>

            <div class = "row">
              <div class = "col text-center">
                <div v-if="isFiltering">
                  <lottie :options="loadingOptions" :width="200" :height="200" style="margin-top: 3rem;"/>
                </div>
                <div v-else-if="foundEvents.length == 0" class="text-center">
                  <h4><p style="display: inline-block; font-size: 23px; color: #c91512; font-weight: bold;">Oops!</p> Looks like no past engagements were found</h4>
                  <second-lottie :options="errorOptions" :width="300" :height="300" />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12" v-for="(event, index) in foundEvents"  :key="index">
                <div v-if="Date.parse(currentDate) > Date.parse(event.date)">
                  <div class="card" >
                    <div class="card-body">
                          <div class = "row">
                            <div class = "col-md-3 text-center mt-auto mb-auto">
                              <div class = "row" style = "margin-top: 40px; margin-bottom: 40px">
                                <div class = "col">
                                  <img v-if="event.event_image != null" :src="event.event_image" style = "width: 110px; height: 110px; border-radius: 50%;" alt="" @click="viewEvent(event.id)">
                                  <img v-else src="../../public/sparc_card_back.jpg" style = "max-width: 100px;" alt="" @click="viewEvent(event.id)">
                                </div>
                              </div>
                              
                              <div class = "row" style="mt-auto mb-auto">
                                <div class = "col">
                                  <p style = "font-size: 14px;" v-if="event.event_type === 'both'"><i class ="fa fa-network-wired" style = "color: #484848"></i>  &nbsp; In Person & Virtual</p>
                                  <p style = "font-size: 14px;" v-else-if="event.event_type === 'virtual'"><i class ="fa fa-tv" style = "color: #484848"></i> &nbsp; {{event.event_type.charAt(0).toUpperCase() + event.event_type.substring(1)}}</p>
                                  <p style = "font-size: 14px;" v-else><i class ="fa fa-user-check" style = "color: #484848"></i> &nbsp; {{event.event_type.charAt(0).toUpperCase() + event.event_type.substring(1)}}</p>
                                </div>
                              </div>
                            </div>
                            <div class = "col-md-9 mt-auto mb-auto">
                              <div class = "row">
                                <div class = "col">
                                    <p style="font-size: 20px; margin-top: 12px; font-weight: 500" :id="getHoverIdTitleByIndex(index)"> {{ transformTitle(event.event_name) }} </p>
                                    <b-tooltip v-if="event.event_name.length > 63" :target="getHoverIdTitleByIndex(index)" placement="top" triggers="hover">
                                      <p class="mt-auto mb-auto"> {{ event.event_name }} </p>
                                    </b-tooltip>
                                </div>
                              </div>
                              <div class = "row">
                                <div class = "col-md-8">
                                  <div class = "row">
                                    <div class = "col-md-7">
                                      <div class = "row ml-auto mr-auto">
                                        <div class = "col-md-4 mt-auto mb-auto">
                                          <img class="image-class" width="40" height="40" :src="getPhoto(getUser(event.created_by))" alt="">
                                        </div>
                                        <div class = "col-md-8">
                                          <div class = "row">
                                              <b>{{getName(getUser(event.created_by))}}</b>
                                          </div>
                                          <div class = "row">
                                              <h6> <star-rating :rating="getRatings(event.created_by)" :increment="0.1" :star-size="16" :read-only="true"></star-rating></h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class = "col-md-5 mb-auto" >
                                        <button class = 'btn pull-right' style="background: #f4f4f4; color: #5f6368; font-weight: 600; font-size: 12px; border-radius: 7px; margin-bottom: 20px;" @click="viewEvent(event.id)">View</button>
                                    </div>
                                  </div>
                                  <div class = "row">
                                      <div class = "col mt-auto mb-auto">
                                        <read-more  style = "margin-bottom: 15px; font-size: 12px;" more-str="Read More..." :text="event.event_description" link="#" less-str="Read Less..." :max-chars="200"></read-more>
                                      </div>
                                  </div>
                                </div>
                                <div class = "col-md-4">
                                  <div class = "row">
                                    <div class = "col">
                                      <p v-if="event.event_price_per_person == null" style="font-size: 14px; font-weight: 400"><i class="fa fa-hand-holding-usd" style = "color: #484848"></i>&nbsp; Free</p>
                                      <p v-else style="font-size: 14px; font-weight: 400"><i class="fa fa-hand-holding-usd" style = "color: #484848"></i>&nbsp;${{ event.event_price_per_person }} per person</p>
                                    </div>
                                  </div>
                                      <p v-if="event.event_address != null" style="font-size: 14px; font-weight: 400"><i class="fa fa-location-arrow" style = "color: #484848"></i>&nbsp; {{ event.event_address }}</p>
                                  <div class = "row">
                                    <div class = "col">
                                      <p v-if="event.event_location != null" style="font-size: 14px; font-weight: 400"><i class="fa fa-building" style = "color: #484848"></i>&nbsp; {{ event.event_location }}</p>
                                    </div>
                                  </div>
                                  <div class = "row">
                                    <div class = "col">
                                      <p v-if="event.event_location_access != null" :id="getHoverIdDirectionsByIndex(index)" style="color: #50a9eb; font-weight:500; font-size: 14px; text-decoration: underline"><i class="fa fa-compass" style = "color: #484848; margin-right: 7px;" ></i>Directions</p>
                                      <b-tooltip placement="bottomleft" :target="getHoverIdDirectionsByIndex(index)" triggers="hover">
                                        <b>{{ event.event_location_access }}</b>
                                      </b-tooltip>
                                    </div>
                                  </div>
                                  <div class = "row">
                                    <div class ="col">
                                        <span class="badge badge-pill badge-success" style="font-size: 9px; margin: 1px; background-color: #e0e0e0; border: none; color: #505050; border-radius: 3px;" v-for="(tag,index) in getEventTags(event)" :key="index" v-if="index <= 1 && tag != null"> {{tag.value}} </span>
                                        <span v-if="getEventTags(event).length > 1" :id="getHoverIdTagsByIndex(index)" class="badge badge-pill badge-success" style="font-size: 9px; margin: 1px; background-color: #e0e0e0; border: none; color: #505050; border-radius: 3px;">...</span>
                                        <b-tooltip :target="getHoverIdTagsByIndex(index)" placement="bottomleft" triggers="hover">
                                            <p style="margin-top: 0px; margin-bottom: 1px; font-size: 14px;">Other Tags</p>
                                            <span class="badge badge-pill badge-success" style="margin: 1px; background-color: #e0e0e0; border: none; color: #505050; border-radius: 3px;" v-for="(tag,index) in getEventTags(event)" :key="index" v-if="index > 1 && tag != null"> {{tag.value}} </span>
                                        </b-tooltip>
                                    </div>
                                  </div>
                                  
                                  

                                  
                                </div>
                              </div>

                            </div>
                          </div>

                          <div class = "row">
                            <div class = "col-md-3 text-center mt-auto mb-auto">
                              <div class = "row">
                                <div class = "col text-center" style="margin-top: -10px;">
                                  <span v-if="getUser(event.created_by) != null && getUser(event.created_by).facebook != '' && getUser(event.created_by).facebook != null"><a :href="'https://' + getUser(event.created_by).facebook" target="_blank"><i class="fab fa-facebook fa-lg" style = "color: #3b5998; margin-left: 10px; margin-right: 10px;"></i></a></span>
                                
                                  <span v-if="getUser(event.created_by) != null && getUser(event.created_by).instagram != '' && getUser(event.created_by).instagram != null"><a :href="'https://' + getUser(event.created_by).instagram" target="_blank"><i class="fab fa-instagram fa-lg" style = "color: #cf2872; margin-left: 10px; margin-right: 10px;"></i></a></span>
                                
                                  <span v-if="getUser(event.created_by) != null && getUser(event.created_by).twitter != '' && getUser(event.created_by).twitter!= null"><a :href="'https://' + getUser(event.created_by).twitter" target="_blank"><i class="fab fa-twitter fa-lg" style = "color: #00aced; margin-left: 10px; margin-right: 10px;"></i></a></span>
                                
                                  <span v-if="getUser(event.created_by) != null && getUser(event.created_by).linkedin != '' && getUser(event.created_by).linkedin != null"><a :href="'https://' + getUser(event.created_by).linkedin" target="_blank"><i class="fab fa-linkedin fa-lg" style = "color: #0077b6; margin-left: 10px; margin-right: 10px;"></i></a></span>
                                </div>
                              </div>
                            </div>
                            <div class = "col-md-9 mt-auto mb-auto">
                              <div class = "row">
                                <div class = "col-md-8">
                                  <div class = "row">
                                    <div class = "col-md-3">
                                      <p style="font-size: 14px; font-weight: 400"> <i class="fa fa-calendar" style = "color: #484848"></i> {{ event.date }}</p>
                                    </div>
                                    <div class = "col-md-9">
                                      <p style="font-size: 14px; font-weight: 400"> <i class="fa fa-clock-o" style = "color: #484848"></i> {{ event.start_time + " - " + event.end_time }} </p>
                                    </div>
                                  </div>
                                </div>
                                <div class = "col-md-4">
                                </div>
                              </div>
                            </div>
                          </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Parallax, FormGroupInput } from '@/components';
import nativeToast from 'native-toast'
import { mapGetters, mapActions } from 'vuex'
import Lottie from 'vue-lottie'
import loadingAnimationData from '../../lotties/1301-round-cap-material-loading.json'
import errorAnimationData from '../../lotties/629-empty-box.json'
import axios from 'axios'

export default {
  name: 'past-events',
  bodyClass: 'past-events-page',
  components: {
    Parallax,
    [FormGroupInput.name]: FormGroupInput,
    'lottie': Lottie,
    'second-lottie': Lottie,
  },
  data() {
    return {
      rating: 5,
      currentDate: null,
      userEvents: [],
      allEvents: [],
      isFiltering: false,
      loadingOptions: { animationData: loadingAnimationData },
      errorOptions: { animationData: errorAnimationData },
      url: null,
      foundEvents: [],
      getUsers: [],
    }
  },
  computed: {
    ...mapGetters(['allRatings', 'allUsers']),
    getUpcomingEvents() {
      return this.userEvents.map(event_id=> {
        let event_item=this.allEvents.find(event_item=> {
          if(event_item.id==event_id && event_item.deleted == false && Date.parse(this.currentDate) > Date.parse(event_item.date)) {
            this.foundEvents.push(event_item)
          }
        })
          console.log(this.foundEvents);
          return this.foundEvents;

          })
    },
  },
  methods: {
    ...mapActions(['fetchEvents', 'fetchUser']),

    viewEvent(id) {
      this.$router.push('/events/'+id)
    },
    getEventTags(event, hasHidden) {
        return event.tags.map(element => {
            let eventTag = this.allTags.find(tag => tag.id==element)
            return eventTag
        });
    },
    getTwoEventTags(event) {
      return event.tags.map((element, index) => {
            if (index < 2) {
              let eventTag = this.allTags.find(tag => tag.id==element)
              return eventTag
            }
        });
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
    getHoverIdDirectionsByIndex(index) {
      return "tooltip-target-direction" + index;
    },
    getHoverIdTagsByIndex(index) {
      return "tooltip-target-tag" + index;
    },
    getHoverIdTitleByIndex(index) {
      return "tooltip-target-title" + index;
    },
    transformTitle(title) {
      let transformedTitle = title;
      if (title.split("").length > 49) {
        transformedTitle = title.substring(0,49) + '...'
      }
      return transformedTitle;
    },
    getUser(id) {
      let user_item = this.getUsers.find(user => 
         Object.keys(user)[0] === id
      )
      if (user_item != null){
        var user = user_item[Object.keys(user_item)[0]]
        return user;
      }
    },
    getPhoto(user) {
      if (user == null){
        return
      } else {
        return user.profile_image;
      }
    },
    getName(user) {
      if (user == null) {
        return
      } else {
        return user.first_name + " " + user.last_name;
      }
    },
    getRatings(id) {
      let avgRating = [];
      this.ratings.filter(rating => {
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
    eventsPromise() {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          var events = await axios.get('https://us-central1-sparc-9d9cb.cloudfunctions.net/getEvents');
          var eventsArray = [];
          Object.keys(events.data).forEach((key) => {
            eventsArray.push({...events.data[key], id: key});
          });
          resolve(eventsArray);
        }, 750)

      })
    },
    async getEvents() {
      var eventsArray = await this.eventsPromise();
      return eventsArray;
    },
    async getAllUsers() {
      var users = await axios.get('https://us-central1-sparc-9d9cb.cloudfunctions.net/getUsers');
      var usersArray = [];
      Object.keys(users.data).forEach((key) => {
        usersArray.push({[key]: users.data[key]});
      });
      return usersArray;
    },
    async getAllRatings() {
      var ratings = await axios.get('https://us-central1-sparc-9d9cb.cloudfunctions.net/getRatings');
      var ratingsArray = [];
      Object.keys(ratings.data).forEach((key) => {
        ratingsArray.push(ratings.data[key]);
      });
      return ratingsArray;
    },
    async getTags() {
      var tags = await axios.get('https://us-central1-sparc-9d9cb.cloudfunctions.net/getTags');
      var tagsArray = [];
      Object.keys(tags.data).forEach((key) => {
        tagsArray.push({...tags.data[key], id: key});
      })
      return tagsArray;
    },
  },
    async created() {
      this.fetchEvents();

      this.isFiltering = true;

      this.allEvents = await this.getEvents();
      this.allTags = await this.getTags();
      this.getUsers = await this.getAllUsers();
      this.ratings = [];
      this.ratings = await this.getAllRatings();

      this.isFiltering = false;

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();

      this.currentDate = mm + "/" + dd + "/" + yyyy;

      var link = window.location.href;
      this.url = link.replace('/past-events', '/events/')

      this.fetchUser();

      const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        for(var key in loggedUser.events_attended){
          this.userEvents.push(loggedUser.events_attended[key])
        }

        this.getUpcomingEvents;
  }
};
</script>
<style scoped>
  #top {
    margin-top: -70px;
  }
  .tooltip-inner {
      max-width: 800px !important;
  }
</style>
