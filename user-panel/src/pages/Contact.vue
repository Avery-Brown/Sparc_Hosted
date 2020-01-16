<!--
<template>
  <div id="app">
    <froala id="edit" :tag="'textarea'" :config="config" v-model="model"></froala>
  </div>
</template>

<script>
import VueFroala from 'vue-froala-wysiwyg';

export default {
  name: 'app',
  data () {
    return {
      config: {
        events: {
          initialized: function () {
            console.log('initialized')
          }
        }
      },
      model: 'Edit Your Content Here!'
    }
  }
}
</script> -->
<!--This code was developed in part by Lizzet Clifton, Eric Lin, Jordan Shapiro, and Katelyn Chang for Duke CS408-->
<template>
    <div>
        <div class = "main">
            <div class = "row">
                <div class = "container">
                    <div class="col-md-9 ml-auto mr-auto">


                        <Card class="contact-card">
                            <b-alert variant="danger" v-model="warning" dismissible style="margin-bottom: -0.5rem">
                                    <div class="alert-icon">
                                    <i class="now-ui-icons objects_support-17"></i>
                                    </div>
                                    <strong>Something went wrong!</strong> {{ message }}
                                </b-alert>


                                <b-alert variant="success" v-model="success" dismissible style="margin-bottom: -0.5rem">
                                    <div class="alert-icon">
                                    <i class="now-ui-icons objects_support-17"></i>
                                    </div>
                                    <strong>Thank you for contacting us!</strong>
                                </b-alert>
                            <div class="card-body">
                            <p style= "color: #484848; font-weight: 400; font-size: 30px; margin-bottom: 0px;">Contact Us</p>
                            <div style="display: flex; justify-content: row;">
                              <div style="color: #484848; font-weight: 400; font-size: 15px">
                                Text or Call
                              </div>
                              <div style="color: rgb(85, 170, 233); font-weight: 400; text-decoration: underline; font-size: 15px; margin-left: 5px;">
                                +1 (646) 397-8006
                              </div>
                            </div>
                            <p style= "color: #484848; font-weight: 400; font-size: 15px">Have a question or just want to chat? Get in contact below</p>
                            <fg-input id="login_input" style="border-color: black;" class="input-lg" addon-left-icon="now-ui-icons emoticons_satisfied" placeholder="Name" v-model="userPayload.name" type="name"></fg-input>
                            <fg-input id="login_input" class="input-lg" addon-left-icon="now-ui-icons ui-1_email-85" placeholder="Email" v-model="userPayload.email" type="email"></fg-input>
                            <b-form-textarea style="height: 500px;" placeholder="Message" v-model="userPayload.message" type="message"></b-form-textarea>

                            <!-- <div id="app">
                              <froala id="edit" :tag="'textarea'" :config="config" v-model="model"></froala>
                            </div> -->

                            <!-- <div id="app">
                              <froala id="edit" placeholder="Message" :tag="'textarea'" v-model="userPayload.message" type="message"></froala>
                            </div> -->

                            <div class="card-footer text-center">

                            <a
                             @click="validateFields"
                            class="btn btn-info text-white btn-lg btn-block" style= " width: 140px; background-color: #34b14f; font-weight: 500;"
                            >Send</a>
                            </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { Card, Button, Alert, FormGroupInput } from '@/components'
export default {
    name: 'contact-page',
    bodyClass: 'contact-page',
    components: {
        Card,
        Alert,
        [Button.name]: Button,
        [FormGroupInput.name]: FormGroupInput
  },

  data() {
      return {
        userPayload: {
            name: "",
            email: "",
            message: "",
            //phone: "",
        },
        warning: false,
        success: false,
        message: '',
      }
  },

  methods: {

      validateFields() {
          this.warning = false;
          this.success = false;
          if(this.userPayload.name == "" || this.userPayload.email == ""|| this.userPayload.message == "") {
              this.message = "Please Fill Required Fields";
              this.warning = true;
          } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(this.userPayload.email))) {
              this.message = "Please enter a valid email address";
              this.warning = true;
          }
          else {
              this.sendMessage();
          }
      },

      sendMessage() {
          this.success = true;
          this.userPayload.name = ""
            this.userPayload.email = ""
            this.userPayload.message = ""
          console.log(this.userPayload.name);
          console.log(this.userPayload.email);
          console.log(this.userPayload.message);
          axios.post('https://us-central1-sparc-9d9cb.cloudfunctions.net/sendContact', {
              name: this.userPayload.name,
              dest: this.userPayload.email,
              //text: this.userPayload.phone,
              message: this.userPayload.message,
          }).then(() => {
              console.log("Contact Transaction Success");
              this.saveMessage();
          }).catch((err) => {
              console.log(err);
          })
      },

      saveMessage() {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        const payload = {
            ...this.userPayload,
            dateTime
        }
        firebase.database().ref('messages').push(payload).then(event => {
          }).catch((err) => {
              console.log(err);
          });
      }
  }

}
</script>
<style scoped>
    .contact-card {
        margin-top: 100px;
    }

    .message-box {
        height: 100px;
        background-color: whitesmoke;
        border-radius: 25px;
        text-indent: 20px;
    }

</style>
