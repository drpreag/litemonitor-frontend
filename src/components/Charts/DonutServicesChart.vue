<script>
import axios from 'axios'
import VueCharts from 'vue-chartjs'
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['passedServiceChartData'],
  data () {
    return {
      chartData: {
        labels: ['Down', 'Up', "Non-monitored"],
        datasets: [
          {
            label: 'Services',
            data: [],            
            backgroundColor: '#f87979',
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
    passedServiceChartData: function(newVal, oldVal) { 
      this.chartData.datasets[0].data = this.passedServiceChartData;
      this.$data._chart.update();      
    }
  }, 
  mounted () {
    this.chartData.datasets[0].data = this.passedServiceChartData;
    this.renderChart(this.chartData, this.chartOptions);
  }
}
</script>