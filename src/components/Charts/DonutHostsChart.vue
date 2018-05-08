<script>
import axios from 'axios'
import VueCharts from 'vue-chartjs'
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['passedHostChartData'],
  data () {
    return {
      chartData: {
        labels: ['Down', 'Up', "Non-monitored"],
        datasets: [
          {
            label: 'Hosts',
            backgroundColor: '#f87979',
            data: [],
            backgroundColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)'
            ]
          }       
        ]    
      },    
      chartOptions: {
        responsive: false,
        maintainAspectRatio: false
      }    
    }
  },  
  watch: { 
    passedHostChartData: function (newVal, oldVal) {
      this.chartData.datasets[0].data=this.passedHostChartData;
      this.renderChart(this.chartData, this.chartOptions);
    }
  }, 
  mounted () {
    this.chartData.datasets[0].data=this.passedHostChartData;
    this.renderChart(this.chartData, this.chartOptions);
  }
}
</script>