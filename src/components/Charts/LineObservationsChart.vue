<script>
import axios from 'axios'
import VueCharts from 'vue-chartjs'
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['observationData'],
  data () {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: ["Speed ms"],
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
      var totalItems = this.observationData.length - 1;
      for (var i in this.observationData) {
        this.chartData.labels[totalItems-i] = this.observationdData [i][0];
        this.chartData.datasets[0].data[totalItems-i] = this.observationData [i][1];
        //console.log (this.chartData.labels[totalItems-i] , this.chartData.datasets[0].data[totalItems-i])
      }
      this.renderChart(this.chartData, this.chartOptions);
    }
  },
  mounted () {
    var totalItems = this.observationData.length - 1;
    for (var i in this.observationData) {
      this.chartData.labels[totalItems-i] = this.observationData [i][0];
      this.chartData.datasets[0].data[totalItems-i] = this.observationData [i][1];
      //console.log (this.chartData.labels[totalItems-i] , this.chartData.datasets[0].data[totalItems-i])
    }
    this.renderChart(this.chartData, this.chartOptions);
  }
}
</script>