<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header border-0">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h3 class="mb-0">
                                        Manage Application Tags
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive" style="padding:60px" >
                            <div class="row">
                                <div class="col-md-6">
                                    <base-input class="input-group-alternative mb-3"
                                                placeholder="Enter Tags"
                                                v-model="new_tag"
                                                addon-left-icon="ni ni-tag">
                                    </base-input>                                
                                </div>
                                <div class="col-md-4">
                                    <base-button type="primary" @click="callCreateTags()" size="sm" style="margin-top:10px;">Create</base-button>
                                </div>
                            </div>
                            <div class="row" v-for="tag_item in tags" v-bind:key="tag_item.id">
                                <div class="col-md-12">
                                    <b-card class="mb-12" >
                                        <div class="row">
                                            <div class="col-md-6">
                                                <b-form-group>
                                                <b-form-input v-model="tag_item.value" type="text" />
                                                </b-form-group>
                                            </div>
                                            <div class="col-md-6">
                                                <b-form-group>
                                                    <base-button type="success" @click="callUpdateTags(tag_item.value,tag_item.id)" size="sm" >Update</base-button>
                                                </b-form-group>
                                            </div>
                                        </div>
                                    </b-card>
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
  import {mapGetters,mapActions} from 'vuex'
  export default {
    data(){
        return{
            new_tag:null
        }
    },
    name: 'tables',
    computed : {
     ...mapGetters(['tags'])
    },
    methods : {
        callUpdateTags (value,id) {
            if(value==''|| value==null){
                this.$store.commit("setNotifications",{message:"Empty tag fields problem updating",type:"error"})
            }
            else{
                this.$store.dispatch("UpdateTags",{value:value,id:id})

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
        }
    }
  };
</script>
<style></style>
