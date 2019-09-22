<template>
  <div>
    <div class="main">
      <div class="section section-images">
        <div class="container" id="top">
          <div class="col-md-12">
            <div class="row text-center">
              <div class="col-md-12">
                <h2 class="text-center ml-3 title title-up mb-5">All Engagements</h2>
              </div>
              
            </div>
            <div class="row mb-5">
              <div class="col-md-3">
                <label for="typeFilter" class="text-success"><b>Search By Type</b></label>
                <select class="form-control select" v-model="typeFilter" @change="getType">
                  <option value="">Select Type</option>
                  <option value="virtual">Virtual</option>
                  <option value="in Person">In Person</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div class="col-md-3">
                <label for="" class="text-success"><b>Search By Date</b></label>
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
                <label for="" class="text-success"><b>Search By Location</b></label>
                 <fg-input placeholder="Enter Location" v-model="locationFilter" @input="getLocation"></fg-input>
              </div>
              <div class="col-md-3">
                <label for="" class="text-success"><b>Search By Tags</b></label>
                 <fg-input placeholder="Enter Tags" v-model="tagFilter" @input="getEventsByTag"></fg-input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4" v-for="(event, index) in filtered" :key="index">
                <div>
                <div class="card" style="cursor: pointer">
                  <div class="card-header">
                    <img v-if="event.event_image != null" :src="event.event_image" width="500" height="200" alt="" @click="viewEvent(event.id)">
                    <img v-else src="../../public/sparcS.png" width="500" height="200" alt="" @click="viewEvent(event.id)">
                    <div class="text-success pull-right mt-4 mr-3" v-clipboard="() => url+''+event.id" v-clipboard:success="clipboardSuccessHandler"><b><i class="fa fa-copy"></i></b></div>
                  </div>
                  <div class="card-body" @click="viewEvent(event.id)">
                    <h5 class="text-success title-up"><b> {{ event.event_name }} </b></h5>
                    <h6> <star-rating :rating="getRatings(event.created_by)" :increment="0.1" :star-size="16" :read-only="true"></star-rating></h6>
                    <h6 class="text-info"> <i class ="fa fa-map-marker"></i> {{ event.event_location }}</h6>
                    <h6 class="text-info"> <i class="fa fa-clock-o"></i> {{ event.start_time + " - " + event.end_time }} </h6>
                    <h6 class="text-info"> <i class="fa fa-calendar"></i> {{ event.date }}</h6>
                    <h6 class="text-success pull-right"> <img class="image-class" width="30" height="30" :src="getUser(event.created_by).profile_image" alt=""> {{ getUser(event.created_by).first_name + " " + getUser(event.created_by).last_name }}</h6>
                    <!-- <h6>{{event.tags}}</h6> -->
                    
                  </div>
                </div>
                </div>
              </div>
              <div class="col-md-4" v-if="filters.length <= 0">
                  <h5 class="text-danger title-up">Sorry! No Engagement Found</h5>
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
import { DatePicker } from 'element-ui';
import { mapGetters, mapActions } from 'vuex'
import nativeToast from 'native-toast'
export default {
  name: 'events',
  bodyClass: 'events-page',
  components: {
    Parallax,
    [FormGroupInput.name]: FormGroupInput,
    [DatePicker.name]: DatePicker,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      rating: 5,
      url: window.location.href+"/",
        typeFilter: '',
        dateFilter: '',
        locationFilter: '',
        filters: [],
        userName: '',
        data_name: '',
        getUsers: [],
        filterEvents: [],
        tagFilter: null,
        currentDate: null
    }
  },
  computed: {
    ...mapGetters(['getEvents', 'allUsers', 'allTags', 'allRatings']),

    getFiltered() {
      this.filterEvents = [];
      let event = this.filters.filter(event => Date.parse(this.currentDate) <= Date.parse(event.date))
      return event
    },
    filtered() {
      let event = this.getFiltered.filter(event => event.deleted === false)
      return event
    }
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
    getType(e) {
      if(e.target.options.selectedIndex > 0) {
        console.log(this.typeFilter)
        this.filters = this.getEvents.filter(el => {
          return el.event_type == this.typeFilter
        })
      }
      else {
        this.filters = this.getEvents
      }
    },
    getDate() {
      if(this.dateFilter == null) {
        this.filters = this.getEvents
      }
      else {
        this.dateFilter = this.dateFilter.toLocaleDateString()
        console.log('Date ' + this.dateFilter)
        this.filters = this.getEvents.filter(el => {
          return el.date == this.dateFilter
        }) 
      }
    },
    getLocation() {
      if(this.locationFilter == null) {
        this.filters = this.getEvents
      }
      else {
        this.filters = this.getEvents.filter(el => {
          return el.event_location.toLowerCase().includes(this.locationFilter.toLowerCase())
        })
      } 
    },
    getEventsByTag() {
      if(this.tagFilter == null || this.tagFilter == '') {
        this.filters = this.getEvents
      }
      else {
         let obj=this.allTags.find(tag_item=>tag_item.value.toLowerCase().includes(this.tagFilter.toLowerCase()))
          console.log(obj)
          //compare with all events that have that id 
          if(obj) {
          let arrs=this.getEvents.filter(event_item=>event_item.tags.includes(obj.id))
          return this.filters=arrs
          }
          else {
            return this.filters=[]
          }
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
    getUser(id) {
      let user_item = this.getUsers.find(user => user.id === id)
        return user_item  
    },
  },
  created() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    this.currentDate = mm + "/" + dd + "/" + yyyy;

    this.fetchEvents();
    this.filters = []
    this.filters = this.getEvents
    this.fetchAllUsers();
    this.getUsers = []
    this.getUsers = this.allUsers
    this.fetchTags();
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
</style>
