<script>
import axios from 'axios'
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['pingData'],
  data () {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: ["Ping Avg speed [ms]"],
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
    pingData () {
      var totalItems = this.pingData.length - 1;
      for (var i in this.pingData) {
        this.chartData.labels[totalItems-i] = this.pingData [i][0];
        this.chartData.datasets[0].data[totalItems-i] = this.pingData [i][1];
      }    
      this.renderChart(this.chartData, this.chartOptions);
    }
  },
  mounted () {
    var totalItems = this.pingData.length - 1;
    for (var i in this.pingData) {
      this.chartData.labels[totalItems-i] = this.pingData [i][0];
      this.chartData.datasets[0].data[totalItems-i] = this.pingData [i][1];
    }
    this.renderChart(this.chartData, this.chartOptions);
  }
}
</script>