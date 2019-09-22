<template>
   <div>
      <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      </base-header>
      <div class="container-fluid mt--7">
         <div class="row">
            <div class="col-md-12">
               <div class="card shadow"
                  :class="type === 'dark' ? 'bg-default': ''">
                  <div class="card-header border-0"
                     :class="type === 'dark' ? 'bg-transparent': ''">
                     <div class="row align-items-center">
                        <div class="col">
                           <h5 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                              Events
                           </h5>
                        </div>
                        <!-- <div class="col text-right">
                           <base-button type="primary" size="sm">See all</base-button>
                           </div> -->
                     </div>
                  </div>
                  <div class="table-responsive">
                     <b-container fluid>
                        <b-row>
                           <b-col class="col-md-8">
                              <b-card
                                 title="Engagement Details"
                                 img-alt="Image"
                                 img-height="297px;"
                                :img-src="selected_event.event_image"
                                 img-top
                                 tag="article"
                                 class="mb-2"
                                 >
                                 <b-card-body style="margin-top:-20px;">
                                    <b-card-title>
                                      <h3>{{selected_event.event_name}}</h3>  
                                    </b-card-title>
                                    <div class="row" style="margin-top:-25px;">
                                       <div class="col-md-10">
                                          <a-rate v-model="value" allowHalf />
                                          <!-- (32) -->
                                       </div>
                                    </div>
                                    <b-card-sub-title style="margin-top:8px;font-size:12px;" class="mb-2">
                                      <h3 >  <i class="fa fa-map-marker" aria-hidden="true"></i>
                                        {{selected_event.event_location}}</h3>
                                    </b-card-sub-title>
                                    <div class="row">
                                       <div class="col-md-12">
                                          <h3>
                                             <i class="fa fa-clock-o" aria-hidden="true"></i>
                                             {{selected_event.start_time}}-{{selected_event.end_time}}
                                          </h3>
                                       </div>
                                    </div>
                                    <div class="row" style="margin-top:-3px;">
                                       <div class="col-md-12">
                                          <h3> 
                                             <i class="fa fa-calendar" aria-hidden="true"></i>
                                             {{selected_event.date}}
                                          </h3>
                                       </div>
                                    </div>
                                 </b-card-body>
                                  </b-card>
                           </b-col>
                           <b-col class="col-md-4">
                               <b-row class="col-md-12">
                                   <b-card
                                        title="Engagement Description"
                                        img-top
                                        tag="article"
                                        class="mb-2">
                                        <b-card-text>
                                        <h5>{{selected_event.event_description}}</h5>   
                                        </b-card-text>
                                    </b-card>
                               </b-row>
                               <b-row class="col-md-12">
                                   <b-card
                                    title="Engagement Extras"
                                    img-alt="Image"
                                    img-top
                                    tag="article"
                                    class="mb-2"
                                >
                                    <b-card-body style="padding: 0px;margin-top:-10px;">
                                    <div class="row">
                                        <div class="col-md-12">
                                           <b>Others</b>
                                       </div>
                                        <div class="col-md-6">
                                            <b>Event Free</b>
                                        </div>
                                        <div class="col-md-6">
                                            {{selected_event.event_free}}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <b>Event Cause</b>
                                        </div>
                                        <div class="col-md-6">
                                            {{selected_event.cause}}
                                        </div>
                                    </div>
                                    <div v-if="selected_event.event_free==false" class="row">
                                        <div class="col-md-6">
                                           <b>Event Price</b> 
                                        </div>
                                        <div class="col-md-6">
                                            ${{selected_event.event_price_per_person ? '0':''}} <sub>per person</sub>
                                        </div>
                                    </div><div class="row">
                                        <div class="col-md-6">
                                           <b>Event Status</b> 
                                        </div>
                                        <div class="col-md-6">
                                          <b-badge v-if="getEventStatus" pill variant="danger">Event Expired</b-badge>
                                          <b-badge v-else pill variant="success">Event Active</b-badge>

                                        </div>
                                    </div>
                                    <div class="row" style="margin-top:15px;" >
                                       <div class="col-md-12">
                                           <b >Event Tags</b>
                                       </div>
                                       <div class="col-md-12" style="margin-left:11px;" v-for="tag_item in get_tags" :key="tag_item.id">
                                           <b-badge pill variant="light">{{tag_item.value}} <br></b-badge>
                                       </div>
                                    </div>
                                    </b-card-body>
                                </b-card>

                               </b-row>
                               <b-row class="col-md-12">
                                   <b-card
                                    title="Engagement Creator"
                                    img-top
                                    tag="article"
                                    class="mb-2"
                                >
                                    <b-card-body style="padding: 0px;margin-top: -10px;">
                                       
                                        <div  class="row" >
                                            <div class="col-md-4">
                                                <img class="offset-md-4  avatar" :src="getCreator.profile_image" style="width:30px;height:30px;" alt="...">
                                            </div>
                                            <div class="col-md-6">
                                                {{getCreator.first_name}} {{getCreator.last_name}}
                                            </div>
                                            <div class="col-md-2">
                                                <b-button variant="info" @click="redirectUser()" size="sm">View</b-button>
                                            </div>
                                        </div>

                                    </b-card-body>
                                </b-card>
                               </b-row>
                               <b-row class="col-md-12">
                                   <b-card
                                    title="Engagement Attendees"
                                    img-top
                                    tag="article"
                                    class="mb-2"
                                >
                                    <b-card-body style="padding: 0px;margin-top: -10px;">
                                        <div  class="row" v-for="user_item in get_users" :key="user_item.id">
                                            <div class="col-md-4">
                                                <img class="offset-md-4  avatar" :src="user_item.profile_image" style="width:30px;height:30px;" alt="...">
                                            </div>
                                            <div class="col-md-8">
                                                {{user_item.first_name}} {{user_item.last_name}}
                                            </div>
                                        </div>

                                    </b-card-body>
                                </b-card>
                               </b-row>
                           </b-col>
                        </b-row>
                     </b-container>
                  </div>
                  <div class="card-footer d-flex justify-content-end"
                     :class="type === 'dark' ? 'bg-transparent': ''">
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
  import moment from 'moment'
  import {mapGetters} from 'vuex'
  export default {
    name: 'event_detail',
    methods:{
        redirectUser() {
            this.$router.push({
                name: 'profile',
                 params: {
                  user: this.getCreator
                }
            })
        }
       
    },
    computed : {
        ...mapGetters(['allevents','tags','users']),
        selected_event () {
            return this.allevents.find(event_item=>event_item.id==this.$route.params.id)
        },
        get_tags () {
            if(this.selected_event.tags){
           return this.selected_event.tags.map(tag_id=>{
               return this.tags.find(tag_item=>tag_item.id==tag_id)

            })
            }
            else{
                return []
            }
        },
        get_users () {
            if(this.temp_arr.length>0){            
            return this.temp_arr.map(user_id=>{
               return this.users.find(user_item=>user_item.id==user_id)
                })
            }
            else{
                return null
            }

        },
        getCreator() {
          return  this.users.find(user_item=>user_item.id==this.selected_event.created_by)
        },
        getEventStatus () {
            let event_date=moment(this.selected_event.date).format("MM/DD/YYYY")
            console.log(event_date)
            console.log(moment().format("MM/DD/YYYY"))
            return moment(event_date).isBefore(moment().format("MM/DD/YYYY"))
            
        }
    },
    mounted() {
        this.temp_arr=[]
        if(this.selected_event.users_attending) {
            for (var key in this.selected_event.users_attending) {
                this.temp_arr.push(this.selected_event.users_attending[key]);
            }
        }

    },
    data() {
        return{
         value:2,
         type:'light',
         temp_arr:[]

        }
    }
  };
</script>
<style scoped>


</style>
