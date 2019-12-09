<!--This code was developed in part by Lizzet Clifton, Eric Lin, Jordan Shapiro, and Katelyn Chang for Duke CS408-->
<template>
  <div>
    <div class="main">
      <div class="row">
        <div class="container">
          <div class="col-md-6 ml-auto mr-auto">
            <div class="alert alert-success" dismissible v-if="success">Password Reset Link has been sent on Email</div>
              <Card class="login-card">
                <h3 class="text-center text-info"><b>Reset Password</b></h3>
                <fg-input class="no-border input-lg" addon-left-icon="now-ui-icons ui-1_email-85" placeholder="Email" v-model="email" type="email"></fg-input>
                <div class="card-footer text-center">
                <a
                  @click="resetPassword"
                  class="btn btn-info text-white btn-round btn-lg btn-block"
                  >Reset Now</a>
              </div>
              <div>
                <h6>
                  <router-link class="link footer-link mr-3 pull-right text-success" to="/register">
                    Need an Account? Register
                  </router-link>
                </h6>
                <h6>
                  <router-link class="link footer-link ml-3 text-success" to="/login">
                    Login Account?
                  </router-link>
                </h6>
              </div>
              </Card>
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
  name: 'forgot-password-page',
  bodyClass: 'forgot-password-page',
  components: {
    Card,
    MainFooter,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  computed: { ...mapGetters(['reset'])},
  data() {
    return {
      success: false,
      userVerified: true,
      email: null
    }
  },
  
  methods: {
    ...mapActions(['passwordReset']),

    resetPassword() {
      this.passwordReset(this.email);
    }
  },
  created() {
      const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
      if(loggedUser != null) {
        this.$router.push({path: '/events'})
      }
    },
  watch: {
    error (val) {
      if(val) {
        console.log(val)
        this.success = false
      }
    },
    reset (val) {
        //&& val.uid.length > 0
        console.log("auth state watched")

            if (val) {
                setTimeout(() => {
                  console.log('VAL',val)
                  if(val == 'success') {
                      this.success = true
                  }
                }, 500)
            }
            else{
              this.success = false
              console.log('Something wrong')
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
</style>
