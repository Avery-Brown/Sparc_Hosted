<template>
  <div id="app">
    <router-view name="header" />
    <div class="wrapper">
      <router-view />
    </div>
    <router-view name="footer" />
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
  import nativeToast from 'native-toast'

export default {

  created () {
    this.$store.dispatch("fetchAllUsers")
    this.$store.dispatch("fetchRatings")
    this.$store.dispatch("fetchEvents")
    this.$store.dispatch("fetchMessages")
    if(JSON.parse(localStorage.getItem('loggedUser'))!=null){
    this.$store.commit('setLoggedUser',JSON.parse(localStorage.getItem('loggedUser')))
    }
  },
  computed:{
    ...mapGetters(['notification'])
  },
  watch:{
    notification (val){
      if(val){
          nativeToast({
          message: this.notification.message,
          position: 'north-east',
          timeout: 5000,
          type: this.notification.type
        })
        this.$store.commit("unSetNotifications")
      }

    }
  }

};
</script>

<style>
.modal-open {
  overflow-y:scroll!important;
  padding-right:0 !important;
  }

</style>

