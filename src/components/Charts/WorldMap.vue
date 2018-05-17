<template>
	<div>
	    <gmap-map :center="center" :hosts="hosts" :zoom="2" style="width:600px; height: 300px;">
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
	props: [ "center", "hosts" ],
	data() {
		return {
			markers: [],
			places: [],
			currentPlace: null
		};
	},
	watch: {
		hosts () {
			//console.log ("Hosts: " + this.hosts.length);
	     	for (var i = 0; i < this.hosts.length; i++) {	
				this.getGeoData (this.hosts[i]);
	    	}			
		}	
	},
	mounted() {
		//this.markers.push({ position: this.center });
	},
	methods: {
	    getGeoData (host) {
	      	if (host.ip != "127.0.0.1" && host.ip != "localhost") {
	        axios
				.get("https://api.ipdata.co/" + host.ip)
				.then(response => {
					this.markers.push ({ position: {lat: +response.data.latitude, lng: +response.data.longitude}, 
						label: host.status, title: host.name });
				})
			}
	    }
	}
};
</script>