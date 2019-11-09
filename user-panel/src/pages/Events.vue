<template>
  <div>
    <div v-bind:class="{searchClass: this.searchQuery != null}">
      <div class="section section-images">
        <div class="container" id="top">
          <div class="col-md-12">
            <div class = "container-fluid">
              <div class ="row" style="margin-top: 0.5rem;">
                <div class ="col" style="margin-left: -40px;">
                  <h2 style="color: #484848;">Learn and connect in a meaningful way</h2>
                  <h4 style="margin-top: -20px; color: #484848">From tutoring in algebra to Case interview prep, Sparc has you covered</h4>
                  <h5 v-if="this.searchQuery != null" style="font-weight: 600; color: #484848; margin-top: 50px; margin-bottom: -.25rem">Search Results for '<p style="display: inline-block; font-weight: 600; font-size: 18px; color: #484848">{{this.searchQuery}}</p>'</h5>
                </div>
              </div>
              <div class = "row" style="margin-top: 2rem">
                <div class ="col-md-2">
                  <div class = "row">
                    <div class = "col">
                      <div style="margin-top: 0rem;margin-left: -40px">
                        <div class = "row">
                          <div class = "col">
                            <label>Search by Tags</label>
                            <multiselect 
                              v-model="tagFilters"
                              :options="allTags"
                              :multiple="true"
                              :close-on-select="true"
                              :clear-on-select="true"
                              :preserve-search="false"
                              :selectLabel="null"
                              :deselectLabel="null"
                              placeholder="Tags"
                              label="value"
                              track-by="value"
                              :taggable="false"
                              :preselect-first="false"
                              @select="filterAll"
                              @remove="filterAll">
                            </multiselect>
                          </div>
                        </div>
                        <div class = "row" style="margin-top: 20px;">
                          <div class = "col">
                            <b-form-group label="Engagement Type">
                              <b-form-checkbox
                                v-for="option in options"
                                v-model="typeFilters"
                                :key="option.value"
                                :value="option.value"
                              >
                                {{ option.text }}
                              </b-form-checkbox>
                            </b-form-group>
                          </div>
                        </div>
                        <div class = "row" style="margin-top: 20px;">
                          <div class = "col">
                            <fg-input label = "Engagement Location" placeholder="Enter Location" v-model="locationFilter" @input="filterAll"></fg-input>
                          </div>
                        </div>
                        <div class = "row" style="margin-top: 20px;">
                          <div class = "col">
                            <label>Engagement Date</label>
                            <div class = "row" style="margin-top: 10px;">
                              <div class = "col-md-3">
                                <label> From </label>
                              </div>
                              <div class = "col-md-9">
                                <fg-input>
                                  <el-date-picker
                                      type="date"
                                      popper-class="date-picker date-picker-success"
                                      placeholder="Select Date"
                                      v-model="dateFrom"
                                      @change="filterAll"
                                      :picker-options="pickerOptions"
                                  >
                                  </el-date-picker>
                                </fg-input>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class = "row" style="margin-bottom: 40px;">
                          <div class = "col">
                            <div class = "row mt-auto mb-auto">
                              <div class = "col-md-3">
                                <label style> To </label>
                              </div>
                              <div class = "col-md-9">
                                <fg-input>
                                  <el-date-picker
                                      type="date"
                                      popper-class="date-picker date-picker-success"
                                      placeholder="Select Date"
                                      v-model="dateTo"
                                      @change="filterAll"
                                      :picker-options="pickerOptions"
                                  >
                                  </el-date-picker>
                                </fg-input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class = "col-md-10">
                  <div class="scroll-pane-cards">
                    <div v-if="!noListingsFound && filtered.length == 0 || !noListingsFound && isFiltering">
                      <lottie :options="loadingOptions" :width="200" :height="200" style="margin-top: 3rem;"/>
                    </div>
                    <div v-else-if="noListingsFound" class="text-center">
                      <h4><p style="display: inline-block; font-size: 23px; color: red; font-weight: 400;">Oops!</p> Looks like no engagements were found with that criteria</h4>
                      <second-lottie :options="errorOptions" :width="300" :height="300" />
                    </div>
                    <div v-else class ="row"  v-for="(event, index) in filtered" :key="index">
                      <div class="card shadow" style = "border-radius: 8px;">
                        <div class="card-body">
                          <div class = "row">
                            <div class = "col-md-3 text-center mt-auto mb-auto">
                              <div class = "row">
                                <div class = "col">
                                  <img v-if="event.event_image != null" :src="event.event_image" style = "width: 100px; height: 110px;" alt="" @click="viewEvent(event.id)">
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
                                        <button class = 'btn pull-right' style="background-color: white; border: 1px solid #04773B; color: #04773B;" @click="viewEvent(event.id)"> Participate</button>
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
    </div>
    <div>
    &nbsp;
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
import isEmpty from '../isEmpty';
import Lottie from 'vue-lottie'
import loadingAnimationData from '../../lotties/1301-round-cap-material-loading.json'
import errorAnimationData from '../../lotties/629-empty-box.json'
import Multiselect from 'vue-multiselect'
import { PassThrough } from 'stream';

