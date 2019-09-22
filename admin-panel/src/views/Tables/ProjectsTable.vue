<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
        <!-- <div class="col text-right">
          <base-button type="primary" size="sm">See all</base-button>
        </div> -->
      </div>
    </div>
    <div class="table-responsive">
        <b-container fluid>
          <!-- User Interface controls -->
          <b-row>
            <b-col md="6" class="my-1">
              <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
                <b-input-group>
                  <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col md="6" class="my-1">
              <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
                <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- Main table element -->
          <b-table
            show-empty
            stacked="md"
            :items="tableData"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
          >
          <template slot="name" slot-scope="row">
                {{row.item.first_name}} {{row.item.last_name}}
          </template> 
          <template slot="actions" slot-scope="row">
                <base-button v-b-modal.modal-1 type="success" size="sm" @click="info(row.item)" >View Profile</base-button>
          </template> 
          </b-table>
          <b-row>
            <b-col md="6" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                class="my-0"
              ></b-pagination>
            </b-col>
          </b-row>
        <!-- Info modal -->
        <!-- <b-modal ok-title="View Events"  @ok="viewEvents"  id="modal-1" title="BootstrapVue">
    <p class="my-4">Hello from modal!</p>
  </b-modal> -->
        <b-modal ref="profile_modal" ok-title="View Engagements" id="modal-1"  @ok="viewEvents" :title="infoModal.title"  @hide="resetInfoModal">
          <div class="row">

          <div  class="col-md-12" style="margin-top:-22px;">
                  <img class="offset-md-4  avatar" v-if="infoModal.item.profile_image" :src="infoModal.item.profile_image" style="width:90px;height:95px;" alt="...">
                  <img class="offset-md-4  avatar" v-else src="../../assets/img/default-profile.png" style="width:90px;height:95px;" alt="...">
          </div>
          <div  class="col-md-6">
            <h5 style="color:black;">Name</h5>
          </div>
          <div class="col-md-6">
            <h5 style="color:black;">{{infoModal.item.name}}</h5>
          </div>
          <div  class="col-md-6">
            <h5 style="color:black;">Email</h5>
          </div>
          <div class="col-md-6">
            <h5 style="color:black;">{{infoModal.item.email}}</h5>
          </div>
          <div  class="col-md-6">
            <h5 style="color:black;">Occupation</h5>
          </div>
          <div class="col-md-6">
            <h5 style="color:black;">{{infoModal.item.job_occupation}}</h5>
          </div>
          <div  class="col-md-6">
            <h5 style="color:black;">Institute</h5>
          </div>
          <div class="col-md-6">
            <h5 style="color:black;">{{infoModal.item.institute}}</h5>
          </div>
          <div  class="col-md-6">
            <h5 style="color:black;">Events Hosted</h5>
          </div>
          <div class="col-md-6">
            <h5 style="color:black;">{{ infoModal.item.events_hosted ? Object.keys(infoModal.item.events_hosted).length : 0 }}</h5>
          </div>
          <div  class="col-md-6">
            <h5 style="color:black;">Events Attended</h5>
          </div>
          <div class="col-md-6">
            <h5 style="color:black;">{{ infoModal.item.events_attended ? Object.keys(infoModal.item.events_attended).length : 0}}</h5>
          </div>          <div  class="col-md-6">
            <h5 style="color:black;">About</h5>
          </div>
          <div class="col-md-6">
            <h5 style="color:black;">{{infoModal.item.about}}</h5>
          </div>


      </div>
        </b-modal>
        
      </b-container>
    </div>
    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
    </div>

  </div>
</template>
<script>
 import {mapGetters} from 'vuex'
  export default {
    name: 'projects-table',
    props: {
      type: {
        type: String
      },
      title: String,
      tableData: {
        type: Array,
        default: function () { return [] }
    }
    },
    computed:{
      ...mapGetters(['getUsers']),
         sortOptions() {
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    data() {
      return {
        infoModal: {
          id: 'info-modal',
          title: '',
          content: '',
          item:{}
        },
        items: [],
        fields: [
          { key: 'name', label: 'Name' },
          { key: 'job_occupation', label: 'Occuptation'},
          { key: 'age', label: 'Age' },
          { key: 'email', label: 'Email' },
          { key: 'actions', label: 'Action' }

        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        

      }
    },
    methods : {
      viewEvents() {
       for(var key in this.infoModal.item.events_hosted){
         this.$store.dispatch("findEvent",{event_id:this.infoModal.item.events_hosted[key],type:'events_attended'})

       }
       for(var key in this.infoModal.item.events_attended){
         this.$store.dispatch("findEvent",{event_id:this.infoModal.item.events_attended[key],type:'events_hosted'})

       }
        this.$router.push({path:'events'})

      },
      info(item) {
        this.infoModal.title = item.name
        this.infoModal.item=item
        // this.$refs.profile_modal.show()
        // this.infoModal.content = JSON.stringify(item, null, 2)
        // this.$root.$emit('bv::show::modal')
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    },
    watch:{
      tableData(val) {
      this.totalRows = this.tableData.length

      }
    },
    created() {
      console.log(this.tableData.length)
      this.totalRows = this.tableData.length
    }
  }
</script>
<style scoped>

.col-md-6{
  margin-top:10px;
}
</style>
