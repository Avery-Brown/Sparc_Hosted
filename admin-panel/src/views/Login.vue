<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                   
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <img src="../../public/img/brand/sparclogo.png" width="150" height="150" class="navbar-brand-img" alt="...">
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input>

                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            <div class="text-center">
                                <base-button type="primary" @click="callAuthLogin" class="my-4">Sign in</base-button>
                            </div>
                        </form> 
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <!-- <a href="#" class="text-light"><small>Forgot password?</small></a> -->
                    </div>
                    <div class="col-6 text-right">
                        <!-- <router-link to="/register" class="text-light"><small>Create new account</small></router-link> -->
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import {mapGetters} from 'vuex'

  export default {
    name: 'login',
        data() {
        return {
            model: {
            email: 'rabbit@gmail.com',
            password: 'rabbit'
            }
        }
        },
        computed : {
            ...mapGetters(['loggedUser'])

        },
        watch: {
        loggedUser (val) {
            //&& val.uid.length > 0
            console.log("auth state watched")
                if (val) {
                    setTimeout(() => {
                    this.$router.push('/')
                    }, 500)
                }
                // else{
                //     this.$router.push({path:'/login'})
                // }
            }
        },
        methods:{
            callAuthLogin(){

                if(this.model.email&&this.model.password){
                  this.$store.dispatch("authenticatelogin",this.model)
                }
                else{
                    this.$store.commit("setNotifications",{message:"Kindly fill in your login credentials",type:"error"})
                }

            }
        }
    }
  
    
  
</script>
<style>
</style>