Vue.use(ReadMore);
export default {
  name: 'events',
  bodyClass: 'events-page',
  components: {
    Parallax,
    [FormGroupInput.name]: FormGroupInput,
    [DatePicker.name]: DatePicker,
    [FormGroupInput.name]: FormGroupInput,
    Button,
    'lottie': Lottie,
    'second-lottie': Lottie,
    Multiselect,
  },
  data() {
    return {
      noListingsFound: false,
      isFiltering: false,
      loadingOptions: { animationData: loadingAnimationData },
      errorOptions: { animationData: errorAnimationData },
      options: [{ text: 'Virtual', value: 'virtual' },
                { text: 'In Person', value: 'in Person' },
                { text: 'In Person & Virtual', value: 'both' },
              ],
      rating: 5,
      url: window.location.href+"/",
      saerchQuery: '',
      typeFilters: [],
      dateFrom: null,
      dateTo: null,                                                 
      locationFilter: '',
      filters: [],
      now: 0,
      getUsers: [],
      ratings: [],
      filterEvents: [],
      tagFilter: null,
      tagFilters: [],
      currentDate: null,
      pickerOptions: {
        disabledDate(time) {
            return time.getTime() < Date.now() - 3600 * 1000 * 24;
        }
      },
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
      event.sort((a, b) => {
        var dateA = new Date(a.date), dateB = new Date(b.date);
        return dateA - dateB
      })
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
    async filterBySearch(fromCreation) {
      if(fromCreation) {
        this.filters = await this.getEvents();
      }
      var allTags = await this.getTags();
      let tags = allTags.filter((tag) => tag.value.toLowerCase().trim().includes(this.searchQuery.trim()));
      let tagIds = tags.map(tag => tag.id);
      var resultEvents = new Set();
      this.filters.forEach(event => {
        if (event.tags != null) {
          if(event.tags.some(tag => tagIds.includes(tag))) {
            resultEvents.add(event)
          }
        }
      })
      this.filters = [...resultEvents]
    },
    async filterAll() {
      this.isFiltering = true;
      this.filters = [];
      this.filters = await this.getEvents();
      this.getType();
      this.getDate();
      this.getLocation();
      this.getEventsByTag();
      if (this.searchQuery != null) {
        await this.filterBySearch(false);
      }
      if (this.filtered.length == 0) {
          this.noListingsFound = true;
      } 
      this.isFiltering = false;
    },
    async getType() {
        var filteredEvents = [];
        this.typeFilters.forEach(type => {
          var newFilteredEvents = this.filters.filter(el => {
            return el.event_type === type
          })
          filteredEvents = filteredEvents.concat(newFilteredEvents);
        })
        if (!isEmpty(filteredEvents)) {
          this.filters = filteredEvents;
        }
    },
    async getDate() {
      if(this.dateFrom == null && this.dateTo == null) {
        return;
      }
      if (this.dateFrom != null && this.dateTo == null) {
        var from = this.dateFrom.toLocaleDateString();
        this.filters = this.filters.filter(el => {
          return new Date(el.date) >= new Date(from);
        })
      } else if (this.dateFrom == null && this.dateTo != null){
        var to = this.dateTo.toLocaleDateString()
        this.filters = this.filters.filter(el => {
          return new Date(el.date) <= new Date(to);
        })
      } else {
        var from = this.dateFrom.toLocaleDateString();
        var to = this.dateTo.toLocaleDateString();
        this.filters = this.filters.filter(el => {
          return new Date(el.date) <= new Date(to) && new Date(el.date) >= new Date(from);
        })
      }
    },
    async getLocation() {
        this.filters = this.filters.filter(el => {
          return el.event_location.toLowerCase().includes(this.locationFilter.toLowerCase())
        })
    },
    async getEventsByTag() {
          var tagValues = this.tagFilters.map((tag) => tag.id)

          var result =  new Set();

          if(this.tagFilters.length > 0) {
            this.filters.forEach((event) => {
                if(event.tags != null) {
                  event.tags.forEach((tag_id) => {
                    if (tagValues.includes(tag_id)) {
                      result.add(event)
                    }
                  })
                }            
            })
            this.filters = [...result];
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
    eventsPromise() {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          var events = await axios.get('https://us-central1-sparc-9d9cb.cloudfunctions.net/getEvents');
          var eventsArray = [];
          Object.keys(events.data).forEach((key) => {
            eventsArray.push({...events.data[key], id: key});
          });
          if (eventsArray.length == 0) {
            this.noListingsFound = true;
          }
          resolve(eventsArray);
        }, 750)

      })
    },
    async getEvents() {
      this.noListingsFound = false;
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
    }
  },
  async created() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    this.searchQuery = this.$route.params.searchQuery;

    this.currentDate = mm + "/" + dd + "/" + yyyy;


    if (this.searchQuery != null) {
      this.isFiltering = true;
      await this.filterBySearch(true);
      this.isFiltering = false;
      if (this.filters.length == 0) {
        this.noListingsFound = true;
      }
    } else {
      this.filters = await this.getEvents();
    }

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
    },
    typeFilters: function() {
      this.filterAll();
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

  .scroll-pane-cards {
    margin-top: -2rem;
    height: 83vh; 
    overflow: scroll; 
    padding: 40px; 
    width: 115%; 
    margin-left: -20px; 
    border-radius: 8px; 
    background: white

  }


  .multiselect .multiselect__tags {
    font-size: 12px;
  }
 
  .multiselect {
    font-size: 12px;
  }

  .multiselect .multiselect__select {
    font-size: 15px;
  }

  .searchClass {
    margin-bottom: 75px;
  }


  

</style>
