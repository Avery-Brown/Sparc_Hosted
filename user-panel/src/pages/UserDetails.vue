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
            <div class="row">
                <div class="col-md-8">
                    <h3 class="text-info"><b>Engagements Hosted</b></h3>
                    <div class="row">

                        <div class="col-md-6" v-for="(event, index) in getUserEvents" v-if="event.deleted==false" :key="index">
                            <div class="card" style="cursor: pointer">
                                <div class="card-header">
                                <img v-if="event.event_image != null" :src="event.event_image" width="500" height="200" alt="" @click="viewEvent(event.id)">
                                <img v-else src="../../public/sparc_card_back.jpg" width="500" height="200" alt="">
                                <!-- <div class="text-success pull-right mt-4 mr-3" v-clipboard="() => url+''+event.id" v-clipboard:success="clipboardSuccessHandler"><i class="fa fa-copy"></i> Copy Link</div> -->
                                </div>
                                <div class="card-body" @click="viewEvent(event.id)">
                                <h5 class="text-success"> {{ event.event_name }}</h5>
                                <h6> <star-rating v-model="rating" :star-size="16" :read-only="true"></star-rating></h6>
                                <h6 class="text-info"> <i class="fa fa-map-marker"></i> {{ event.event_location }}</h6>
                                <h6 class="text-info"> <i class="fa fa-clock-o"></i> {{ event.start_time + " - " + event.end_time }} </h6>
                                <h6 class="text-info"> <i class="fa fa-calendar"></i> {{ event.date }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <h3 class="text-info"><b>Host Details</b></h3>
                    <div class="card card-plain" style="height: 840px;">
                        <div class="card-header" style="height: 840px;">
                            <h4 class="text-success"><b></b></h4>
                            <div class="photo-container text-center mt-3">
                              <!-- <h6 class="text-success" style="position: absolute; bottom:10px; right: 20px;"> <img class="image-class" width="30" height="30" :src="getUser(event.created_by).profile_image" alt=""> {{ getUser(event.created_by).first_name + " " + getUser(event.created_by).last_name[0] + "." }}</h6> -->

                                <img class="rounded-circle" width="150" height="150" v-if="this.user.profile_image!= null" :src="this.user.profile_image" alt="" />
                            </div>
                            <div class="user-details text-center mt-3">
                                <h5 class="text-success"><b>{{ this.user.first_name + " " + this.user.last_name}}</b></h5>
                                <h6 class="text-success">Age</h6><b> {{ this.user.age}} Years</b>
                                <h6 class="text-success mt-3">Job Occupation</h6> <b>{{this.user.job_occupation}}</b>
                                <h6 class="text-success mt-3">Institute</h6> <b>{{this.user.institute}}</b>
                            </div>
                            <div class="text-center mt-3">
                                <h6  class="text-success title-up ml-3 pull-left">Events Hosted: <b> {{ this.user.events_hosted != null ? Object.keys(this.user.events_hosted).length : 0 }} </b></h6>
                                <h6 class="text-success title-up ml-3">Events Attended: <b> {{ this.user.events_attended != null ? Object.keys(this.user.events_attended).length : 0 }} </b></h6>
                            </div>
                            <hr class="mt-5">
                            <div class="about">
                                <h4 class="text-info ml-3 title-up"><b>About</b></h4>
                                <p class="pl-3 pr-3">{{this.user.about}}</p>
                            </div>
                            <div class="video" v-if="this.user.profile_video">
                                <h4 class="text-info ml-3 title-up"><b>Host Video</b></h4>
                                <video class="pr-3 pl-3" :src="this.user.profile_video" width="300" controls ></video>
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
    }
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
  .card {
      border: 1px solid #2CA8FF;
  }
</style>
