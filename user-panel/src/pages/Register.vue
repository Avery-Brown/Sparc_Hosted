<!--This code was developed in part by Lizzet Clifton, Eric Lin, Jordan Shapiro, and Katelyn Chang for Duke CS408-->
<template>
  <div class="main" style="background: whitesmoke; " :class="[this.stage===4 ? 'stage-4' : 'stage-before' ]">
    <div class="content">
      <div class="container">
        <div class = "row">
          <div class = "col-md-8 ml-auto mr-auto text-center">
            <div class = "row" style ="margin-top: 3rem;">
              <div class="card shadow-md"> 
                <div class = "card-body">
                <div class = "row" style="margin-top: 30px;">
                  <div class = "col">
                    <p style="font-weight: 600; font-size: 30px; color: #484848">Sign Up</p>
                    <p style="font-size: 20px; font-weight: 400; color: #484848; margin-top: -15px;">Ready to learn, teach, and share?</p>
                  </div>
                </div>
                <div class = "top" style="margin-top: -10px; margin-bottom: -30px;">
                  <div class = "divider-line" :style="{width: `${(100/(4) * (4 - 1)) - 10}%`}"/>
                  <div class = "icon-wrapper">
                    <div class = "step">
                      <div class = "circle">
                          <i :class="['fa fa-user', stage===0 || stage ===1 || stage === 2 || stage === 3 || stage === 4 ? 'active' : 'inactive']"/>
                      </div>
                    </div>
                    <div class = "step">
                      <div class = "circle">
                          <i :class="['fa fa-user-lock', stage===1 || stage === 2  || stage === 3 || stage === 4 ? 'active' : 'inactive']"/>
                      </div>
                    </div>
                    <div class = "step">
                      <div class = "circle">
                          <i :class="['fa fa-user-edit', stage===2  || stage === 3 || stage === 4 ? 'active' : 'inactive']"/>
                      </div>
                    </div>
                    <div class = "step">
                      <div class = "circle">
                          <i :class="['fa fa-share-alt', stage===3 || stage === 4 ? 'active' : 'inactive']"/>
                      </div>
                    </div>
                  </div>
                </div>
                <transition name="slide">
                  <div v-if="stage===0" class="card-body">
                    <div class = "row">
                      <div class = "col text-left">
                        <p style="font-size: 23px; font-weight: 300; color:#484848 ">Nice to meet you, {{firstName}}!</p>
                      </div>
                    </div>
                    <div class = "row">
                      <div class = "col text-left">
                        <b-form-group label="First Name">
                          <b-form-input
                          class="no-border"
                          addon-left-icon="now-ui-icons users_single-02"
                          placeholder="First Name"
                          v-model="firstName"
                          type="text"/>
                        </b-form-group>
                        <b-form-group label="Last Name">
                          <b-form-input
                            class="no-border"
                            addon-left-icon="now-ui-icons users_single-02"
                            placeholder="Last Name"
                            v-model="lastName"
                            type="text"/>
                        </b-form-group>
                        <b-form-group label="Birthday" style="width: 9rem">
                            <el-date-picker
                              style="border-radius: 20px;"
                              type="date"
                              popper-class="date-picker date-picker-success"
                              placeholder="YYYY-MM-DD"
                              v-model="age"
                            >
                            </el-date-picker>
                        </b-form-group>
                      </div>
                      </div>
                      <div class="row">
                        <div class = "col text-left">
                          <button
                              :class="[( firstName =='' || lastName =='' || age==null) ? 'next-button-disabled' : 'next-button' ]"  
                              :disabled="firstName =='' || lastName =='' || age==null"
                              @click="incrementStage"
                            >Next</button>
                        </div>
                    </div>
                  </div>
                </transition>
                <transition name="slide">
                  <div v-if="stage===1" class="card-body">
                    <div class = "row">
                      <div class = "col text-left">
                        <p style="font-size: 23px; font-weight: 300; color:#484848 ">Let's get some account information</p>
                      </div>
                    </div>
                    <div class = "row">
                      <div class = "col text-left">
                        <alert type="danger" v-if="this.warning" dismissible>
                            <div class="alert-icon">
                              <i class="now-ui-icons objects_support-17"></i>
                            </div>
                          <strong>Something went wrong!</strong> {{ message }}
                        </alert>
                        <b-form-group label="Email" description="We'll never share your email with anyone else.">
                          <b-form-input
                              placeholder="Email"
                              v-model="email"
                              type="text">           
                          </b-form-input>
                        </b-form-group>                        
                      <b-form-group label="Password">
                        <b-form-input
                          placeholder="Password"
                          v-model="password"
                          type="password"/>
                      </b-form-group>
                      
                      
                      <p v-if="password.length < 6 && password != ''" style="color: #c91512; font-weight: 400; font-size: 13px;">Password must be at least 6 characters long</p>
                      <b-form-group label="Confirm Password">
                        <b-form-input
                            
                            placeholder="Confirm Password"
                            v-model="confirmPassword"
                            type="password"/>

                      </b-form-group>
                      
                      <p v-if="confirmPassword != password && confirmPassword != ''" style="color: #c91512; font-weight: 400; font-size: 13px;">Passwords much match</p>
                      <div class = "row">
                        <div class = "col text-left">
                          <button
                            class="previous-button"
                            @click="decrementStage"
                          >Previous</button>
                          <button
                              :class="[(email =='' || password =='' || confirmPassword == '' || confirmPassword != password) ? 'next-button-disabled' : 'next-button' ]"  
                              :disabled="email =='' || password =='' || confirmPassword == '' || confirmPassword != password"
                              @click="incrementStage"
                            >Next</button>
                        </div>
                      </div>
                      </div>
                    </div>

                  </div>
                </transition>
                <transition name="slide">
                  <div v-if="stage===2" class = "card-body">
                    <div class = "row">
                      <div class = "col text-left">
                        <p style="font-size: 23px; font-weight: 300; color:#484848 ">Let's get to know you some more (optional)</p>
                        <div class = "row">
                          <div class="col-md-6">
                            <b-form-group label="Occupation">
                              <b-form-input
                            
                                placeholder="What do you do?"
                                v-model="job_occupation"

                                type="text"/>
                            </b-form-group>
                            
                          </div>
                          <div class="col-md-6">
                            <b-form-group label="School">   
                              <b-form-input
                                  placeholder="Attend an institution?"
                                  v-model="institute"
                                  type="text"/>
                            </b-form-group>
                             
                          </div>
                        </div>
                        <div class = "row">
                          <div class = "col text-left">
                            <b-form-group label="About">
                              <b-form-textarea
                                style="border: 0.5px solid #e3e3e3; border-radius: 5px; padding-left: 20px; padding-bottom: 20px; margin-bottom: 20px;"  
                                placeholder="Tell us more about yourself! Your interests, passions, hobbies... anything!"
                                v-model="about"
                              type="text"/>
                            </b-form-group>
                            
                            <b-form-group label = "Pick your interests">
                               <multiselect 
                                v-model="value"
                                :options="allTags"
                                :multiple="true"
                                :close-on-select="true"
                                :clear-on-select="true"
                                :preserve-search="false"
                                placeholder="Select"
                                label="value"
                                track-by="value"
                                :taggable="false"
                                :preselect-first="false"
                                />
                            </b-form-group>
                             
                          </div>
                        </div>
                        <div class = "row" style="margin-top: 15px;">
                          <div class = "col">
                            <button class = "update-button" @click="onPickImage">Add Profile Image</button>
                            <span v-if="this.image != null && this.image.profile_image != null">{{this.image.profile_image.name}}</span>
                            <input type="file" accept="image/*" @change="onImageSelected" style="display:none;" ref="ImageInput">
                            <span><i v-if="this.image.profile_image != null" class="fa fa-trash" @click="removeImage" style="margin-left: 1rem"/></span>
                          </div>
                        </div>
                        <div class = "row" style="margin-top: 10px;">
                          <div class = "col">
                            <button class = "update-button" @click="onPickVideo">Add Profile Video</button>
                            <span v-if="this.video != null && this.video.profile_video != null">{{this.video.profile_video.name}}</span>
                            <input type="file" accept="video/*" @change="onVideoSelected" style="display:none;" ref="VideoInput">
                            <span><i v-if="this.video.profile_video != null" class="fa fa-trash" @click="removeVideo" style="margin-left: 1rem" /></span>
                          </div>
                        </div>
                        <div class = "row " style="margin-top: 10px;">
                          <div class = "col text-left">
                            <button
                              class="previous-button"
                              @click="decrementStage"
                            >Previous</button>
                            <button
                                class='next-button' 
                                @click="incrementStage"
                              >Next</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
                <transition name="slide">
                  <div v-if="stage===3" class = "card-body">
                    <div class = "row">
                      <div class = "col text-left">
                        <p style="font-size: 23px; font-weight: 300; color:#484848 ">Want to share social media? (optional)</p>
                        <div class = "row" style="margin-top: 10px;">
                          <div class = "col">
                            <label>Facebook</label>
                            <fg-input
                                  id="login_input"
                                  class="no-border input-lg"
                                  addon-left-icon="fab fa-facebook"
                                  placeholder="Facebook"
                                  v-model="facebook"
                                  type="text"
                                  />
                            <label>Instagram</label>
                            <fg-input
                                    id="login_input"
                                    class="no-border input-lg"
                                    addon-left-icon="fab fa-instagram"
                                    placeholder="Instagram"
                                    v-model="instagram"
                                    type="text"/>
                            <p v-if="password.length < 6 && password != ''" style="color: #c91512; font-weight: 400; font-size: 13px;">Password must be at least 6 characters long</p>
                            <label>Linkedin</label>
                            <fg-input
                                      id="login_input"
                                      class="no-border input-lg"
                                      addon-left-icon="fab fa-linkedin"
                                      placeholder="Linkedin"
                                      v-model="linkedin"
                                      type="text"/>
                            <label>Twitter</label>
                            <fg-input
                                      id="login_input"
                                      class="no-border input-lg"
                                      addon-left-icon="fab fa-twitter"
                                      placeholder="Twitter"
                                      v-model="twitter"
                                      type="text"/>
                          </div>
                        </div>
                        <div class = "row">
                          <div class = "col text-left">
                            <button
                              class="previous-button"
                              @click="decrementStage"
                            >Previous</button>
                            <button
                                class='next-button' 
                                @click="incrementStage"
                              >Sign up</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
                <transition name="slide">
                  <div v-if="stage === 4" class = "card-body">
                    <div class = "row">
                      <div class = "col text-center">
                        <p style="font-weight: 500; font-size: 30px; color: #484848">Thank you for signing up!</p>
                        <lottie :options="checkOptions" :width="100" :height="100" v-on:animCreated="handleAnimation"/>
                        <p style="font-weight :400; font-size: 15px; color: #484848; margin-top: 20px;"> A verification link has been sent to your email! </p>
                        <button class="go-to-login" @click="goToLogin" style="margin: 0">Login Here</button>
                      </div>
                    </div>
                  </div>
                  <div class = "row">
                    <div class = "col text-left">
                      <p v-if="stage!=4" style="display: inline-block; font-weight: 400; font-size: 13px; color: #484848; margin-left: 20px;"> Already have an account?</p> <router-link v-if="stage!=4" to="/login" style="font-size: 13px; font-weight: 500; color: #32d477; display: inline-block; text-decoration: none"> &nbsp;Login</router-link>
                    </div>
                  </div>
                </transition>
                </div>
                </div>
              <router-link class="link footer-link pull-left" to="/meet-team" style= "color: #484848; text-decoration: none; font-size: 14px;">
                Meet the Team&nbsp;&nbsp;&nbsp;|
              </router-link>
              <a class = "social-link" style = "color: #484848" href="https://www.facebook.com/SparcTheWorld/" target="_blank"><i class="fab fa-facebook fa-lg"/></a>
              <a class = "social-link" style = "color: #484848" href="https://www.instagram.com/SparcTheWorld/" target="_blank"><i class="fab fa-instagram fa-lg"/></a>
              <a class = "social-link" style = "color: #484848" href="https://linkedin.com/company/SparcTheWorld" target="_blank"><i class="fab fa-linkedin fa-lg"/></a>
              <a class = "social-link" style = "color: #484848" href="https://twitter.com/SparcTheWorld/" target="_blank"><i class="fab fa-twitter fa-lg"/></a>
              <a class = "social-link" style = "color: #484848" href="https://www.youtube.com/channel/UCJldpwGu1lritWkFXbQBGMg" target="_blank"><i class="fab fa-youtube fa-lg"/></a>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, Button, FormGroupInput, Alert } from '@/components';
