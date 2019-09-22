<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <tags-table title="Sparco Tags" :tableData="tags"></tags-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import TagsTable from './Tables/TagsTable'
  import {mapGetters} from 'vuex'
  export default {
    name: 'tables',
    components: {
      TagsTable
    },
    computed : {
        ...mapGetters(['users','getUsers','tags']),
    }
  };
</script>
<style scoped>
  </style>
