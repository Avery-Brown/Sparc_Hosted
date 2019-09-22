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
                                        View Age Range Statistics
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive" style="padding:60px" >
                           <div class="row">
                                <div class="col-xl-6">
                                    <card header-classes="bg-transparent">
                                        <div slot="header" class="row align-items-center">
                                            <div class="col">
                                                <h6 class="text-uppercase text-muted ls-1 mb-1">Age Range Statistics</h6>
                                                <h5 class="h3 mb-0">Events Hosted</h5>
                                            </div>
                                        </div>
                                        <bar-chart
                                                :height="350"
                                                ref="barChart"
                                                :chart-data="redBarChart.chartData"
                                        >
                                        </bar-chart>
                                    </card>
                                </div>
                                <div class="col-xl-6">
                                    <card header-classes="bg-transparent">
                                        <div slot="header" class="row align-items-center">
                                            <div class="col">
                                                <h6 class="text-uppercase text-muted ls-1 mb-1">Age Range Statistics</h6>
                                                <h5 class="h3 mb-0">Events Attended</h5>
                                            </div>
                                        </div>
                                        <bar-chart
                                                :height="350"
                                                ref="barChart"
                                                :chart-data="redBarChart.chartData"
                                        >
                                        </bar-chart>
                                    </card>
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
  import * as chartConfigs from '@/components/Charts/config';
  import BarChart from '@/components/Charts/BarChart';

  export default {
    components:{
      BarChart
    },
    data(){
        return{
            redBarChart: {
            chartData: {
                labels: ['20-25', '25-35', '35-45', '45-55', '55-65', '65-75'],
                datasets: [{
                label: 'Events Hosted',
                data: [25, 20, 30, 22, 17, 29]
                }]
            },
            }
        }
    },
    name: 'agerange',
    computed : {},
    methods : {}
  };
</script>
<style></style>