import {BButton }from 'bootstrap-vue'
import MainFooter from '@/layout/MainFooter';
import { DatePicker } from 'element-ui';
import Multiselect from 'vue-multiselect'
import { mapGetters, mapActions } from 'vuex';
import { setTimeout } from 'timers';
import HorizontalStepper from 'vue-stepper';
import axios from 'axios';
import Lottie from 'vue-lottie'
import checkAnimationData from '../../lotties/782-check-mark-success.json'

import WelcomeStep from './components/registration/WelcomeStep'

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
    [FormGroupInput.name]: FormGroupInput,
    HorizontalStepper,
    'lottie': Lottie,
    'el-date-picker': DatePicker,

  },
  computed: { ...mapGetters(['status', 'error', 'user'])},
  data() {
      return {
        checkOptions: { animationData: checkAnimationData, loop: false, autoplay: false },
        stage: 0,
        success: false,
        firstName: '',
        lastName: '',
        age: null,
        email: '',
        job_occupation: '',
        institute: '',
        about: '',
        password: '',
        confirmPassword: '',
        allTags: [],
        value: [],
        interestId: [],
        image: {
          profile_image: null
        },
        video: {
          profile_video: null
        },
        facebook: '',
        instagram:'',
        linkedin: '',
        twitter: '',
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
      ...mapActions(['fetchTags', 'createUser', 'updateImage', 'updateVideo']),
      handleAnimation: function(anim) {
        if(this.stage === 4) {
          this.anim = anim;
          this.anim.play();
        }
      },
      goToLogin() {
        this.$router.push('/login')
      },
      decrementStage() {
        this.stage--;
      },
      onPickVideo() {
        this.$refs.VideoInput.value=null;
        this.$refs.VideoInput.click();
      },
      onVideoSelected(event) {
          this.video.profile_video = event.target.files[0];
          console.log(this.video.profile_video);
      },
      onPickImage() {
        this.$refs.ImageInput.value = null
        this.$refs.ImageInput.click();
      },
      onImageSelected(event) {
        this.image.profile_image = event.target.files[0];
      },
      goToLogin() {
        this.$router.push('/login')
      },

      removeImage() {
        this.image.profile_image = null
      },

      removeVideo() {
        this.video.profile_video  = null;
      },
      
      async incrementStage() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.stage == 1) {
          this.warning = false;
          if (!re.test(this.email.toLowerCase())) {
            this.warning = true;
            this.message = "Please enter a valid email"
            return;
          }
          try {
            await axios.post("https://us-central1-sparc-9d9cb.cloudfunctions.net/checkUser", {email: this.email});
          } catch (err) {
            this.warning = true;
            this.message = "User already exists with this email";
            return;
          }
        }
        if (this.stage == 3) {
          this.registerUser();
        }
        this.warning = false;
        this.stage++;
      },
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
      async registerUser() {
          const newDate = this.age.toLocaleDateString()
          this.userData.age = newDate;
          if(this.value != null) {
            this.value.forEach(item => {
              this.interestId.push(item.id)
            })
            this.userData.interests = this.interestId
        
          }
          this.userData.first_name = this.firstName;
          this.userData.last_name = this.lastName;
          this.userData.email = this.email;
          this.userData.password = this.password;
          this.userData.job_occupation = this.job_occupation;
          this.userData.institute = this.institute;
          this.userData.about = this.about;
          this.userData.facebook = this.facebook.substring(this.facebook.indexOf("facebook"));
          this.userData.instagram = this.instagram.substring(this.instagram.indexOf("instagram"));
          this.userData.twitter = this.twitter.substring(this.twitter.indexOf("twitter"));
          this.userData.linkedin = this.linkedin.substring(this.linkedin.indexOf("linkedin"));
          console.log(this.image);
          console.log(this.video);
          await this.createUser(this.userData);
          if (this.image != null) {
            await this.updateImage(this.image);
          }
          if (this.video != null) {
            await this.updateVideo(this.video);
          }
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
  async created() {
    this.allTags = await this.getTags();
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
  .top {
    margin-top: 0rem;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
  }
  .divider-line {
    border-bottom: 1px solid #e2e2e2;
      height: 2px;
      position: absolute;
  }
  
  .icon-wrapper { 
    display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      width: 95%;
      left: 0;
      padding: 2% 4%;
  }
  .icon-wrapper .step {
     position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
  }
  
  .icon-wrapper .step .circle {
    margin-bottom: 1rem;
          padding: 0 1rem;
          background-color: white;
  }
  .icon-wrapper .step .circle .active{
    background-color: #32d477;
            color: white;
            border-radius: 50%;
            padding: 1rem
  }
  .icon-wrapper .step .circle .inactive{
    background-color: #e2e2e2;
            color: #8f8f8f;
            border-radius: 50%;
            padding: 1rem
  }

  .previous-button {
    background: dimgray;
    border-radius: 3px;
    color: white;
    border: none;
    height: 3rem;
    width: 7rem;
    margin-right: 10px;
    font-weight: 500;
    margin-top: 1rem
  }

  .next-button-disabled {
    background: #89e3a7;
    border-radius: 3px;
    color: white;
    border: none;
    height: 3rem;
    width: 7rem;
    font-weight: 500;
    margin-top: 1rem;
  }
  
  .next-button {
    background: #32d477;
    border-radius: 3px;
    color: white;
    border: none;
    height: 3rem;
    width: 7rem;
    font-weight: 500;
    margin-top: 1rem;
  }

  .about-text::placeholder {
    margin-left: 20px;
  }

  .update-button {
    margin-right: 10px;
    background: #f4f4f4;
    border: 1px solid lightgray;
    border-radius: 3px;
  }

  .go-to-login {
    background: #f4f4f4; color: #5f6368; font-weight: 500; font-size: 15px; border-radius: 7px
  }

  .stage-before {
    height: 140vh;
  }
  
  .stage-4{
    height: 100vh;
  }

  .slide-enter-active {
  transition: all 0.5s ease;
}

.slide-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(30px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
</style>