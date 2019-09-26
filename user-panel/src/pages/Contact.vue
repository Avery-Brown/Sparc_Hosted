<template>
    <div>
        <div class = "main">
            <div class = "row">
                <div class = "container">
                    <div class="col-md-6 ml-auto mr-auto"> 
                        <Card class="contact-card"> 
                            <h3 class="text-center text-info"><b>Send Us a Message</b></h3>
                            <fg-input class="no-border input-lg" addon-left-icon="now-ui-icons emoticons_satisfied" placeholder="Name" v-model="userPayload.name" type="name"></fg-input>
                            <fg-input class="no-border input-lg" addon-left-icon="now-ui-icons ui-1_email-85" placeholder="Email" v-model="userPayload.email" type="email"></fg-input>
                            <b-form-textarea class="message-box input-lg" placeholder="Message" v-model="userPayload.message" type="message"></b-form-textarea>
                            <div class="card-footer text-center">
                            <a
                             @click="validateFields"
                            class="btn btn-info text-white btn-round btn-lg btn-block"
                            >Send</a>
                            </div> 
                        </Card> 
                    </div>
                </div>
            </div>
            <div class = "row"> 
                <div class = "col">
                    <b-alert variant="danger" v-model="warning" dismissible>
                        <div class="alert-icon">
                        <i class="now-ui-icons objects_support-17"></i>
                        </div>
                        <strong>Something went wrong!</strong> {{ message }}
                    </b-alert>
                </div>
            </div>
            <div class = "row"> 
                <div class = "col">
                    <b-alert variant="success" v-model="success" dismissible>
                        <div class="alert-icon">
                        <i class="now-ui-icons objects_support-17"></i>
                        </div>
                        <strong>Thank you for contacting us!</strong>
                    </b-alert>
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
        },
        warning: false,
        success: false,
        message: '',
      }
  },

  methods: {

      validateFields() {
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
          axios.post('https://us-central1-sparc-9d9cb.cloudfunctions.net/sendContact', {
              name: this.userPayload.name,
              dest: this.userPayload.email,
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
