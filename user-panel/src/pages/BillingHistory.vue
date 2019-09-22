<template>
    <div>
        
    <div class="main">
      <div class="section section-images">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
                <h2>Billing History</h2>
                <div class="row">
                  <div class="col-md-12">
                      <datatable :data="data" :columns="columns"></datatable>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import datatable from 'bootstrap-vue-datatable'
export default {
    name: 'billing-history',
    
    data() {
      return {
        userEvents: [],
        hostedEvents: [],
        userId: null,
        data: [],

        // Columns that should be displayed on The Table
        columns: [
          {name: "event_id", th: "Engagement Name"},
          {name: "amount", th: "Payment"},
          {name: "user_id", th: "Paid By"},
        ],
      }
    },
    computed : {
        ...mapGetters(['getEvents', 'getBillings', 'allUsers']),

        filterBillings() {
          let billing = this.getBillings.filter(bill => bill.host_id == this.userId)
          return billing
        }
    },
    methods: {
        ...mapActions(['fetchBillings', 'fetchEvents']),
        
        filterBills() {
            this.getBillings.filter(bill => {
                if(bill.host_id == this.userId) {
                    bill.user_id = this.getUser(bill.user_id)
                    bill.event_id = this.getEvent(bill.event_id)
                    bill.amount = "USD $" + bill.amount
                    console.log(bill)
                    this.data.push(bill)
                }
            })
            console.log("Data")
            console.log(this.data)
        },

        getUser(id) {  
            let user_item = this.allUsers.find(user => user.id === id)
            return user_item.first_name + " " + user_item.last_name 
        },

        getEvent(id) {
            console.log(id)
            let event_item = this.getEvents.find(item => item.id === id)
            return event_item.event_name
        },
      
    },
    watch:{
    getBillings(){
        if(this.getBillings.length>0){

            this.filterBills()

            
        }
    }
    },
    created() {
      this.fetchEvents();
        this.fetchBillings();
        console.log(this.getBillings)
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        if(loggedUser != null) {
            this.userId = loggedUser.id
        }
        this.filterBills();
      
    }
}
</script>

<style scoped>
    
</style>