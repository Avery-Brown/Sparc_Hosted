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
export default {

  created () {
    this.$store.dispatch("fetchAllUsers")
    this.$store.dispatch("fetchRatings")
    this.$store.commit('unSetEvents')
    this.$store.dispatch("fetchEvents")
    
    
  }

};
</script>

<style>
.modal-open {
  overflow-y:scroll!important;
  padding-right:0 !important;
  }

</style>

