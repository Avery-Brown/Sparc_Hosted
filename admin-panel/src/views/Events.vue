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
                            <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                               Engagements
                            </h3>
                            </div>
                            <!-- <div class="col text-right">
                            <base-button type="primary" size="sm">See all</base-button>
                            </div> -->
                        </div>
                        </div>
                        <div class="table-responsive">
                            <b-container fluid>
                                <div class="form-group">
                                        <select class="form-control" v-model="event_status">
                                            <option selected value="events_attended"> Engagements Attended</option>
                                            <option value="events_hosted" >Engagements Hosted</option>
                                        </select>
                                </div>
                            <b-row v-if="events.length>0">
                                <b-col class="col-md-4"   v-for="event_item in getSelectedEvents" v-bind:key="event_item.id">
                                 <!--  -->
                                   <b-card
                                        :img-src="event_item.event_image"
                                        img-alt="Image"
                                        img-top
                                        tag="article"
                                        img-height="197px;"
                                        style="max-width: 20rem;border-color:blue;"
                                        class="mb-2"
                                        >
                                        <b-card-body style="margin-top:-20px;">
                                            <b-card-title>
                                                    {{event_item.event_name}}</b-card-title>
                                            <div class="row" style="margin-top:-25px;">
                                                <div class="col-md-10">
                                                <a-rate v-model="value" allowHalf />
                                                <!-- (32) -->
                                                </div>
                                                <div class="col-md-2">
                                                    <i class="fa fa-clipboard"
                                                    v-clipboard="()=>newurl+'/'+event_item.id"
                                                        v-clipboard:success="clipboardSuccessHandler" 
                                                        v-clipboard:error="clipboardErrorHandler"
                                                     aria-hidden="true"></i>
                                                </div>
                                            
                                            </div>
                                            <b-card-sub-title style="margin-top:8px;font-size:12px;" class="mb-2">
                                                <i class="fa fa-map-marker" aria-hidden="true"></i>
                                                23, Rue Traversiere,Paris</b-card-sub-title>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <h5 class="text-muted">
                                                        <i class="fa fa-clock-o" aria-hidden="true"></i>
                                                        {{event_item.start_time}}-{{event_item.end_time}}</h5>
                                                </div>
                                            </div>
                                            <div class="row" style="margin-top:-17px;">
                                                <div class="col-md-12">
                                                    <h5 class="text-muted"> 
                                                        <i class="fa fa-calendar" aria-hidden="true"></i>

                                                        {{event_item.date}}</h5>
                                                </div>
                                            </div>
                                            <div class="row" style="margin-top:-17px;">
                                                <div class="col-md-12">
                                                    <router-link :to="`eventdetails/${event_item.id}`">
                                                      <b-button class="pull-right" size="sm" variant="outline-primary">View Details</b-button>
                                                    </router-link>
                                                        <!-- <i class="fa fa-calendar" aria-hidden="true"></i>
                                                        <button v-clipboard="()=>newurl+'/'+event_item.id"
                                                        v-clipboard:success="clipboardSuccessHandler" 
                                                        v-clipboard:error="clipboardErrorHandler"
                                                        variant="primary">    
                                                        Copy to clipboard
                                                        </button> -->
                                                </div>
                                            </div>
                                        </b-card-body>
                                    </b-card>
                                 <!--  -->
                                </b-col>
                                        
                            </b-row>
                            <b-row v-else>
                                <p>No events</p>

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
  import {mapGetters} from 'vuex'
  import nativeToast from 'native-toast'

  export default {
    name: 'events',
    methods:{
        clipboardSuccessHandler ({ value, event }) {
        nativeToast({
                message: "Event link copied on clipboard",
                position: 'north-east',
                timeout: 5000,
                type: 'success'
            })
        },
 
    clipboardErrorHandler ({ value, event }) {
        console.log('error', value)
        }

    },
    computed : {
        ...mapGetters(['users','events']),
        getSelectedEvents() {
        return this.events.filter(event_item=>event_item.type==this.event_status)
        },
        newurl(){
           return window.location.href.replace('events', 'eventdetails' )
        } 
    
    },
    data() {
        return{
            foo:'abc',
            type:'light',
            value:3,
            event_status:'events_attended'
        }
    }
  };
</script>
<style scoped>

.checked {
  color: orange;
}

</style>
