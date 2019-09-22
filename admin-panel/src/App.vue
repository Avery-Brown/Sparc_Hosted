<template>
  <div id="app">
    <notifications></notifications>
    <router-view/>
  </div>
</template>


<script>
import {mapGetters} from 'vuex'
import nativeToast from 'native-toast'

export default {
  created(){
    this.$store.dispatch("fetchUsers")
    this.$store.dispatch("fetchTags")
    this.$store.dispatch("fetchAllEvents")

    

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
}
</script>
<style>
.modal-open {
  overflow-y:scroll!important;
  padding-right:0 !important;
  }

</style>


