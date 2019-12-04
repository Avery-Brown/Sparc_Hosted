<template>
  <div>
    <div class="test">
      <div class="container">
        <div class = "card" style="margin-top: 3rem;">
          <div class = "card-body">
            <div class = "row" style = "margin-top: 40px; margin-bottom: 40px; margin-left: 5rem; margin-right: 5rem">
          <div class = "col-md-6">
            <div class = "row">
              <div class="col-md-4">
                <div class="photo-container text-center"  @click="onPickFile()">
                  <i class="icon fa fa-pencil"></i>
                  <input type="file" @change="onFilePicked" style="display:none;" ref="FileInput">
                  <img class="pic" v-if="profileImage!= null" :src="profileImage" alt="" />
                  <input type="file" style="display:none">
                </div>
                <div class = "row" style= "justify-content: center">
                <n-button type="info" style="background: #f4f4f4; color: #5f6368; font-weight: 600; font-size: 12px; border-radius: 7px; margin-top: 30px; float: left; box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);" @click.native="modals.classic = true">
                Edit Profile
                </n-button>
              </div>
              </div>
              <div class = "col-md-8">
                <p class="text-left" style= "margin-top: 30px; font-weight: 500; color: #484848; font-size: 20px; ">{{userData.first_name + " " + userData.last_name}}</p>
                <p style= "color: #484848; font-weight: 400;">Interests</p>
                <div class="row" style = "margin-left: 1px">
                  <span class="badge badge-pill badge-success" style="font-size: 9px; margin: 1px; background-color: #e0e0e0; border: none; color: #505050; border-radius: 3px;" v-for="(tag,index) in fetchedTags" :key="index">{{tag}}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class = "col-md-6">
            <div class = "row" style= "margin-right: 60px">
              <div class = "col-md-12">
                <div class = "row" style = "margin-left: 60px">
                  <p style="font-size: 25px; font-weight: 500"> Quick Facts</p>
                </div>
                <div class = "row" style = "margin-left: 60px">
                  <p style="font-weight: 400"><b style= "color: #484848; font-weight:600;">Birthday :</b> {{ userData.age }} Years</p>
                </div>
                <div class = "row" style = "margin-left: 60px">
                  <p style="font-weight: 400"><b style= "color: #484848; font-weight: 600;">Occupation :</b> {{ userData.job_occupation }}</p>
                </div>
                <div class = "row" style = "margin-left: 60px">
                  <p style="font-weight: 400"><b style= "color: #484848; font-weight: 600;">Institute :</b> {{ userData.institute }}</p>
                </div>
                <div class = "row" style = "margin-left: 60px">
                  <p style="font-weight: 400"><b style= "color: #484848; font-weight: 600;">Email :</b> {{ userData.email }}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class = "row" style= "margin-top: 40px; margin-left: 5rem; margin-right: 5rem;">
              <div class="col-md-4">
                <p style="font-size: 25px; font-weight: 600;">About</p>
              </div>
              <div class= "col-md-12">
                <div class = "row" style= "margin-left: 1px">
                  {{userData.about}}
                </div>
              </div>
            </div>
            <div class="row text-left" style= "margin-top: 3rem; margin-left: 5rem; margin-bottom: 3rem;">
                  <div class= "col-md-4">
                     <p style="font-size: 25px; font-weight: 600;">Profile Video</p>
                  </div>
                  <div class= "col-md-12">
                    <video v-if="profileVideo != null" :src="profileVideo" controls height="300" width="650"></video>
                  </div>

                  <div class = "row">
                    <div class = "col">
                    <n-button class="btn-info" style="background: #f4f4f4; color: #5f6368; font-weight: 600; font-size: 12px; border-radius: 7px; box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3); margin-left: 1rem;" @click="onPickVideo()">Update Profile Video</n-button>
                    <input type="file" @change="onVideoSelected" style="display:none;" ref="VideoInput">
                    <span style="clear: both;"></span>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>















    <!-- <div class="page-header clear-filter">

      <div class="container">

        <n-button type="primary" @click.native="modals.classic = true">
            Edit Profile
        </n-button>
        <n-button class="ml-3" v-if="profileVideo != null" type="success" @click.native="modals.videoModal = true">
            View Profile Video
        </n-button>
      </div>
    </div> -->

         <!-- Classic Modal -->
    <modal :show.sync="modals.classic" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">Update Profile</h4>
      <form>
        <div class="row">
          <div class="col-md-6 col-lg-6">
            <div class="form-group">
              <label for="">First Name</label>
              <fg-input id="login_input"
                  class="no-border input-lg"
                  addon-left-icon="now-ui-icons users_single-02"
                  placeholder="First Name"
                  v-model="userData.first_name"
                  type="text">
              </fg-input>
            </div>
          </div>

          <div class="col-md-6 col-lg-6">
            <div class="form-group">
              <label for="">Last Name</label>
              <fg-input id="login_input"
                class="no-border input-lg"
                addon-left-icon="now-ui-icons users_single-02"
                placeholder="Last Name"
                v-model="userData.last_name"
                type="email">
              </fg-input>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 col-lg-6">
            <div class="form-group">
              <label for="">Age</label>
              <fg-input id="login_input"
                  class="no-border input-lg"
                  addon-left-icon="now-ui-icons users_single-02"
                  placeholder="Age"
                  v-model="userData.age"
                  type="number">
              </fg-input>
            </div>
          </div>

          <div class="col-md-6 col-lg-6">
            <div class="form-group">
              <label for="">Email</label>
              <fg-input id="login_input"
                class="no-border input-lg"
                addon-left-icon="now-ui-icons ui-1_email-85"
                placeholder="Email"
                v-model="userData.email"
                disabled
                type="email">
              </fg-input>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-6">
            <div class="form-group">
              <label for="">Occupation</label>
              <fg-input id="login_input"
                class="no-border input-lg"
                addon-left-icon="now-ui-icons business_briefcase-24"
                placeholder="Occupation"
                v-model="userData.job_occupation"
                type="text">
              </fg-input>
            </div>
          </div>

          <div class="col-md-6 col-lg-6">
            <div class="form-group">
              <label for="">School</label>
              <fg-input id="login_input"
                class="no-border input-lg"
                addon-left-icon="now-ui-icons education_hat"
                placeholder="School"
                v-model="userData.institute"
                type="text">
            </fg-input>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 col-lg-12">
            <div class="form-group">
              <label for="">About</label>
              <fg-input id="login_input"
                class="no-border input-lg"
                addon-left-icon="now-ui-icons ui-2_chat-round"
                placeholder="About"
                v-model="userData.about"
                type="text">
              </fg-input>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 col-lg-12">
            <div class="form-group">
              <label for="">Pick Interests</label>
              <multiselect style="font-size: 8px;" v-model="value"
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
            </div>
          </div>
        </div>
         <div class = "row">
            <div class = "col">
              <label>Update Social Media</label>
              <fg-input id="login_input"
                class = "no-border input-lg"
                addon-left-icon="fab fa-facebook"
                placeholder="Facebook"
                v-model="userData.facebook"
                type="text"/>
              <fg-input id="login_input"
                class = "no-border input-lg"
                addon-left-icon="fab fa-instagram"
                placeholder="Instagram"
                v-model="userData.instagram"
                type="text"/>
              <fg-input id="login_input"
                class = "no-border input-lg"
                addon-left-icon="fab fa-twitter"
                placeholder="Twitter"
                v-model="userData.twitter"
                type="text"/>
              <fg-input id="login_input"
                class = "no-border input-lg"
                addon-left-icon="fab fa-linkedin"
                placeholder="Linkedin"
                v-model="userData.linkedin"
                type="text"/>
            </div>
        </div>
      </form>
      <template slot="footer">
        <n-button class = "now-ui-icons ui-1_simple-remove" type="danger" @click.native="modals.classic = false">Close</n-button>

        <n-button type="success" @click="updateProfile">Update Profile</n-button>
      </template>
    </modal>


  </div>
