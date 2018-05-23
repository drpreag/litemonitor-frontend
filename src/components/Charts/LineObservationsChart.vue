<script>
import axios from 'axios'
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['observationData'],
  data () {
    return {
      chartData: {
        labels: [],
        datasets: [
          // {
          //   label: ["Speed [ms]"],
          //   data: [],            
          //   backgroundColor: '#f87979',
          //   backgroundColor: [
          //       'rgba(255,99,132,1)',
          //       'rgba(54, 162, 235, 1)'
          //   ]
          // }       
          {
            label: ['Down'],
            borderColor: '#ff6384',
            fill: false,
            data: []
          },
          {
            label: ['Up'],
            borderColor: '#36a2eb',
            fill: false,
            data: []
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
    observationData: function (newVal, oldVal) {
      var totalItems = this.observationData.length - 1;
      for (var i in this.observationData) {
        this.chartData.labels[totalItems-i] = this.observationData [i][0];
        if (this.observationData[i][1] == 0.0) {
          this.chartData.datasets[0].data[totalItems-i] = this.observationData [i][1];
        }
        else {
          this.chartData.datasets[1].data[totalItems-i] = this.observationData [i][1];
        }
      }
      this.$data._chart.update();
    }
  },
  mounted () {
    var totalItems = this.observationData.length - 1;
    for (var i in this.observationData) {
      this.chartData.labels[totalItems-i] = this.observationData [i][0];
      if (this.observationData[i][1] == 0) {
        this.chartData.datasets[0].data[totalItems-i] = this.observationData [i][1];
      }
      else {
        this.chartData.datasets[1].data[totalItems-i] = this.observationData [i][1];
      }      
    }
    this.renderChart(this.chartData, this.chartOptions);
  }
}
</script>