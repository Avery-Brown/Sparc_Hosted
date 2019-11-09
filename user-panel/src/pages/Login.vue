<template>
  <div>
    <div class="main">
      <div class="row">
        <div class="container">
          <div class="col-md-6 ml-auto mr-auto">
            <div class="alert alert-danger" dismissible v-if="!success">Invalid Email or Password</div>
            <div class="alert alert-warning" dismissible v-if="!userVerified">Please Verifiy your Email address to continue</div>
              <Card class="login-card">
                <h3 class="text-center text-info"><b>A People-Centric Marketplace</b></h3>
                <form action="" @submit="loginUser">
                <fg-input id="login_input" class="no-border input-lg" addon-left-icon="now-ui-icons ui-1_email-85" placeholder="Email" v-model="userPayload.email" type="email"></fg-input>
                <fg-input id="login_input" class="no-border input-lg" addon-left-icon="now-ui-icons ui-1_lock-circle-open" placeholder="Password" v-model="userPayload.password" type="password"></fg-input>
                <div class="card-footer text-center">
                <input type="submit"
                  @click="loginUser"
                  value="Login"
                  class="btn btn-info text-white btn-round btn-lg btn-block"
                  />
                </div>
                </form>
              <div>
                <h6>
                  <router-link class="link footer-link pull-right text-success" to="/register">
                    Need an Account? Register
                  </router-link>
                </h6>
                <h6>
                  <router-link class="link footer-link text-center text-success" to="/forgot-password">
                    Forgot Password? Reset
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
