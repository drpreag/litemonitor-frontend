<template>
	<div>
	    <gmap-map :center="center" :ips="ips" :zoom="0" style="width:400px;  height: 200px;">   
	        <gmap-marker
		        :key="index"
		        v-for="(m, index) in markers"
		        :position="m.position"
		        @click="center=m.position">
			</gmap-marker>    
	    </gmap-map>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: "GoogleMap",
	props: [ "center", "ips" ],
	data() {
		return {
			markers: [],
			places: [],
			currentPlace: null
		};
	},
	watch: {
		ips () {
	     	for (var i = 0; i < this.ips.length; i++) {
				this.getGeoData (this.ips[i]);
	    	}			
		}
	},
	methods: {
	    getGeoData (ipAddress) {
	      if (ipAddress != "127.0.0.1" && ipAddress != "localhost") {
	        axios
				.get("https://api.ipdata.co/" + ipAddress)
				.then(response => {
					this.markers.push ({ position: {lat: +response.data.latitude, lng: +response.data.longitude}});
				})
	      }
	    }
	}
};
</script>