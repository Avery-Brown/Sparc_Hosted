<template>
  <div>
    <div class="container-fluid ">
      <div class="row ml-1 mr-1" style="border:1px solid #dcdcdc">
        <div class="col-md-3 pl-0" >
          <div class="inbox_people">
            <div class="headind_srch">
              <div class="recent_heading">
                <h4>Recent</h4>
              </div>
              <div class="srch_bar">
                <div class="stylish-input-group">
                  <input type="text" class="search-bar"  placeholder="Search"  v-model="search" v-on:keydown="filter_name">
                  <span class="input-group-addon">
                  <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                  </span> </div>
              </div>
            </div>
            <div class="inbox_chat">
              <div  class="chat_list active_chat " @click="fillProfile(users)" v-for="(users,i) in filters"  v-if="users.id!=lc_loggeduser.id" v-bind:key="i">
                <div class="chat_people" >
                  <div class="chat_img"> <img class="rounded-circle" style="height:2rem;" :src="users.profile_image!=null ? users.profile_image: 'https://ptetutorials.com/images/user-profile.png'" alt="Anika"> </div>
                  <div class="chat_ib">
                    <h5>{{users.first_name}} <span class="chat_date">{{chatdate(users.id).date}}</span></h5>
                      <p>{{chatdate(users.id).message}}</p>
                  </div>
                </div> 
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6" >
          <div v-if="selected_messages.length>0" id="msg_containers" class="msg_history">
              <div  v-for="(items,i) in selected_messages" :key="i">
                <div v-if="items.sender_id!=lc_loggeduser.id" class="incoming_msg mt-2">
                <div class="received_msg">
                  <div class="received_withd_msg">
                    <p>{{items.message}}</p>
                    <sub v-if="items.type!=null"> <a v-if="items.type!=null" target="_blank" :href="items.file_url">View Here</a> </sub>
                    <span class="time_date"> {{items.date}}</span></div>
                </div>
              </div>
              <div v-else class="outgoing_msg">
                <div class="sent_msg mr-1">
                  <p>{{items.message}}</p>
                    <sub v-if="items.type!=null"> <a v-if="items.type!=null" target="_blank" :href="items.file_url">View Here</a> </sub>
                  <span class="time_date"> {{items.date}}</span> </div>
              </div>
              </div>
            </div>
            <div v-else class="msg_history">
                <p>No Messages with this user</p>
            </div>
            <div class="type_msg">
              <div class="input_msg_write">
                <input type="text" class="write_msg ml-1 mr-1" style="border:none !important;" @keyup.enter="sendMessage()" v-model="message" placeholder="Type a message" />
                <button class="msg_send_btn"  @click="sendMessage()" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                <button class="file_send_btn"  @click="onPickFile()"  type="button"><i class="fa fa-paperclip" aria-hidden="true"></i></button>
                <input type="file" style="display:none;" @change="onFilePicked" ref="FileInput" accept="images/*" >
                  <span @click="rawfile=null" class="fa fa-trash  btn btn-primary" v-if="rawfile!=null"> {{rawfile[0].name}}</span> 
              </div>
            </div>
        </div>
        <div class="col-md-3" style="border-left:1px solid #dcdcdc" >
           <b-card    
            tag="article"
            style="-webkit-box-shadow:none;"
            class="mb-2">
            <template v:slot="header">
              <h4 class="text-center"> <b> About </b></h4>
            </template>
            <b-card-body>
              <div class="photo-container text-center" >
                
                <img class="pic"  :src="selected_user.profile_image!=null ? selected_user.profile_image :'https://ptetutorials.com/images/user-profile.png'" alt="" />
              </div>
              <div class="row">
                <div class="col-md-12">
                  <h6 class="users text-center">{{selected_user.first_name}}</h6>
                </div>
                <div class="col-md-12">
                  <h6 class="users text-muted text-center" style="margin-top:-15px;">{{selected_user.job_occupation}}</h6>
                </div>


              </div>
              <div class="row text-center">
                <div class="col-md-6">
                  <span>D.O.B</span>
                </div>
                <div class="col-md-6">
                  <span ><strong>{{selected_user.age}}</strong></span>
                </div>
              </div>
              <!-- <div class="row text-center mt-4">
                <div class="col-md-6">
                  <span style="font-size">Email</span>
                </div>
                <div class="col-md-6">
                  <span ><strong>{{selected_user.email}}</strong></span>
                </div>
              </div> -->
              <div class="row text-center mt-4">
                <div class="col-md-6 pl-0 pr-0">
                  <span>Institution</span>
                </div>
                <div class="col-md-6 pr-0 pl-0">
                  <span ><strong>{{selected_user.institute}}</strong></span>
                </div>
              </div>
              <div class="row text-center mt-4">
                <div class="col-md-6">
                  <span>Block User</span>
                </div>
                <div class="col-md-6">
                  <b-form-checkbox v-model="checked" @change="blocking()" name="check-button" switch>
                  </b-form-checkbox>
                </div>
              </div>
              <div class="row text-center mt-4">
                <div class="col-md-6 pr-0 pl-0">
                  <span>All Conversations</span>
                </div>
                <div class="col-md-6">
                  <b-form-checkbox @change="toggleEmailNotifs()" v-model="notif_toggle"  name="check-button" switch>
                  </b-form-checkbox>
                </div>
              </div>

            </b-card-body>
            
          </b-card>

        </div>
      </div>
    </div>
  </div>
        <!-- <div class="col-md-8">
          <div class="container">
              <div class="messaging">
                    <div   :class="['inbox_msg' ,getClass]">
                      <div class="inbox_people">
                        <div class="headind_srch">
                          <div class="recent_heading">
                            <h4>Recent</h4>
                          </div>
                          <div class="srch_bar">
                            <div class="stylish-input-group">
                              <input type="text" class="search-bar"  placeholder="Search"  v-model="search" v-on:keydown="filter_name">
                              <span class="input-group-addon">
                              <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                              </span> </div>
                          </div>
                        </div>
                        <div class="inbox_chat">
                          <div  class="chat_list active_chat " @click="fillProfile(users)" v-for="(users,i) in filters"  v-if="users.id!=lc_loggeduser.id" v-bind:key="i">
                            <div class="chat_people" >
                              <div class="chat_img"> <img class="rounded-circle" style="height:2rem;" :src="users.profile_image!=null ? users.profile_image: 'https://ptetutorials.com/images/user-profile.png'" alt="Anika"> </div>
                              <div class="chat_ib">
                                <h5>{{users.first_name}} <span class="chat_date">{{chatdate(users.id).date}}</span></h5>
                                 <p>{{chatdate(users.id).message}}</p>
                              </div>
                            </div> 
                          </div>
                        </div>
                      </div>
                      <div class="mesgs">
                        <div v-if="selected_messages.length>0" id="msg_containers" class="msg_history">
                          <div  v-for="(items,i) in selected_messages" :key="i">
                            <div v-if="items.sender_id!=lc_loggeduser.id" class="incoming_msg mt-2">
                            <div class="received_msg">
                              <div class="received_withd_msg">
                                <p>{{items.message}}</p>
                                <sub v-if="items.type!=null"> <a v-if="items.type!=null" target="_blank" :href="items.file_url">View Here</a> </sub>
                                <span class="time_date"> {{items.date}}</span></div>
                            </div>
                          </div>
                          <div v-else class="outgoing_msg">
                            <div class="sent_msg mr-1">
                              <p>{{items.message}}</p>
                                <sub v-if="items.type!=null"> <a v-if="items.type!=null" target="_blank" :href="items.file_url">View Here</a> </sub>
                              <span class="time_date"> {{items.date}}</span> </div>
                          </div>
                          </div>
                        </div>
                        <div v-else class="msg_history">
                            <p>No Messages with this user</p>
                        </div>
                        <div class="type_msg">
                          <div class="input_msg_write">
                            <input type="text" class="write_msg ml-1 mr-1" style="border:none !important;" @keyup.enter="sendMessage()" v-model="message" placeholder="Type a message" />
                            <button class="msg_send_btn"  @click="sendMessage()" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                            <button class="file_send_btn"  @click="onPickFile()"  type="button"><i class="fa fa-paperclip" aria-hidden="true"></i></button>
                            <input type="file" style="display:none;" @change="onFilePicked" ref="FileInput" accept="images/*" >
                             <span @click="rawfile=null" class="fa fa-trash  btn btn-primary" v-if="rawfile!=null"> {{rawfile[0].name}}</span> 
                          </div>
                        </div>
                      </div>
                    </div> 
              </div>
            </div>
        </div> -->
        <!-- <div class="col-md-4">
           <b-card    
            tag="article"
            style="max-width: 30rem;-webkit-box-shadow:none;border:1px solid #dcdcdc"
            class="mb-2">
            <template v:slot="header">
              <h4 class="text-center"> <b> About </b></h4>
            </template>
            <b-card-body>
              <div class="photo-container text-center" >
                
                <img class="pic"  :src="selected_user.profile_image!=null ? selected_user.profile_image :'https://ptetutorials.com/images/user-profile.png'" alt="" />
              </div>
              <div class="row">
                <div class="col-md-12">
                  <h6 class="users text-center">{{selected_user.first_name}}</h6>
                </div>
                <div class="col-md-12">
                  <h6 class="users text-muted text-center" style="margin-top:-15px;">{{selected_user.job_occupation}}</h6>
                </div>


              </div>
              <div class="row text-center">
                <div class="col-md-3">
                  <span>D.O.B</span>
                </div>
                <div class="col-md-9">
                  <span ><strong>{{selected_user.age}}</strong></span>
                </div>
              </div>
              <div class="row text-center mt-4">
                <div class="col-md-3">
                  <span>Email</span>
                </div>
                <div class="col-md-9">
                  <span ><strong>{{selected_user.email}}</strong></span>
                </div>
              </div>
              <div class="row text-center mt-4">
                <div class="col-md-4">
                  <span>Institution</span>
                </div>
                <div class="col-md-8">
                  <span ><strong>{{selected_user.institute}}</strong></span>
                </div>
              </div>
              <div class="row text-center mt-4">
                <div class="col-md-4">
                  <span>Block User</span>
                </div>
                <div class="col-md-8">
                  <b-form-checkbox v-model="checked" @change="blocking()" name="check-button" switch>
                  </b-form-checkbox>
                </div>
              </div>
              <div class="row text-center mt-4">
                <div class="col-md-5">
                  <span>All Conversations</span>
                </div>
                <div class="col-md-6">
                  <b-form-checkbox @change="toggleEmailNotifs()" v-model="notif_toggle"  name="check-button" switch>
                  </b-form-checkbox>
                </div>
              </div>

            </b-card-body>
            
          </b-card>
        </div> -->
      <!-- </div>
    </div>

    
  </div> -->
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import nativeToast from 'native-toast'
import moment from  'moment'
import { EHOSTUNREACH } from 'constants';
import axios from 'axios'

