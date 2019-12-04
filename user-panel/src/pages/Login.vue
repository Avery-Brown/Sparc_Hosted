<template>
  <div>
    <div class="main" style="background: whitesmoke; height: 100vh">
      <div class="row">
        <div class="container">
          <div class="col-md-9 ml-auto mr-auto">
            <div class="alert alert-danger" dismissible v-if="!success">Invalid Email or Password</div>
            <div class="alert alert-warning" dismissible v-if="!userVerified">Please Verifiy your Email address to continue</div>
              <Card class="login-card" style="margin-top: 7rem; padding-top: 30px; padding-bottom: 30px;" >
                <div class = "row mt-auto mb-auto">
                  <div class = "col-md-5 text-center mt-auto mb-auto" >
                    <img src="sparcS.png" width="125"  style="margin-top: 10px; margin-bottom: 12px;"  alt="">
                    <p class="text-center" style="font-weight: 500; color: #484848">A People-Centric Marketplace</p>
                  </div>
                  <div class = "col-md-7">
                        <p class="text-left" style="color: #484848; font-size: 23px; font-weight: 400;">Log in</p>
                        <form action="" @submit="loginUser">
                        <fg-input id="login_input" class="no-border input-lg" addon-left-icon="now-ui-icons ui-1_email-85" placeholder="Email" v-model="userPayload.email" type="email"></fg-input>
                        <fg-input id="login_input" class="no-border input-lg" addon-left-icon="now-ui-icons ui-1_lock-circle-open" placeholder="Password" v-model="userPayload.password" type="password"></fg-input>
                        <div class="card-footer text-center">
                        <input type="submit"
                          @click="loginUser"
                          value="Login"
                          class="btn btn-info btn-lg btn-block"
                          style = "background: #32d477"
                          />
                        </div>
                        </form>
                      <div>
                          <div class = "row">
                            <div class = "col-md-6">
                            
                              <p style="display: inline-block; font-size: 11px; font-weight: 600; color: #484848;">Need an Account?
                                <router-link style="display: inline-block; color:dodgerblue; font-size: 11px; font-weight: 600; text-decoration: none;" to ="/register">
                                Register
                              </router-link>
                              </p>
                            </div>
                            <div class = "col-md-6 text-right">
                              <p style="display: inline-block; font-size: 11px; font-weight: 600; color: #484848">Forgot Password?
                              </p>
                              <router-link class = "text-center" style="display: inline-block; color:dodgerblue; font-size: 11px; font-weight: 600; text-decoration: none;" to ="/forgot-password">
                                &nbsp;Reset
                              </router-link>
                            </div>
                          </div>
                          
                          
                          <!-- <router-link class="link footer-link pull-right" to="/register" style="color: #484848; font-weight: 600">
                            Need an Account? Register
                          </router-link> -->
                      
                          
                      </div>
                  </div>
                </div>
              </Card>
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
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import { Card, Button, FormGroupInput } from '@/components';
import MainFooter from '@/layout/MainFooter';
export default {
  name: 'login-page',
  bodyClass: 'login-page',
  components: {
    Card,
    MainFooter,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  computed: { ...mapGetters(['loggedUser', 'verified', 'error'])},
  data() {
    return {
      success: true,
      userVerified: true,
      userPayload: {
        email: '',
        password: '',
      },

    }
  },

  methods: {
    ...mapActions(['authenticateLogin']),

    loginUser() {
      this.authenticateLogin(this.userPayload);
    }
  },
  watch: {
    error (val) {
      if(val) {
        console.log(val)
        this.success = false
      }
    },
    loggedUser (val) {
        //&& val.uid.length > 0
        console.log("auth state watched")

            if (val) {
                  console.log('VAL',val)
                  this.$router.push('/events')
                  window.location.reload(true);

            }
            else{
              this.success = false
              console.log('Something wrong')
            }
        },
        verified (val) {
        //&& val.uid.length > 0
            if (val) {
                  if(val == 'no'){
                    this.userVerified = false
                  }
            }
            else{
              this.success = false
              console.log('Something wrong')
                // this.$router.push({path:'/'})
            }
        },
  },
};
</script>
<style scoped>
  #button {
    margin-top: -85px;
  }
  .inputField {
      margin-top: -35px;
  }
  .login-card {
    margin-top:100px;
  }
  .login_input {
    border-radius: 50px;
  }
</style>
