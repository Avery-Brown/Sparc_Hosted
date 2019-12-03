<template>
  <div>
    <div class="main">
      <div class="section section-images">
        <div class="container" id="top">
          <div class="col-md-12">
            <div class="row text-center">
              <div class="col-md-12">
                <h2 class="text-center ml-3 title title-up mb-5">Past Engagements</h2>
              </div>
            </div>

            <div class="row">

              <div class="col-md-12" v-for="(event, index) in foundEvents" v-if="event.deleted==false"  :key="index">
                <div v-if="Date.parse(currentDate) > Date.parse(event.date)">
                  <div class="card" style="cursor: pointer" >
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
                                  <p style = "font-size: 14px;" v-if="event.event_type === 'both'"><i class ="fa fa-network-wired" style = "color: #00487C"></i>  &nbsp; In Person & Virtual</p>
                                  <p style = "font-size: 14px;" v-else-if="event.event_type === 'virtual'"><i class ="fa fa-tv" style = "color: #00487C"></i> &nbsp; {{event.event_type.charAt(0).toUpperCase() + event.event_type.substring(1)}}</p>
                                  <p style = "font-size: 14px;" v-else><i class ="fa fa-user-check" style = "color: #00487C"></i> &nbsp; {{event.event_type.charAt(0).toUpperCase() + event.event_type.substring(1)}}</p>
                                </div>
                              </div>
                            </div>
                            <div class = "col-md-9 mt-auto mb-auto">
                              <div class = "row">
                                <div class = "col">
                                  <h4 :id="getHoverIdTitleByIndex(index)"> {{ transformTitle(event.event_name) }} </h4>
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
                                      <p v-if="event.event_price_per_person == null" style="font-size: 14px"><i class="fa fa-hand-holding-usd" style = "color: #00487C"></i>&nbsp; Free</p>
                                      <p v-else style="font-size: 14px"><i class="fa fa-hand-holding-usd" style = "color: #00487C"></i>&nbsp;${{ event.event_price_per_person }} per person</p>
                                    </div>
                                  </div>
                                      <p v-if="event.event_address != null" style="font-size: 14px"><i class="fa fa-location-arrow" style = "color: #00487C;"></i>&nbsp; {{ event.event_address }}</p>
                                  <div class = "row">
                                    <div class = "col">
                                      <p v-if="event.event_location != null" style="font-size: 14px"><i class="fa fa-building" style = "color: #00487C"></i>&nbsp; {{ event.event_location }}</p>
                                    </div>
                                  </div>
                                  <div class = "row">
                                    <div class = "col">
                                      <p v-if="event.event_location_access != null" :id="getHoverIdDirectionsByIndex(index)" style="color: #00487C; font-weight:400; font-size: 14px;"><i class="fa fa-compass" style = "color: #00487C"></i>&nbsp; Directions</p>
                                      <b-tooltip placement="bottomleft" :target="getHoverIdDirectionsByIndex(index)" triggers="hover">
                                        <b>{{ event.event_location_access }}</b>
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
                                <div class = "col-2">
                                </div>
                                <div class =" col ">
                                  <p><i class="fab fa-facebook fa-md" style = "color: #00487C;"></i></p>
                                </div>
                                <div class =" col ">
                                  <p><i class="fab fa-twitter fa-md" style = "color: #00487C"></i></p>
                                </div>
                                <div class =" col ">
                                  <p><i class="fab fa-linkedin fa-md" style = "color: #00487C"></i></p>
                                </div>
                                <div class = "col-2">
                                </div>
                              </div>
                            </div>
                            <div class = "col-md-9 mt-auto mb-auto">
                              <div class = "row">
                                <div class = "col-md-8">
                                  <div class = "row">
                                    <div class = "col-md-3">
                                      <p style="font-size: 14px;"> <i class="fa fa-calendar" style = "color: #00487C"></i> {{ event.date }}</p>
                                    </div>
                                    <div class = "col-md-9">
                                      <p style="font-size: 14px;"> <i class="fa fa-clock-o" style = "color: #00487C"></i> {{ event.start_time + " - " + event.end_time }} </p>
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
export default {
  name: 'past-events',
  bodyClass: 'past-events-page',
  components: {
    Parallax,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      rating: 5,
      currentDate: null,
      userEvents: [],
      url: null,
      foundEvents: []
    }
  },
  computed: {
    ...mapGetters(['getEvents', 'allRatings', 'allUsers']),
    getUpcomingEvents() {
      return this.userEvents.map(event_id=> {
        let event_item=this.getEvents.find(event_item=> {
          if(event_item.id==event_id && event_item.deleted == false && Date.parse(this.currentDate) > Date.parse(event_item.date)) {
            this.foundEvents.push(event_item)
          }
        })
          return this.foundEvents;

          })
    },

    filterPast() {
          let event = this.getUpcomingEvents.filter(event => Date.parse(this.currentDate) > Date.parse(event.date))
          return event
        }
  },
  methods: {
    ...mapActions(['fetchEvents', 'fetchUser']),

    viewEvent(id) {
      this.$router.push('/events/'+id)
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
    getEventTags(event, hasHidden) {
        return event.tags.map(element => {
            let eventTag = this.allTags.find(tag => tag.id==element)
            return eventTag
        });
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
      let user_item = this.allUsers.find(user => user.id === id)
        return user_item
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
    this.fetchEvents();

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
      this.getUpcomingEvents
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
