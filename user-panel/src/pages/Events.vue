<template>
  <div>
    <div class="main">
      <div class="section section-images">
        <div class="container" id="top">
          <div class="col-md-12">
            <div class="row text-center">
              <div class="col-md-12">
              </div>

            </div>
            <div class="row mb-5">
              <div class="col-md-3">
                <label for="typeFilter" ><b>Search By Type</b></label>
                <select class="form-control select" v-model="typeFilter" @change="getType">
                  <option value="">Select Type</option>
                  <option value="virtual">Virtual</option>
                  <option value="in Person">In Person</option>
                  <option value="In-Person & Digital">In-Person & Digital</option>
                </select>
              </div>
              <div class="col-md-3">
                <label for="" ><b>Search By Date</b></label>
                <fg-input>
                  <el-date-picker
                      type="date"
                      popper-class="date-picker date-picker-success"
                      placeholder="Select Date"
                      v-model="dateFilter"
                      @change="getDate"
                  >
                  </el-date-picker>
                </fg-input>
              </div>
              <div class="col-md-3">
                <label for="" ><b>Search By Location</b></label>
                 <fg-input placeholder="Enter Location" v-model="locationFilter" @input="getLocation"></fg-input>
              </div>
              <div class="col-md-3">
                <label for="" ><b>Search By Tags</b></label>
                 <fg-input placeholder="Enter Tags" v-model="tagFilter" @input="getEventsByTag"></fg-input>
              </div>
            </div>
           <!-- <div class="row">
              <div class="col-md-4" v-for="(event, index) in filtered" :key="index">
                <div>
                <div class="card" style="cursor: pointer">
                  <div class="card-header">
                    <img v-if="event.event_image != null" :src="event.event_image" class="lizzet_image" alt="" @click="viewEvent(event.id)">
                    <img v-else src="../../public/sparc_card_back.jpg" class="lizzet_image" alt="" @click="viewEvent(event.id)">
                  </div>
                  <div class="card-body" style= "height:260px; position:relative;" @click="viewEvent(event.id)">
                    <h5 class="text-success title-up"><b> {{ event.event_name }} </b></h5>
                     <div class="text-success mb-2" style="margin-top:-10px;" v-clipboard="() => url+''+event.id" v-clipboard:success="clipboardSuccessHandler"><b><i class="fa fa-copy"> Share Engagement</i></b></div> 
                   <div class="text-success mb-2" style="margin-top:-10px;" v-clipboard="() => url+''+event.id" v-clipboard:success="clipboardSuccessHandler"><u><b>Share Engagement</b></u></div>
                    <h6 class="text-info"> <i class ="fa fa-map-marker"></i> {{ event.event_location }}</h6>
                    <h6 class="text-info"> <i class="fa fa-clock-o"></i> {{ event.start_time + " - " + event.end_time }} </h6>
                    <h6 class="text-info"> <i class="fa fa-calendar"></i> {{ event.date }}</h6>
                    <h6> <star-rating :rating="getRatings(event.created_by)" :increment="0.1" :star-size="16" :read-only="true"></star-rating></h6>
                    <h6 class="text-success" style="position: absolute; bottom:10px; right: 20px;"> <img class="image-class" width="30" height="30" :src="getUser(event.created_by).profile_image" alt=""> {{ getUser(event.created_by).first_name + " " + getUser(event.created_by).last_name[0] + "." }}</h6> 
                    <h6>{{event.tags}}</h6> 
                    <div class="col-md-4" v-if="now == 1">
                        <h5 class="text-danger title-up">Sorry! No Engagements Found</h5>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>  -->
            <div class ="row" v-for="(event, index) in filtered" :key="index">
              <div class="card shadow-md" style = "border-radius: 8px;">
                <div class="card-body">
                  <div class = "row">
                    <div class = "col-md-3 text-center mt-auto mb-auto">
                      <div class = "row">
                        <div class = "col">
                          <img v-if="event.event_image != null" :src="event.event_image" style = "max-width: 100px;" alt="" @click="viewEvent(event.id)">
                          <img v-else src="../../public/sparc_card_back.jpg" style = "max-width: 100px;" alt="" @click="viewEvent(event.id)">
                        </div>
                      </div>
                      <div class = "row">
                        <div class = "col">
                            <button class = 'btn' style="margin-top: 20px; margin-bottom: 20px; background-color: white; border: 1px solid #04773B; color: #04773B;" @click="viewEvent(event.id)">Message Host</button>
                        </div>
                      </div>
                      <div class = "row" style="mt-auto mb-auto">
                        <div class = "col">
                          <p v-if="event.event_type === 'both'"><i class ="fa fa-network-wired" style = "color: #00487C"></i>  &nbsp; In Person & Virtual</p>
                          <p v-else-if="event.event_type === 'virtual'"><i class ="fa fa-tv" style = "color: #00487C"></i> &nbsp; {{event.event_type.charAt(0).toUpperCase() + event.event_type.substring(1)}}</p>
                          <p v-else><i class ="fa fa-user-check" style = "color: #00487C"></i> &nbsp; {{event.event_type.charAt(0).toUpperCase() + event.event_type.substring(1)}}</p>

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
                                <div class = "col-md-3 mt-auto mb-auto">
                                  <img class="image-class" width="45" height="45" :src="getUser(event.created_by).profile_image" alt="">
                                </div>
                                <div class = "col-md-9">
                                  <div class = "row">
                                      <b>{{ getUser(event.created_by).first_name + " " + getUser(event.created_by).last_name}}</b>
                                  </div>
                                  <div class = "row">
                                      <h6> <star-rating :rating="getRatings(event.created_by)" :increment="0.1" :star-size="16" :read-only="true"></star-rating></h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class = "col-md-5 mb-auto" >
                                <button class = 'btn pull-right' style="background-color: white; border: 1px solid #04773B; color: #04773B;" @click="viewEvent(event.id)"> Participate</button>
                            </div>
                           </div>
                            <div class = "row">
                              <div class = "col mt-auto mb-auto">
                                <read-more  style = "margin-bottom: 15px; font-size: 13px;" more-str="Read More..." :text="event.event_description" link="#" less-str="Read Less..." :max-chars="230"></read-more>
                              </div>
                            </div>
                        </div>
                        <div class = "col-md-4">
                          <div class = "row">
                            <div class = "col">
                              <p v-if="event.event_price_per_person == null"><i class="fa fa-hand-holding-usd" style = "color: #00487C"></i>&nbsp; Free</p>
                              <p v-else><i class="fa fa-hand-holding-usd" style = "color: #00487C"></i>&nbsp;${{ event.event_price_per_person }} per person</p>
                            </div>
                          </div>
                              <p v-if="event.event_address != null"><i class="fa fa-location-arrow" style = "color: #00487C"></i>&nbsp; {{ event.event_address }}</p>
                          <div class = "row">
                            <div class = "col">
                              <p v-if="event.event_location != null"><i class="fa fa-building" style = "color: #00487C"></i>&nbsp; {{ event.event_location }}</p>
                            </div>
                          </div>
                          <div class = "row">
                            <div class = "col">
                              <p v-if="event.event_location_access != null" :id="getHoverIdDirectionsByIndex(index)" style="color: #00487C; font-weight:400"><i class="fa fa-compass" style = "color: #00487C"></i>&nbsp; Directions</p>
                              <b-tooltip placement="bottomleft" :target="getHoverIdDirectionsByIndex(index)" triggers="hover">
                                <b>{{ event.event_location_access }}</b>
                              </b-tooltip>
                            </div>
                          </div>
                          <div class = "row">
                            <div class ="col">
                                <span class="badge badge-pill badge-success" style="margin: 1px; background-color: #e0e0e0; border: none; color: #505050; border-radius: 3px;" v-for="(tag,index) in getEventTags(event)" :key="index" v-if="index <= 1 && tag != null"> {{tag.value}} </span>
                                <span v-if="getEventTags(event).length > 1" :id="getHoverIdTagsByIndex(index)" class="badge badge-pill badge-success" style="margin: 1px; background-color: #e0e0e0; border: none; color: #505050; border-radius: 3px;">...</span>
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
                        <div class = "col-2">
                        </div>
                        <div class =" col ">
                          <p><i class="fab fa-facebook fa-lg" style = "color: #00487C;"></i></p>
                        </div>
                        <div class =" col ">
                          <p><i class="fab fa-twitter fa-lg" style = "color: #00487C"></i></p>
                        </div>
                        <div class =" col ">
                          <p><i class="fab fa-linkedin fa-lg" style = "color: #00487C"></i></p>
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
                              <p> <i class="fa fa-calendar" style = "color: #00487C"></i> {{ event.date }}</p>
                            </div>
                            <div class = "col-md-6">
                              <p> <i class="fa fa-clock-o" style = "color: #00487C"></i> {{ event.start_time + " - " + event.end_time }} </p>
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
import Vue from 'vue'
import { Parallax, FormGroupInput, Button } from '@/components';
import { DatePicker } from 'element-ui';
import { mapGetters, mapActions } from 'vuex'
import nativeToast from 'native-toast'
import ReadMore from 'vue-read-more';
import axios from 'axios';
Vue.use(ReadMore);
export default {
  name: 'events',
  bodyClass: 'events-page',
  components: {
    Parallax,
    [FormGroupInput.name]: FormGroupInput,
    [DatePicker.name]: DatePicker,
    [FormGroupInput.name]: FormGroupInput,
    Button
  },
  data() {
    return {
      rating: 5,
      url: window.location.href+"/",
      typeFilter: '',
      dateFilter: '',
      locationFilter: '',
      fetchedTags: [],
      filters: [],
      now: 0,
      userName: '',
      data_name: '',
      getUsers: [],
      ratings: [],
      filterEvents: [],
      tagFilter: null,
      currentDate: null,
    }
  },
  computed: {
    ...mapGetters(['allUsers', 'allTags', 'allRatings']),

    getFiltered() {
      this.filterEvents = [];
      let event = this.filters.filter(event => Date.parse(this.currentDate) <= Date.parse(event.date))
      return event
    },
    filtered() {
      let event = this.getFiltered.filter(event => event.deleted === false)
      return event
    },
  },
  methods: {
    ...mapActions(['fetchEvents', 'fetchAllUsers', 'fetchTags']),

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
    getTwoEventTags(event) {
      return event.tags.map((element, index) => {
            if (index < 2) {
              let eventTag = this.allTags.find(tag => tag.id==element)
              return eventTag
            }
        });
    },
    async getType(e) {
      if(e.target.options.selectedIndex > 0) {
        console.log(this.typeFilter)
        let typeToChose = this.typeFilter
        if (this.typeFilter === 'In-Person & Digital') {
          typeToChose = 'both';
        }
        var events = await this.getEvents()
        this.filters = events.filter(el => {
          return el.event_type == typeToChose
        })
      }
      else {
        this.filters = await this.getEvents()
      }
    },
    async getDate() {
      if(this.dateFilter == null) {
        this.filters = await this.getEvents()
      }
      else {
        this.dateFilter = this.dateFilter.toLocaleDateString()
        console.log('Date ' + this.dateFilter)
        var events = await this.getEvents();
        this.filters = events.filter(el => {
          return el.date == this.dateFilter
        })
      }
    },
    async getLocation() {
      if(this.locationFilter == null) {
        this.filters = await this.getEvents()
      }
      else {
        var events = await this.getEvents();
        this.filters = events.filter(el => {
          return el.event_location.toLowerCase().includes(this.locationFilter.toLowerCase())
        })
      }
    },
    async getEventsByTag() {
      if(this.tagFilter == null || this.tagFilter == '') {
        console.log("TRUE");
        this.filters = await this.getEvents()
      }
      else {
          this.filters = await this.getEvents();
          let tags=this.allTags.filter( tag_item => tag_item.value.toLowerCase().includes(this.tagFilter.toLowerCase()));
             
          //compare with all events that have that id
          if(tags) {
            let result = new Set();

            var events = await this.getEvents();

            events.forEach((event_item) => {
              for (var i = 0; i < tags.length; i++) {
                
                if (event_item.tags != null) {
                  event_item.tags.filter(tag => tag == tags[i].id)
                  for (var j = 0; j < event_item.tags.length; j++) {
                    
                    if(event_item.tags[j] == tags[i].id) {
                      result.add(event_item);
                    }
                  }
                }
              }
            }) 
            console.log(result);    
            this.filters = [...result];    
          }
          else {
            return this.filters=[]
          }
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
    getUser(id) {
      let user_item = this.getUsers.find(user => 
         Object.keys(user)[0] === id
      )
      var user = user_item[Object.keys(user_item)[0]]
      return user;
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
    async getEvents() {
      var events = await axios.get('https://us-central1-sparc-9d9cb.cloudfunctions.net/getEvents');
      var eventsArray = [];
      Object.keys(events.data).forEach((key) => {
        eventsArray.push({...events.data[key], id: key});
      });
      console.log(eventsArray);
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
    }
  },
  async created() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    this.currentDate = mm + "/" + dd + "/" + yyyy;


    this.filters = [];
    this.filters = await this.getEvents();

    this.getUsers = [];
    this.getUsers = await this.getAllUsers();

    this.ratings = [];
    this.ratings = await this.getAllRatings();

    this.fetchTags();
  },

  watch: {
    async getEvents(val) {
      if(val) {
        this.filters = []
        this.filters = await this.getEvents()
        this.now = 1;
      }
    },
    async allUsers(val) {
      if(val) {
        this.getUsers = []
        this.getUsers = await this.getAllUsers();
      }
    }
  }


};
</script>
<style>
  #top {
    margin-top: -70px;
  }
  .select {
    max-height: 35px !important;
  }
  .image-class {
    border-radius: 50%;
  }
  .hide {
    display: none;
  }

  .tooltip-inner {
      max-width: 800px !important;
  }

  

</style>
