<template>
    <div>

    <div class="main">
      <div class="section section-images">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
                <h2>Your Engagements</h2>
                <div class="row">
                  <!-- events -->
                <div class="col-md-4" v-for="(event, index) in events" :key="index">
                  <div class="card" style="cursor: pointer">
                  <div class="card-header" @click="viewEvent(event.id)">
                    <img v-if="event.event_image != null" :src="event.event_image" class="lizzet_image" alt="">
                    <img v-else src="../../public/sparcS.png" class="lizzet_image" alt="">
                  </div>
                  <div class="card-body" style= "height:200px; position:relative;">
                    <div @click="viewEvent(event.id)">
                    <h5  class="text-success title-up"><b> {{ event.event_name }} </b></h5>
                    <h6 class="text-info"> <i class="fa fa-map-marker"></i> {{ event.event_location }}</h6>
                    <h6 class="text-info"> <i class="fa fa-clock-o"></i> {{ event.start_time + " - " + event.end_time }} </h6>
                    <h6 class="text-info"> <i class="fa fa-calendar"></i> {{ event.date }}</h6>
                    <h6> <star-rating :rating="getRatings(event.created_by)" :increment="0.1" :star-size="16" :read-only="true"></star-rating></h6>
                    </div>
                    <button class="btn btn-danger pull-right" @click="deleteEvent(event.id, event.event_name)">Delete</button>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :show.sync="delModal" headerClasses="justify-content-center">
      <h6 slot="header" class="text-center">Are you sure you want to Delete {{eventName}} ?</h6>
      <div class="row">
        <div class="col-md-12 text-center">
          <button class="btn btn-danger mr-3" @click="deleteNow">Yes, Delete</button>
          <button class="btn btn-info" @click="delModal = false">No, Cancel</button>
        </div>

      </div>
    </modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Modal } from '@/components';
export default {
    name: 'host',
    components: {
      Modal
    },
    data() {
      return {
        events:[],
        userEvents: [],
        hostedEvents: [],
        rating: 5,
        delModal: false,
        eventName: null,
        eventId: null
      }
    },
    computed : {
        ...mapGetters(['getEvents', 'allRatings']),
        getSelectedEvents() {
          return this.userEvents.map(event_id=> {
          let event_item=this.getEvents.find(event_item=>event_item.id==event_id)
            return event_item
          })
        },

      filterEvents() {
        let event = this.getSelectedEvents.filter(item => item.deleted === false)
        return event;
      },
    },
    methods: {
      ...mapActions(['eventDelete', 'fetchEvents', 'fetchRatings', 'fetchAllUsers']),
      viewEvent(id) {
        this.$router.push({path: '/events/'+id})
      },
      deleteEvent(id, name) {
        this.eventName = name
        this.eventId = id
        this.delModal = true
      },
      deleteNow() {
        console.log(this.eventId)
        let abc=this.events.find(event_item=>event_item.id==this.eventId)
        // console.log(abc)
        this.events.splice(abc, 1);

        this.eventDelete(this.eventId)
        this.delModal = false

        this.$router.push({path: '/events'})
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
    watch:{
      getEvents(){
        if(this.getEvents.length>0){
      console.log(this.getSelectedEvents)
      this.events=this.filterEvents


        }
      }

    },
    created() {

      const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
      for(var key in loggedUser.events_hosted){
        this.userEvents.push(loggedUser.events_hosted[key])
      }
      console.log("new runner")
      this.events=this.filterEvents


      console.log(this.getSelectedEvents)
      //console.log("Count " + loggedUser.events_hosted)
      // this.userEvents = loggedUser.events_hosted
      // console.log("Events " + this.userEvents[0])
    }
}
</script>

<style scoped>

</style>
