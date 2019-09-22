<template>
  <div class="">
    
    <div class="content">
      <div class="container">
        <div class="col-md-8 ml-auto mr-auto">
          <div class="alert alert-success" v-if="success">Verification Link has been sent. Please Check Email</div>
          <alert type="danger" v-if="warning" dismissible>
            <div class="alert-icon">
              <i class="now-ui-icons objects_support-17"></i>
            </div>
            <strong>Something went wrong!</strong> {{ message }}
          </alert>
            <card class="register-card">
              <h3 class="text-center text-info"><b>CREATE ACCOUNT</b></h3>
            <form action="" >
              <div class="row">
                  <div class="col-md-6">
                      <fg-input
                          class="no-border input-lg"
                          addon-left-icon="now-ui-icons users_single-02"
                          placeholder="First Name"
                          v-model="firstName"
                          type="text">
                      </fg-input>
                  </div>
                  <div class="col-md-6">
                      <fg-input
                          class="no-border input-lg"
                          addon-left-icon="now-ui-icons users_single-02"
                          placeholder="Last Name"
                          v-model="lastName"
                          type="text">
                      </fg-input>
                  </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                      <fg-input
                          class="no-border input-lg"
                          addon-left-icon="now-ui-icons ui-1_email-85"
                          placeholder="Email"
                          v-model="email"
                          type="email">
                      </fg-input>
                </div>
                <div class="col-md-6">
                      <fg-input>
                        <el-date-picker
                          type="date"
                          class="bgc"
                          popper-class="date-picker date-picker-success"
                          placeholder="Birth Day"
                          v-model="age"
                        >
                      </el-date-picker>
                      </fg-input>
                </div>
              </div>
              <div class="row inputField">
                  <div class="col-md-6">
                      <fg-input
                          class="no-border input-lg"
                          addon-left-icon="now-ui-icons business_briefcase-24"
                          placeholder="Occupation"
                          v-model="job_occupation"
                          
                          type="text">
                      </fg-input>
                  </div>
                  <div class="col-md-6">
                      <fg-input
                          class="no-border input-lg"
                          addon-left-icon="now-ui-icons education_hat"
                          placeholder="School"
                          v-model="institute"
                          
                          type="text">
                      </fg-input>
                  </div>
              </div>
              <div class="row inputField">
                  <div class="col-md-6">
                      <fg-input
                          class="no-border input-lg"
                          addon-left-icon="now-ui-icons ui-1_lock-circle-open"
                          placeholder="Password"
                          v-model="password"
                          type="password">
                      </fg-input>
                  </div>
                  <div class="col-md-6">
                      <fg-input
                          class="no-border input-lg"
                          addon-left-icon="now-ui-icons ui-1_lock-circle-open"
                          placeholder="Confirm Password"
                          v-model="confirmPassword"
                          
                          type="password">
                      </fg-input>
                  </div>
              </div>
            
              <div class="row inputField">
                  <div class="col-md-12">
                      <fg-input
                          class="no-border input-lg"
                          addon-left-icon="now-ui-icons ui-2_chat-round"
                          placeholder="About"
                          v-model="about"
                          
                          type="text">
                      </fg-input>
                  </div>
              </div>

              <div class="row inputField">
                  <div class="col-md-12">
                      <multiselect v-model="value" 
                        :options="allTags" 
                        :multiple="true" 
                        :close-on-select="false" 
                        :clear-on-select="false" 
                        :preserve-search="true" 
                        placeholder="Pick Your Interests" 
                        label="value" 
                        track-by="value" 
                        :preselect-first="false">
                          <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                      </multiselect>
                      <div class="card-footer text-center" id="button">
                    <!-- <button class="btn btn-info btn-round btn-block" @click="validateUser">Register</button> -->
                    <input type="submit"
                    value="Register"
                    @click="validateUser"
                    class="btn btn-info text-white btn-round btn-lg btn-block" 
                    />
                </div>
                <div class="text-center">
                  <h6>
                    <router-link class="link footer-link text-center text-success" to="/login">
                      Already Have an Account? Login
                    </router-link>
                  </h6>
                </div>
                      <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
                      <!-- <b-form-select v-model="selected" :options="options" multiple class="multiple"></b-form-select> -->
                  </div>
              </div>
              </form>
            </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, Button, FormGroupInput, Alert } from '@/components';
