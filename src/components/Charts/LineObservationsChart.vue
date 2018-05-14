<script>
import axios from 'axios'
import VueCharts from 'vue-chartjs'
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['passedData'],
  data () {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: ["Ping Avg speed"],
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
    passedData () {
      var totalItems = this.passedData.length - 1;
      for (var i in this.passedData) {
        this.chartData.labels[totalItems-i] = this.passedData [i][0];
        this.chartData.datasets[0].data[totalItems-i] = this.passedData [i][1];
        console.log (this.chartData.labels[totalItems-i] , this.chartData.datasets[0].data[totalItems-i])
      }
      this.renderChart(this.chartData, this.chartOptions);
    }
  },
  mounted () {
    var totalItems = this.passedData.length - 1;
    for (var i in this.passedData) {
      this.chartData.labels[totalItems-i] = this.passedData [i][0];
      this.chartData.datasets[0].data[totalItems-i] = this.passedData [i][1];
      console.log (this.chartData.labels[totalItems-i] , this.chartData.datasets[0].data[totalItems-i])
    }
    this.renderChart(this.chartData, this.chartOptions);
  }
}
</script>