export default {
  name: 'profile',
  bodyClass: 'profile-page',
  components: {
  },
  data(){
    return{
      rawfile:null,
      notif_toggle:false,
      search:'',
      checked:false,
      selected_user:{},
      lc_loggeduser:'',
      message:'',
      filters:[]
    }
  },
  watch:{
    loggedUser(){
        if(this.loggedUser!=null){
          this.lc_loggeduser= this.loggedUser
          console.log(this.loggedUser)
        }
    },
    allUsers(){
      if(Object.keys(this.selected_user).length>0){
      this.selected_user=this.selected_user;
      }else{
        this.selected_user=this.allUsers[0];
      }
    this.checked=this.get_receiver_blocked_status.check
    // this.scroller()

    }
  },
  methods:{
    onPickFile() { 
      this.$refs.FileInput.click();
    },
    onFilePicked(event)
     { 

      //  this.image=[]
       const files=event.target.files; 
       if(files[0].size<1000000){

       this.rawfile=files
       }
       else{
          nativeToast({
          message: 'File size should be less then 1MB',
          position: 'north-east',
          timeout: 3000,
          type: 'error'
        })       
        }
     },
    toggleEmailNotifs(){
      this.lc_loggeduser={...this.lc_loggeduser,email_notifications:!this.notif_toggle}
      localStorage.setItem("loggedUser", JSON.stringify(this.lc_loggeduser));
      this.toggleEmailNotifications({flag:!this.notif_toggle,loggeduser_id:this.lc_loggeduser.id})

    },
    sendEmail(date) {

      axios.post('https://us-central1-sparc-9d9cb.cloudfunctions.net/sendMessageNotification', {
        sender_name:this.selected_user.first_name,
        message: this.message,
        time:date,
        dest:this.selected_user.email
      }).then(() => {
        console.log('Email Sent')
      }).catch(err => console.log("Error " + err))
    },
    chatdate(id){
      let arrs= this.getMessages.filter(messages_item=>(messages_item.sender_id==this.lc_loggeduser.id && messages_item.receiver_id==id) || (messages_item.receiver_id==this.lc_loggeduser.id && messages_item.sender_id==id)) 
      if(arrs.length>0){
        let dt=arrs[arrs.length-1].date.split('|')
        return {date:dt[1],message:arrs[arrs.length-1].message}
      }
      else{
      return {date:'NA',message:'No messages yet'}
      }
    },
    ...mapActions(['sendMessages','blockingProcess','toggleEmailNotifications']),
    filter_name() {
      let arrs=this.allUsers.filter(user_item=>user_item.first_name.toLowerCase().includes(this.search.toLowerCase()))
            if(arrs.length>0){
            this.filters=arrs

            }
            else{
                this.filters=[]
            }
      },
    fillProfile(arg_user) {
      this.selected_user=arg_user;
      if(this.selected_user.blocked_by!=null){
        if(Object.keys(this.selected_user.blocked_by).length>0){
        this.checked=this.get_receiver_blocked_status.check;
        }
        else{
        this.checked=false;
        }
      }
      else{
        this.checked=false;

      }
      this.scroller()
    },
    blocking(){
      const remove_blocker_index = this.allUsers.findIndex(user_item => user_item.id == this.selected_user.id);
      if(!this.checked==false){
      //removing blocked ids from the state
      this.$store.commit('removeBlocker',{key:this.get_receiver_blocked_status.key,index:remove_blocker_index})
      //removing block ids from currently selectd user
      delete this.selected_user.blocked_by[this.get_receiver_blocked_status.key]
      }
      this.blockingProcess({receiver_id:this.selected_user.id,sender_id:this.lc_loggeduser.id,flag:!this.checked})
    },
    sendMessage(){
      console.log(this.blocked_users)
      if(this.get_my_block_status==true){
        nativeToast({
          message: 'You are not allowed to send message to this user',
          position: 'north-east',
          timeout: 3000,
          type: 'error'
        })
      }
      else if(this.message!=''){
      let date=moment().format('LT')+" | "+moment().format('D MMM') ;
      if(this.notif_toggle==true){
        console.log("mail was sent")
          this.sendEmail(date)
      }
      else{
        console.log("no didnt run")
      }
      let msg_obj={date:date,
      message:this.message,
      receiver_id:this.selected_user.id,
      rawfile:this.rawfile!=null? this.rawfile[0]:null,
      sender_id:this.lc_loggeduser.id}
      this.sendMessages(msg_obj)
      this.message=''
      this.rawfile=null
      this.scroller()
      }
      else{
        nativeToast({
          message: 'Please fill message field',
          position: 'north-east',
          timeout: 3000,
          type: 'error'
        })
      }
      
    },
    scroller(){
      var container = this.$el.querySelector("#msg_containers"); 
      this.typed_message=''
      this.$nextTick(() => {
          container.scrollTop = container.scrollHeight;        
        });
    }
  },
  computed:{
    ...mapGetters(['allUsers','getMessages','user','loggedUser']),
    selected_messages() {
     return this.getMessages.filter(messages_item=>(messages_item.sender_id==this.lc_loggeduser.id && messages_item.receiver_id==this.selected_user.id) || (messages_item.receiver_id==this.lc_loggeduser.id && messages_item.sender_id==this.selected_user.id)) 
    },
    //Ppl who have blocked me
    blocked_users(){
      if(this.lc_loggeduser.blocked_by!=null){
        return Object.keys(this.lc_loggeduser.blocked_by).map(blocked_key=> {
            return {id:this.lc_loggeduser.blocked_by[blocked_key].blocker_id}
        })
      }
      else{
       return []
      }
      
    },
    get_my_block_status(){
      let block_user_find=this.blocked_users.find(blocked_user=>blocked_user.id==this.selected_user.id)
      if(block_user_find!=null){
        return true
      }
      else{
        return false
      }
    },
    //Ppl i have blocked
    receiver_blocked_users(){
        return Object.keys(this.selected_user.blocked_by).map(blocked_key=> {
            return {id:this.selected_user.blocked_by[blocked_key].blocker_id,
            key:blocked_key}
        })
      
    },
    get_receiver_blocked_status(){
      let block_user_find=this.receiver_blocked_users.find(blocked_user=>blocked_user.id==this.lc_loggeduser.id)
      if(block_user_find!=null){
        return {...block_user_find,check:true}
      }
      else{
        return {...block_user_find,check:false}
      }
    },
    getClass(){
      return this.rawfile!=null ? 'padded-heights':'normal-heights'
    }

  },
  created(){
    this.lc_loggeduser=JSON.parse(localStorage.getItem('loggedUser'));
    this.filters=this.allUsers
    if(this.lc_loggeduser.email_notifications==null || this.lc_loggeduser.email_notifications==false){
      this.notif_toggle=false
    }
    else{
      this.notif_toggle=true  
    }
  },
  mounted(){
    if(this.allUsers.length>0){
      this.selected_user=this.allUsers[0];
    }
  }
};
</script>
<style scoped>
.normal-heights{
height:500px;
}
.padded-heights{
height:531px;
}
input:focus { 
  /* border: none !important; */
  outline: none !important;
    border:1px solid red;
    box-shadow:none;
}
.users{
 
    display: block;
    font-weight: 700;
    color: #0e0e0f;
    padding: 10px 0 7px;

}
         .container{max-width:1170px; margin:auto;}
img{ max-width:100%;}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 100%; border-right:1px solid #dcdcdc;
}
.inbox_msg {
  border: 1px solid #dcdcdc;
  clear: both;
  overflow: hidden;
}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%; 
  /* padding:1 mission*/
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #dcdcdc;}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 10%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #dcdcdc;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 480px; overflow-y: scroll;}

.active_chat{ background:#ebebeb;}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 57%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 10px;
  width: 60%;
}

 .sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {border-top: 1px solid #dcdcdc;position: relative;}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.file_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  right:36px;
  width: 33px;
}
.messaging { padding: 0 0 50px 0;}
.msg_history {
  height: 450px;
  overflow-y: auto;
}

/* width */	
::-webkit-scrollbar {	
  width: 10px;	
}	
 /* Track */	
::-webkit-scrollbar-track {	
  background: #f1f1f1; 	
}	
 	
/* Handle */	
::-webkit-scrollbar-thumb {	
  background: #888; 	
}	
 /* Handle on hover */	
::-webkit-scrollbar-thumb:hover {	
  background: #555; 	
}
</style>