import MainFooter from '@/layout/MainFooter';
import { DatePicker } from 'element-ui';
import Multiselect from 'vue-multiselect'
import { mapGetters, mapActions } from 'vuex';
import { setTimeout } from 'timers';
export default {
  name: 'register-page',
  bodyClass: 'login-page',
  components: {
    Card,
    [DatePicker.name]: DatePicker,
    Alert,
    Multiselect,
    MainFooter,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  computed: { ...mapGetters(['allTags', 'status', 'error', 'user'])},
  data() {
      return {
        
        success: false,  
        firstName: null,
        lastName: null,
        age: null,
        email: null,
        job_occupation: null,
        institute: null,
        about: null,
        password: null,
        confirmPassword: null,
        value: [],
        interestId: [],
        userData: {
          first_name: '',
          last_name: '',
          age: '',
          email: '',
          password: '',
          job_occupation: '',
          institute: '',
          about: '',
          interests: []
        },
        message: '',
        warning: false,
              
      }
  },

  methods: {
      ...mapActions(['fetchTags', 'createUser']),

      validateUser() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(this.firstName == null || this.lastName == null || this.age == null || this.email == null || this.password == null || this.confirmPassword == null || this.job_occupation == null || this.institute == null){
          this.message = "Please Fill all Fields."
          this.warning = true
        }
        else if(this.password != this.confirmPassword){
          this.message = "Password Mismatch."
          this.warning = true
        }
        else if(!re.test(this.email.toLowerCase())) {
          this.message = "Invalid Email."
          this.warning = true
        }
        else {
          this.registerUser();
        }
      },
    registerUser() {
        const newDate = this.age.toLocaleDateString()
        this.userData.age = newDate;
        if(this.value != null) {
          this.value.forEach(item => {
            this.interestId.push(item.id)
          })
          
          this.userData.first_name = this.firstName;
          this.userData.last_name = this.lastName;
          
          this.userData.email = this.email;
          this.userData.password = this.password;
          this.userData.job_occupation = this.job_occupation;
          this.userData.institute = this.institute;
          this.userData.about = this.about;
          this.userData.interests = this.interestId
          
          this.createUser(this.userData);  
        }
        else {
          this.userData.first_name = this.firstName;
          this.userData.last_name = this.lastName;
          this.userData.email = this.email;
          this.userData.password = this.password;
          this.userData.job_occupation = this.job_occupation;
          this.userData.institute = this.institute;
          this.userData.about = this.about;

          this.createUser(this.userData);
          
        }  
        console.log(this.userData.age)
      
   },
  },
  watch: {
    status(val) {
      if(val) {
        setTimeout(() => {
          if(this.status == 'success'){
            console.log('success ho gya')
            this.success = true;
            // window.location.href = '/';
          }
          else {
            console.log('Failure');
          }
        }, 500)
      }
    },
    error(val) {
      console.log('In Error')
      if(val) {
        setTimeout(() => {
          if(this.error != null){
            //console.log('success ho gya')
            this.message = this.error
            this.warning = true
            // window.location.href = '/';
          }
          else {
            console.log('eee');
          }
        }, 500)
      }
    }
  },

  created() {
    this.fetchTags();
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
  
  /* .inputField {
      margin-top: -55px;
  } */
  .register-card {
    margin-top:0px;
  }
  .left {
      float: left;
  }
  .card-width {
      max-width:600px !important;
  }
  .multiple {
          background-color: rgba(255, 255, 255, 0.1);
    color: #FFFFFF;
    outline: none;
    border-radius: 25px;
  }
  .bgc {
    background: #f5f5f5;
    border-radius: 20px;
  }
</style>
