<template>
    <div>
    <div class="main">
      <div class="section section-images">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
                <h2>Upcoming Engagements</h2>
                <div class="row">

                <div class="col-md-4" v-for="(event, index) in foundEvents" :key="index" >
                  <div @click="viewEvent(event.id)" style="cursor: pointer" v-if="Date.parse(currentDate) <= Date.parse(event.date)">
                      <div class="card">
                        <div class="card-header">
                            <img v-if="event.event_image != null" :src="event.event_image" class="lizzet_image" alt="">
                            <img v-else src="../../public/sparcS.png" class="lizzet_image" alt="">
                        </div>
                        <div class="card-body" style= "height:260px; position:relative;">
                            <h5 class="text-success title-up"><b> {{ event.event_name }} </b></h5>
                            <h6 class="text-info"> <i class="fa fa-map-marker"></i> {{ event.event_location }}</h6>
                            <h6 class="text-info"> <i class="fa fa-clock-o"></i> {{ event.start_time + " - " + event.end_time }} </h6>
                            <h6 class="text-info"> <i class="fa fa-calendar"></i> {{ event.date }}</h6>
                            <h6> <star-rating :rating="getRatings(event.created_by)" :increment="0.1" :star-size="16" :read-only="true"></star-rating></h6>
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
import { mapGetters } from 'vuex'
  import moment from 'moment'

export default {
    name: 'host-upcoming-engagements',
    data() {
      return {
        userEvents: [],
        hostedEvents: [],
        rating: 5,
        currentDate: null,
        foundEvents: []
      }
    },
    computed : {
        ...mapGetters(['getEvents', 'allRatings']),
      //   getSelectedEvents() {
      //     this.foundEvents = []
      //     return this.userEvents.map(event_id=> {
      //     let event_item=this.getEvents.find(event_item=> {
      //       if(event_item.id==event_id && event_item.deleted == false && Date.parse(this.currentDate) <= Date.parse(event_item.date)) {
      //         this.foundEvents.push(event_item)
      //       }
      //     })
      //       return this.foundEvents;

      //       })
      // },
      thevents() {
          return this.userEvents.map(event_id=> {
                        // let event_date=moment(this.selected_event.date).format("MM/DD/YYYY")
            // return moment(event_date).isBefore(moment().format("MM/DD/YYYY"))
          let event_item=this.getEvents.find(event_item=> event_item.id==event_id )// Date.parse(this.currentDate) <= Date.parse(event_item.date))

return event_item;
          })
      },
      dates(){
       return this.thevents.filter(event_item=>moment(event_item.date).isAfter(moment().format('MM/DD/YYYY'))==true && event_item.deleted == false)
      }

      // filterUpcoming() {
      //     let event = this.getSelectedEvents.filter(event => Date.parse(this.currentDate) <= Date.parse(event.date))
      //     return event
      //   }
    },
    watch:{
      getEvents(){
         if(this.getEvents.length>0){
              console.log(this.thevents)
              console.log(this.dates)
              this.foundEvents=this.dates
        // console.log(this.getEvents.find(event_item=>event_item.id==id))

         }
      }
    },
    methods: {
      viewEvent(id) {
        this.$router.push({path: '/events/'+id})
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
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        this.currentDate = mm + "/" + dd + "/" + yyyy;
      const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
      for(var key in loggedUser.events_hosted){
        this.userEvents.push(loggedUser.events_hosted[key])
      }

      if(this.getEvents.length>0){
              console.log(this.thevents)
              console.log(this.dates)
              this.foundEvents=this.dates
         }

      console.log(this.thevents)
      // console.log(moment('4/4/2019').isAfter(moment().format("MM/DD/YYYY")))


      //console.log("Count " + loggedUser.events_hosted)
      // this.userEvents = loggedUser.events_hosted
      // console.log("Events " + this.userEvents[0])
    }
}
</script>

<style scoped>

</style>
