<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['lastHourObservationData'],
  data () {
    return {
      chartData: {
        labels: [],
        datasets: [    
          {
            label: ['Down'],
            borderColor: '#ff6384',
            fill: false,
            lineTension: 0,
            data: []
          },
          {
            label: ['Up'],
            borderColor: '#36a2eb',
            fill: false,
            lineTension: 0,
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
    lastHourObservationData: function (newVal, oldVal) {
      this.chartData.datasets[0].data = [];
      this.chartData.datasets[1].data = [];
      var totalItems = this.lastHourObservationData.length - 1;
      for (var i in this.lastHourObservationData) {
        this.chartData.labels[totalItems-i] = this.lastHourObservationData [i][0];
        if (this.lastHourObservationData[i][1] == 0.0) {
          this.chartData.datasets[0].data[totalItems-i] = this.lastHourObservationData [i][1];
        }
        else {
          this.chartData.datasets[1].data[totalItems-i] = this.lastHourObservationData [i][1];
        }
      }
      this.$data._chart.update();
    }
  },
  mounted () {
    var totalItems = this.lastHourObservationData.length - 1;
    for (var i in this.lastHourObservationData) {
      this.chartData.labels[totalItems-i] = this.lastHourObservationData [i][0];
      if (this.lastHourObservationData[i][1] == 0) {
        this.chartData.datasets[0].data[totalItems-i] = this.lastHourObservationData [i][1];
      }
      else {
        this.chartData.datasets[1].data[totalItems-i] = this.lastHourObservationData [i][1];
      }      
    }
    this.renderChart(this.chartData, this.chartOptions);
  }
}
</script>