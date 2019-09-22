<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total Tags"
                                id="card-1"
                                type="gradient-red"
                                :sub-title="StringTags"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                    <b-tooltip target="card-1" title="Total Application Tags"></b-tooltip>
                </div>
                <!-- StringUsers -->
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total Creators"
                                id="card-2"
                                type="gradient-orange"
                                :sub-title="StringTotalCreators"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                    <b-tooltip target="card-2" title="Total Creators who have created and engagement"></b-tooltip>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Engagements"
                                id="card-3"
                                type="gradient-green"
                                :sub-title="StringEvents"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                    <b-tooltip target="card-3" title="Total Engagements created in application"></b-tooltip>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Attendees"
                                id="card-4"
                                type="gradient-info"
                                :sub-title="StringTotalAttendes"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                      <b-tooltip target="card-4" title="Total number of attendees who have attended an event"></b-tooltip>

                </div>
            </div>
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-12 mb-5 mb-xl-0">
                    <card  header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <b-container fluid>
                                <h3>Dashboard Engagements</h3>
                                <b-row>
                                    <!-- <b-col>
                                        <div class="form-group"
                                        label-for="input-1">
                                        Sort by:
                                                <select class="form-control" v-model="event_key">
                                                    <option selected value="event_name"> Name</option>
                                                    <option value="date" >Date</option>
                                                </select>
                                        </div>
                                    </b-col> -->
                                    <b-col>
                                        <div class="form-group"
                                        label-for="input-1">
                                        Filter by Name:
                                            <b-form-input v-model="name" v-on:keydown="filterbyname" type="text"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col>
                                        <div class="form-group"
                                        label-for="input-1">
                                        Filter by Type:
                                            <b-form-select @change="filterbytype" v-model="selected" :options="options"></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col>
                                        <div class="form-group"
                                        label-for="input-1">
                                        Filter by Date:
                                        <b-form-input  @change="filterbydate" onkeydown="return false" type="date"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col>
                                        <div class="form-group"
                                        label-for="input-1">
                                        Filter by Tags:
                                            <b-form-input v-model="tag_value" v-on:keydown="filterbytag" type="text"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col>
                                        <div class="form-group"
                                        label-for="input-1">
                                        Filter by Location:
                                            <b-form-input v-model="location" v-on:keydown="filterbylocation" type="text"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col>
                                        <div class="form-group mt-3"
                                        label-for="input-1"
                                        label="Sdas">
                                            <b-button variant="success" size="xl" @click="filters=allevents" >Clear Filters</b-button>
                                        </div>
                                    </b-col>
                                </b-row>
                                    
                                <b-row v-if="filters.length>0">
                                    <!-- get_filtered_events -->
                                    <b-col class="col-md-4"   v-for="event_item in filters" v-bind:key="event_item.id">
                                    <b-card
                                            :img-src="event_item.event_image"
                                            img-alt="Image"
                                            img-top
                                            img-height="197px;"
                                            tag="article"
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
                                                    {{event_item.event_location}}</b-card-sub-title>
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
                                                    </div>
                                                </div>
                                            </b-card-body>
                                        </b-card>
                                    </b-col>    
                                </b-row>
                                <b-row v-else>
                                    <b-col class="col-md-3">
                                        <p>No events for selected filter </p>
                                    </b-col>
                                    <b-col>
                                     <b-button variant="success" size="sm" @click="filters=allevents">View All</b-button>

                                    </b-col>
                                </b-row>
                        </b-container>
                        </div>
                    </card>
                </div>
            </div>
            <!-- End charts-->
        </div>

    </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  // Tables
  import SocialTrafficTable from './Dashboard/SocialTrafficTable';
  import PageVisitsTable from './Dashboard/PageVisitsTable';
  import {mapGetters} from 'vuex'
  import nativeToast from 'native-toast'

  export default {
    components: {
      PageVisitsTable,
      SocialTrafficTable,
    },
    computed: {
        ...mapGetters(['tags','users','allevents']),
        StringTags(){
            return this.tags.length.toString()
        },
        StringUsers(){
            return this.users.length.toString()
        },
        StringEvents(){
            return this.allevents.length.toString()
        },
        StringTotalCreators () {
            return this.users.filter(user_item=>user_item.events_hosted!=null).length.toString()
        },
        StringTotalAttendes () {
            return this.users.filter(user_item=>user_item.events_attended!=null).length.toString()
        },
        get_filtered_events () {
            let ref=this
            return this.allevents.sort(function (a, b) {
                var x = a[ref.event_key],
                    y = b[ref.event_key];
                if (typeof x === 'string') {
                    x = x.toLowerCase();
                    y = y.toLowerCase();
                    if (!isNaN(x) && !isNaN(y)) {
                        x = parseInt(x, 10);
                        y = parseInt(y, 10);
                    }
                }
                return (x < y ? -1 : (x > y ? 1 : 0));
            });
        },
        newurl(){
           return window.location.href.replace('dashboard', 'eventdetails' )
        } 
    },
    data() {
      return {
        value:3,
        event_key:"event_name",
        filters:[],
        location:'',
        name:'',
        selected:null,
        tag_value:'',
        options:[
            {text:'Select Type',value:null},
            {text:'Virtual',value:'virtual'},
            {text:'In Person',value:'in Person'}
        ]
      };
    },
    methods: {
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
        },
        filterbydate(date,$event){
            let newdate=date.split('-')            
            if(newdate[1].split('',1)[0]==0){
                newdate[1]=newdate[1].split('',2)[1]
            }
            let ogdate=newdate[1]+'/'+newdate[2]+'/'+newdate[0]
            this.filters=this.allevents.filter(event_item=>event_item.date==ogdate)
            
        },
        filterbylocation(){
            let arrs=this.allevents.filter(event_item=>event_item.event_location.toLowerCase().includes(this.location.toLowerCase()))
            if(arrs.length>0){
            this.filters=arrs

            }
            else{
                this.filters=[]
            }
        },
        filterbyname(){
            let arrs=this.allevents.filter(event_item=>event_item.event_name.toLowerCase().includes(this.name.toLowerCase()))
            if(arrs.length>0){
            this.filters=arrs

            }
            else{
                this.filters=[]
            }
        },
        filterbytag() {
            
            //get tag id 
            console.log(this.tag_value)
            if(this.tag_value==''){
                this.filters=this.allevents
            }
            else{
                let obj=this.tags.find(tag_item=>tag_item.value.toLowerCase().includes(this.tag_value.toLowerCase()))
                console.log(obj)
                //compare with all events that have that id 
                if(obj){
                let arrs=this.allevents.filter(event_item=>event_item.tags.includes(obj.id))
                return this.filters=arrs
                }
                else{
                return this.filters=[]
                }
            }
            

            //return array
            // return this.filters=arrs
        },
        filterbytype (val) {
            if(val=='virtual' || val=='in Person'){
                this.filters=this.allevents.filter(event_item=>event_item.event_type==val)
            }
            else if(val==null){
                this.filters=this.allevents
            }

        }
    },
    mounted() {
       this.filters=this.allevents
    }
  };
</script>
<style></style>