</template>
<script>
import { Tabs, TabPane, Modal, FormGroupInput, Button } from '@/components';
import Multiselect from 'vue-multiselect'
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'profile',
  bodyClass: 'profile-page',
  components: {
    Tabs,
    Modal,
    TabPane,
    Multiselect,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  computed: {
      ...mapGetters(['allTags', 'status', 'error', 'user', 'loggedUser']),

      getInterests() {
        var tags = this.allTags
        this.fetchedTags = []
        this.userData.interests.forEach(item => {
          tags.filter(tag => {
            if(tag.id == item) {
              this.fetchedTags.push(tag.value)
            }
          })
        })
        console.log("Fetched " + this.fetchedTags)
      }
    },
  data() {
    return {
      value: [],
      fetchedTags: [],
      modals: {
        classic: false,
        videoModal: false
      },
      userImage: {
        profile_image: null
      },
      userVideo: {
        profile_video: null
      },
      picture: '',
      profileVideo: null,
      interestId: [],
      userData: {
          first_name: '',
          last_name: '',
          age: '',
          email: '',
          job_occupation: '',
          institute: '',
          about: '',
          interests: [],
          facebook: '',
          instagram: '',
          twitter: '',
          linkedin: '',
      },

    }
  },
  methods: {
    ...mapActions(['fetchTags', 'updateUserProfile', 'updateImage', 'updateVideo']),

    onPickVideo() {
      this.$refs.VideoInput.click();
    },
    onVideoSelected(event) {
          let videoFile = event.target.files[0];
          this.userVideo.profile_video = videoFile
          this.updateVideo(this.userVideo)
      },
    onPickFile() {
       this.$refs.FileInput.click();
    },
    onFilePicked(event) {
      this.picture = event.target.files[0].name;
      this.userImage.profile_image = event.target.files[0]
      this.updateImage(this.userImage);
      console.log(event.target.files[0].name)
    },
    updateProfile() {
      this.userData.facebook = this.userData.facebook.substring(this.userData.facebook.indexOf("facebook"));
      this.userData.instagram = this.userData.instagram.substring(this.userData.instagram.indexOf("instagram"));
      this.userData.twitter = this.userData.twitter.substring(this.userData.twitter.indexOf("twitter"));
      this.userData.linkedin = this.userData.linkedin.substring(this.userData.linkedin.indexOf("linkedin"));
      if(this.value.length > 0) {
            this.value.forEach(item => {
            this.interestId.push(item.id)
          })

          this.userData.interests = this.interestId,

          this.updateUserProfile(this.userData)
          this.modals.classic = false
          this.getInterests
      }
      else {
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.userData.interests = loggedUser.interests
        
        this.updateUserProfile(this.userData)
          this.modals.classic = false
          this.getInterests
      }
    }
  },

  watch: {
    loggedUser (val) {
        //&& val.uid.length > 0
        console.log("auth state watched")

            if (val) {
                setTimeout(() => {
                  if(val.profile_image) {
                    this.profileImage = val.profile_image
                  }
                  if(val.profile_video) {
                    this.profileVideo = val.profile_video
                  }
                  console.log('VAL',val)
                  console.log(val.profile_image)
                }, 500)
            }
            else{
              //this.success = false
              console.log('Something wrong')
            }
        },
  },

  created() {

    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if(loggedUser != null) {
      this.userData.first_name = loggedUser.first_name
      this.userData.last_name = loggedUser.last_name
      this.userData.age = loggedUser.age
      this.userData.about = loggedUser.about
      this.userData.email = loggedUser.email
      this.userData.interests = loggedUser.interests
      this.userData.job_occupation = loggedUser.job_occupation
      this.userData.institute = loggedUser.institute
      this.userData.facebook = loggedUser.facebook
      this.userData.instagram = loggedUser.instagram
      this.userData.twitter = loggedUser.twitter
      this.userData.linkedin = loggedUser.linkedin
      if(loggedUser.profile_image) {
        this.profileImage = loggedUser.profile_image
      }
      if(loggedUser.profile_video) {
        this.profileVideo = loggedUser.profile_video
      }
    }
    this.fetchTags();

    if(this.allTags != null) {
        console.log(this.allTags)
        this.getInterests
      }
  }
};
</script>
<style scoped>
  .user-info {
    padding: 20px;
    border: 2px solid #e5e5e5;
  }
  #about {
    max-width: 160px !important;
  }
  .pic:hover {
    cursor: pointer;
  }
  .icon {
    position: absolute;
    padding: 10px;
    background: #34b14f;
    border-radius: 50%;
    color: #fff;
    left: 58%;
    top:30%;
  }

</style>
