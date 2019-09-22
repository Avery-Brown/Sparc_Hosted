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
        <div class="col text-right">
          <base-button type="primary"  v-b-modal.modal-2 size="sm">Add New</base-button>
        </div>
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
          <template slot="actions" slot-scope="row">
                <base-button v-b-modal.modal-1 type="success" size="sm" @click="info(row.item)" >View</base-button>
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
        <b-modal ref="profile_modal" ok-title="Update" id="modal-1"  @ok="callUpdateTags()" title="Modify Tags"  @hide="resetInfoModal">
          <div class="row">
            <div  class="col-md-12">
              <b-form-group>
                <b-form-input v-model="new_tag" type="text" />
              </b-form-group>          
            </div>
          </div>
        </b-modal>

        <b-modal  ok-title="Create" id="modal-2"  @ok="callCreateTags()" title="Create Tags"  @hide="resetInfoModal">
          <div class="row">
            <div  class="col-md-12">
              <b-form-group>
                <b-form-input v-model="new_tag" type="text" />
              </b-form-group>          
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
    name: 'tags-table',
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
        new_tag:null,
        infoModal: {
          id: 'info-modal',
          title: '',
          content: '',
          item:{}
        },
        items: [],
        fields: [
          { key: 'value', label: 'value' },
          { key: 'count', label: 'Times Used' },
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
      callUpdateTags () {
            if(this.infoModal.item.value==''|| this.infoModal.item.value==null){
                this.$store.commit("setNotifications",{message:"Empty tag fields problem updating",type:"error"})
                          this.new_tag=null

            }
            else{
              this.$store.dispatch("UpdateTags",{value:this.new_tag,id:this.infoModal.item.id})
              this.new_tag=null
            }
        },
        callCreateTags(){
            if(this.new_tag==''|| this.new_tag==null){
                this.$store.commit("setNotifications",{message:"Empty tag fields problem creating",type:"error"})
            }
            else{
            this.$store.dispatch("CreateTags",this.new_tag)
            this.new_tag=null
            }
        },
     
      info(item) {
        this.new_tag=item.value
        this.infoModal.title = item.name
        this.infoModal.item=item
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
      this.totalRows = this.tableData.length
    }
  }
</script>
<style scoped>

.col-md-6{
  margin-top:10px;
}
</style>
