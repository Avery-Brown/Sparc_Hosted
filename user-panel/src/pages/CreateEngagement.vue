<template>
    <div>
        <div class="main">
            <div class="section">
                <div class="container ml-auto mr-auto">
                    <div class="col-md-2"></div>
                    <div class="col-md-12">
                        <h2 class="text-center title-up text-info">Create New Engagement</h2>
                        <!-- <div class="space-50"></div> -->
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <label for="">Upload Engagement Featured Image*</label>
                                <input type="file" class="btn btn-primary mb-3" @change="onFileSelected">
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <label for="">Upload Engagement Video</label><br/>
                                <input type="file" class="btn btn-primary mb-3" @change="onVideoSelected">
                            </div>
                        </div>
                        <div class="row">
                            <div class="event_form_item" style="width: 340px;">
                                <label for="">Title*</label>
                                <fg-input v-model="eventPayload.event_name"></fg-input>
                            </div>
                            <div class="event_form_item" style="width: 120px;">
                                    <label for="">Date*</label>
                                    <fg-input>
                                    <el-date-picker
                                        type="date"
                                        popper-class="date-picker date-picker-success"
                                        :picker-options="pickerOptions"
                                        v-model="eventPayload.date"
                                    >
                                    </el-date-picker>
                                    </fg-input>
                            </div>
                        <!-- </div> -->
                            <div class="event_form_item" style="width: 120px;">
                                <label for="">Start Time*</label>
                                <fg-input>
                                    <!-- <el-time-select
                                        v-model="eventPayload.start_time"
                                        :picker-options="{
                                            start: '1:00',
                                            step: '00:15',
                                            end: '12:59',
                                            format: 'HH:mm a'
                                        }"
                                        placeholder="Select time">
                                        </el-time-select> -->
                                    <el-time-picker
                                        type="time"
                                        value-format="hh:mm a"
                                        popper-class="time-picker time-picker-primary"
                                        v-model="eventPayload.start_time"
                                        :picker-options="{
                                            format: 'HH:mm a',

                                        }"
                                    >
                                    </el-time-picker>
                                </fg-input>
                            </div>
                            <div class="event_form_item" style="width: 120px;">
                                <label for="">End Time*</label>
                                <fg-input>
                                    <el-time-picker
                                        type="time"
                                        value-format="hh:mm a"
                                        popper-class="time-picker time-picker-primary"
                                        v-model="eventPayload.end_time"
                                        :picker-options="{
                                            format: 'HH:mm a',

                                        }"
                                    >
                                    </el-time-picker>
                                </fg-input>
                            </div>
                            <!-- <div class="row"> -->
                                <div class="event_form_item" style="width: 260px;">
                                    <label for="">Host Contact Information*</label>
                                    <fg-input v-model="eventPayload.host_contact"></fg-input>
                                </div>
                            <!-- </div> -->
                        </div>
                        <div class="row">
                            <div class="event_form_item" style="width: 340px;">
                                <label for="">Location*</label>
                                <fg-input v-model="eventPayload.event_location"></fg-input>
                            </div>
                            <div class="event_form_item" style="width: 340px;">
                                <label for="">Street Address*</label>
                                <fg-input v-model="eventPayload.event_address"></fg-input>
                            </div>
                            <div class="event_form_item" style="width: 340px; margin-right: 0px;">
                                <label for="">Location Access Instructions*</label>
                                <fg-input v-model="eventPayload.event_location_access"></fg-input>
                            </div>
                        </div>
                        <!-- <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <label for="">Space Name/Number(Lobby of Hotel)*</label>
                                <fg-input v-model="eventPayload.event_space"></fg-input>
                            </div>
                        </div> -->
                        <div class="row">
                            <div class="col-md-12 col-lg-12">
                                <label for="">Description*</label>
                                <fg-input v-model="eventPayload.event_description"></fg-input>
                            </div>
                        </div>

                        <div class="row mb-2">
                            <div class="event_form_item" style="width: 400px;">
                                <label for="">Tags*</label>
                                <multiselect v-model="eventPayload.tags"
                                :options="allTags"
                                :multiple="true"
                                :close-on-select="false"
                                :clear-on-select="false"
                                :preserve-search="true"
                                label="value"
                                track-by="value"
                                :preselect-first="false">
                                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                                </multiselect>
                            </div>
                            <div class="event_form_item" style="margin-bottom: 0px; margin-top: 55px;">
                                <label for="" class="mb-3">Is the Engagement virtual, in person, or both ?</label>
                                  <input style="margin-left:10px;" type="radio" v-model="eventPayload.event_type" value="virtual"> Virtual
                                  <input style="margin-left:10px;" type="radio" v-model="eventPayload.event_type" value="in Person"> In Person
                                  <input style="margin-left:10px;" type="radio" v-model="eventPayload.event_type" value="both"> Both
                            </div>
                        </div>
                        <div class="row mt-3" v-if="eventPayload.event_type == 'in Person'">
                            <div class="event_form_item" style="width: 130px;">
                                <label for="">Capacity*</label>
                                <fg-input type="number" min="1" v-model="eventPayload.capacity"></fg-input>
                            </div>
                        </div>
                        <div class="row mt-3" v-if="eventPayload.event_type == 'virtual'">
                            <div class="event_form_item" style="width: 130px;">
                                <label for="">Capacity*</label>
                                <fg-input type="number" min="1" v-model="eventPayload.virtual_capacity"></fg-input>
                            </div>
                            <div class="event_form_item" style="width: 500px;">
                                <label for="">Virtual Conference Link</label>
                                <fg-input placeholder="Please enter a Zoom or Google Hangout Link" v-model="eventPayload.zoom_link"></fg-input>
                            </div>
                            <!-- <div class="col-md-6 col-lg-6">
                                <label for="">Google Hangout Link</label>
                                <fg-input placeholder="Google Hangout Link (Please enter a Zoom or Google Hangout Link)" v-model="eventPayload.google_link"></fg-input>
                            </div> -->
                        </div>
                        <div class="row mt-3" v-if="eventPayload.event_type == 'both'">
                            <div class="event_form_item" style="width: 130px;">
                                <label for="">Physical Capacity*</label>
                                <fg-input type="number" min="1" v-model="eventPayload.capacity"></fg-input>
                            </div>
                            <div class="event_form_item" style="width: 130px;">
                                <label for="">Virtual Capacity*</label>
                                <fg-input type="number" min="1" v-model="eventPayload.virtual_capacity"></fg-input>
                            </div>
                            <div class="event_form_item" style="width: 500px;">
                                <label for="">Virtual Conference Link</label>
                                <fg-input placeholder="Please enter a Zoom or Google Hangout Link" v-model="eventPayload.zoom_link"></fg-input>
                            </div>
                            <!-- <div class="col-md-6 col-lg-6">
                                <label for="">Google Hangout Link</label>
                                <fg-input placeholder="Google Hangout Link (Please enter a Zoom or Google Hangout Link)" v-model="eventPayload.google_link"></fg-input>
                            </div> -->
                        </div>

                        <div class="row mt-3">
                            <!-- <div class="col-md-6 col-lg-6"> -->
                                <label style="margin-left: 15px;" for="">Will this Engagement be Free ?</label>
                                <input style="margin-top:3px; margin-left: 15px; margin-right: 5px;" type="radio" v-model="eventPayload.event_free" value="yes"> Yes
                                <input style="margin-top:3px; margin-left: 15px; margin-right: 5px;" type="radio" v-model="eventPayload.event_free" value="no"> No
                            <!-- </div> -->

                        <div class="row mt-2" v-if="eventPayload.event_free == 'no'">
                            <div class="event_form_item" id="price_form" style="margin-bottom: -10px; margin-top: -8px; margin-left: 50px;">
                                <label for="">$ Price Per Person*</label>
                                <fg-input style="width: 130px; margin-top: -8px; margin-left:15px;" type="number" min="1" v-model="eventPayload.event_price_per_person"></fg-input>
                            </div>

                            <div class="event_form_item" style="margin-bottom: -10px; margin-top: -8px; margin-left: 20px;">
                                <label for="">Will this Engagement go to a cause ?</label>
                                <input style="margin-left:10px;" type="radio" v-model="eventPayload.cause" value="yes"> Yes
                                <input style="margin-left:10px;" type="radio" v-model="eventPayload.cause" value="no"> No
                            </div>
                        </div>
                            <div v-if="eventPayload.cause == 'yes' && eventPayload.event_free == 'no'">
                              <div style="display: flex; flex-direction: row; margin-top: 15px;">
                                <label class="event_form_item" style="margin-top: 23px;" for="">Select Charity 1*</label>
                                <fg-input class="event_form_item" v-model="eventPayload.charity1"></fg-input>

                                <label class="event_form_item" style="margin-top: 23px;" for="">% to Charity 1*</label>
                                <fg-input class="event_form_item" type="number" min="1" v-model="eventPayload.event_cause1"></fg-input>
                              </div>
                              <div style="display: flex; flex-direction: row;">
                                <label class="event_form_item" style="margin-top: 23px;"  for="">Select Charity 2&nbsp;</label>
                                <fg-input class="event_form_item" v-model="eventPayload.charity2"></fg-input>

                                <label class="event_form_item" style="margin-top: 23px; padding-right: 1px;"  for="">% to Charity 2 </label>
                                <fg-input class="event_form_item" type="number" min="1" v-model="eventPayload.event_cause2"></fg-input>
                              </div>
                            </div>
                        </div>

                        <div style="display: flex; justify-content: center;">
                            <n-button style="margin-top: 25px; margin-bottom:-15px;font-size: 20px;background-color: rgb(54,170,252); text-align: center; width: 400px; border-radius: 5px;" @click="validateEvent">{{ createButton }}</n-button>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <alert type="danger" v-if="warning" dismissible>
                                    <div class="alert-icon">
                                    <i class="now-ui-icons objects_support-17"></i>
                                    </div>
                                    <strong>Something went wrong!</strong> {{ message }}
                                </alert>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
  Button,
  Alert,
  Checkbox,
  Radio,
  FormGroupInput,
  Switch
} from '@/components';
import { DatePicker, TimePicker, TimeSelect } from 'element-ui';
import Multiselect from 'vue-multiselect'
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'create_engagement',
    components: {
        Multiselect,
        Alert,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [Radio.name]: Radio,
    [DatePicker.name]: DatePicker,
    [TimePicker.name]: TimePicker,
    [TimeSelect.name]: TimeSelect,
    [FormGroupInput.name]: FormGroupInput,
    [Switch.name]: Switch,
    [Option.name]: Option,
  },
  computed: { ...mapGetters(['allTags', 'eventCreated', 'charities'])},
  data() {
      return {
          file: '',
          createButton: 'Create Engagement',
          pickerOptions: {
            disabledDate(time) {
                return time.getTime() < Date.now() - 3600 * 1000 * 24;
            },
          },
          timeValue: {
            HH: "10",
            mm: "05",
            ss: "00"
        },
        eventPayload: {
            created_by: null,
            event_name: null,
            charity1: null,
            charity2: null,
            deleted: false,
            event_location: null,
            event_address: null,
            event_location_access: null,
            // event_space: null,
            host_contact: null,
            zoom_link: null,
            capacity: null,
            virtual_capacity: null,
            // google_link: null,
            event_cause1: null,
            event_cause2: null,
            event_price_per_person: null,
            cause: 'no',
            event_free: 'yes',
            event_type: 'in Person',
            tags: [],
            date: null,
            start_time: null,
            end_time: null,
            event_description: null,
            event_image: null,
            event_video: null,
        },
        warning: false,
        message: '',
        interestId: [],
        allCharites: []
      }
  },
  methods: {
      ...mapActions(['fetchTags','createEvent', 'fetchCharities', 'updateTags']),

      validateEvent() {
          if(this.eventPayload.event_name == null || this.eventPayload.event_location == null || this.eventPayload.host_contact == null || this.eventPayload.event_address == null || this.eventPayload.event_location_access == null || this.eventPayload.date == null || this.eventPayload.start_time == null || this.eventPayload.end_time == null || this.eventPayload.event_description == null || this.eventPayload.tags == null){
              this.message = "Please Fill Required Fields"
              this.warning = true
          }
          else if(this.eventPayload.event_type == 'in Person' && this.eventPayload.capacity == null) {
              this.message = "Please Set In Person Capacity for Engagement"
              this.warning = true
          }
          else if(this.eventPayload.capacity != null && this.eventPayload.capacity < 1) {
              this.message = "Please Set Valid In Person Capacity for Engagement"
              this.warning = true
          }
          else if(this.eventPayload.event_type == 'virtual' && (this.eventPayload.zoom_link == null)) {
              this.message = "Please Enter Zoom Link and Google Hangout Link for Engagement"
              this.warning = true
          }
          else if(this.eventPayload.event_type == 'both' && (this.eventPayload.zoom_link == null)) {
              this.message = "Please Enter Zoom Link and Google Hangout Link for Engagement"
              this.warning = true
          }
          else if(this.eventPayload.event_type == 'virtual' && this.eventPayload.virtual_capacity == null) {
              this.message = "Please Set Virtual Capacity for Engagement"
              this.warning = true
          }
          else if(this.eventPayload.virtual_capacity != null && this.eventPayload.virtual_capacity < 1) {
              this.message = "Please Set Valid Virtual Capacity for Engagement"
              this.warning = true
          }
          else if(this.eventPayload.event_type == 'both' && (this.eventPayload.capacity == null || this.eventPayload.virtual_capacity == null )) {
              this.message = "Both In Person and Virtual Capacity Required"
              this.warning = true
          }
          else if(this.eventPayload.event_type == 'both' && (this.eventPayload.capacity != null && this.eventPayload.capacity < 1) || (this.eventPayload.virtual_capacity != null && this.eventPayload.virtual_capacity < 1)) {
              this.message = "Valid In Person and Virtual Capacity Required"
              this.warning = true
          }
          else if(this.eventPayload.event_free == 'no' && this.eventPayload.event_price_per_person == null) {
              this.message = "Please Enter Price Per Person for Engagement"
              this.warning = true
          }
          else if(this.eventPayload.event_price_per_person != null && this.eventPayload.event_price_per_person < 1) {
              this.message = "Please Enter Price Valid Per Person for Engagement"
              this.warning = true
          }
          else if(this.eventPayload.cause == 'yes' && this.eventPayload.charity1 == null) {
              this.message = "Please Select Charity 1 for Cause"
              this.warning = true
          }
          else if(this.eventPayload.cause == 'yes' && this.eventPayload.event_cause1 == null) {
              this.message = "Please Select Cause for Charity"
              this.warning = true
          }
          else if(this.eventPayload.charity1 != null && this.eventPayload.event_cause1 < 1) {
              this.message = "Please Enter Valid Percentage for Charity 1"
              this.warning = true
          }
          else if(this.eventPayload.event_cause1 != null && this.eventPayload.event_cause1 < 1) {
              this.message = "Please Select Valid Percentage for Charity 1"
              this.warning = true
          }
          else if(this.eventPayload.charity2 == null && this.eventPayload.charity1 != null && parseInt(this.eventPayload.event_cause1) > 100) {
              this.message = "Please select a percentage amount that is less than 100"
              this.warning = true

          }     
          else if(this.eventPayload.charity2 != null && this.eventPayload.charity1 != null && (parseInt(this.eventPayload.event_cause1) + parseInt(this.eventPayload.event_cause2) > 100)) {
              this.message = "Please Select Percentage Amounts that total less than 100"
              this.warning = true
          }
          else if(this.eventPayload.charity2 == null && this.eventPayload.charity1 != null && parseInt(this.eventPayload.event_cause1) > 100) {
              this.message = "Please select a percentage amount that is less than 100"
              this.warning = true
          }
          else if(this.eventPayload.charity2 != null && this.eventPayload.event_cause2 < 1) {
              this.message = "Please Enter Valid Percentage for Charity 2"
              this.warning = true
          }
        //   else if(this.eventPayload.event_image == null) {
        //       this.message = "Please Pick Event Image"
        //       this.warning = true
        //   }
          else {
              console.log("OK")
              this.registerEvent();
          }
      },

      registerEvent() {
          this.createButton = "Creating Engagement Please Wait..."
          const newDate = this.eventPayload.date.toLocaleDateString()
          this.eventPayload.date = newDate

            if(this.eventPayload.tags != null) {
                this.eventPayload.tags.forEach(item => {
                this.interestId.push(item.id)
                })
                this.eventPayload.tags.forEach(item => {
                    item.count++
                    console.log(item)
                    this.updateTags(item)
                })
            }

          this.eventPayload.tags = this.interestId

          this.createEvent(this.eventPayload);

      },
      onFileSelected(event) {
          let file = event.target.files[0]
          this.eventPayload.event_image = file
          var extension = file.name.substring(file.name.lastIndexOf('.')+1);
      },
      onVideoSelected(event) {
          let video = event.target.files[0];
          this.eventPayload.event_video = video
          console.log(this.eventPayload.event_video.name);
      }
  },
  created() {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if(loggedUser != null) {
        this.eventPayload.created_by = loggedUser.id
    }
    this.fetchTags();
    this.fetchCharities()
  },

  watch: {
      eventCreated(val) {
          if(val == 'success') {
              this.$router.push({path: '/host'})
          }
      }
  }
}
</script>

<style scoped>

</style>
