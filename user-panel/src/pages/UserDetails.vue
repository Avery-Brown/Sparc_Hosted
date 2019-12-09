<!--This code was developed in part by Lizzet Clifton, Eric Lin, Jordan Shapiro, and Katelyn Chang for Duke CS408-->
<template>
  <div>
    <div class="main">
      <div class="section section-images">
        <div class="container" id="top">
          <div class="col-md-12">
            <div class="row text-center">
              <div class="col-md-12">
                <h2 class="text-center ml-3 title title-up mb-5">Host Information</h2>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <div class = "row" style = "margin-top: 30px; margin-bottom: 30px; margin-left: 40px; margin-right: 40px">
                  <div class = "col-md-4">
                    <div class="photo-container text-center mt-3" style= "margin-bottom: 25px">
                      <img class="rounded-circle" width="150" height="150" v-if="this.user.profile_image!= null" :src="this.user.profile_image" alt="" />
                    </div>
                    <div class="user-details text-center mt-3" style= "margin-bottom: 25px">
                      <h4><b>{{ this.user.first_name + " " + this.user.last_name}}</b></h4>
                    </div>
                    <div class="user-details text-center mt-3">
                      <h6><b style= "color: #484848">Age :</b> {{ this.user.age }} Years</h6>
                      <h6><b style= "color: #484848">Occupation :</b> {{ this.user.job_occupation }}</h6>
                      <h6><b style= "color: #484848">Institute :</b> {{ this.user.institute }}</h6>
                    </div>
                    <div class="text-center mt-3">
                      <h6 class="title-up ml-3 pull-left">Events Hosted: <b> {{ this.user.events_hosted != null ? Object.keys(this.user.events_hosted).length : 0 }} </b></h6>
                      <h6 class="title-up ml-3">Events Attended: <b> {{ this.user.events_attended != null ? Object.keys(this.user.events_attended).length : 0 }} </b></h6>
                    </div>
                  </div>

                  <div class="col-md-8">
                    <div class="about" style= "margin-top: -20px">
                      <h4><b>About</b></h4>
                        <div class = "about" style= "margin-left: 15px">
                          {{this.user.about}}
                        </div>
                    </div>
                    <div class="video" v-if="this.user.profile_video">
                      <h4><b>Host Video</b></h4>
                      <video class="pr-3 pl-3" :src="this.user.profile_video" width="300" controls ></video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12">
            <div class="row text-center">
              <div class="col-md-12">
                <h2 class="text-center ml-3 title title-up mb-5">Engagements Hosted</h2>
              </div>
            </div>
            <div class="col-md-12" v-for="(event, index) in getUserEvents" v-if="event.deleted==false" :key="index">
              <div class="card" style="cursor: pointer">
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
                        <div class = "col mt-auto mb-auto">
                          <read-more  style = "margin-bottom: 15px; font-size: 12px;" more-str="Read More..." :text="event.event_description" link="#" less-str="Read Less..." :max-chars="200"></read-more>
                        </div>
                         <div class = "col-md-2 mb-auto" >
                                        <button class = 'btn pull-right' style="background: #f4f4f4; color: #5f6368; font-weight: 600; font-size: 12px; border-radius: 7px; margin-bottom: 20px;" @click="viewEvent(event.id)">View</button>
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
</template>
<script>
import { Parallax, FormGroupInput } from '@/components';


import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'user-details',
  bodyClass: 'user-details-page',
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
      userId: null,
    }
  },
  computed: {
    ...mapGetters(['getEvents', 'user']),
    getUserEvents() {
        //return this.userEvents.map(event_id=> {
          this.userEvents = []
          let event_item=this.getEvents.filter(item=>{
            if(item.created_by == this.$route.params.userId && item.deleted == false) {
              this.userEvents.push(item)
            }
          })
              return this.userEvents
            //})
    }
  },
  methods: {
    ...mapActions(['fetchEvents', 'fetchUserById']),

    viewEvent(id) {
      this.$router.push('/events/'+id)
    },
    clipboardSuccessHandler({ value, event }) {
        console.log('success', value)
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
      if (title.split("").length > 40) {
        transformedTitle = title.substring(0,40) + '...'
      }
      return transformedTitle;
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
    this.url = link.replace('/upcoming-events', '/events/')

    this.userId = this.$route.params.userId;

    // this.fetchUser();
    this.fetchUserById(this.userId)
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
      // for(var key in loggedUser.events_attended){
      //   this.userEvents.push(loggedUser.events_attended[key])
      // }
  }
};
</script>
<style scoped>
  #top {
    margin-top: -70px;
  }
  /*
  .card {
      border: 1px solid #2CA8FF;
  }*/
</style>
