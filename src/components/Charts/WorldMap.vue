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
	     	for (var i = 0; i < this.hosts.length-1; i++) {
				this.getGeoData (this.hosts[i]);
	    	}
		}
	},
	methods: {
	    getGeoData (host) {
	      	if (host.active!=0 && host.ip!="" && host.ip!=null && host.ip!="127.0.0.1" && host.ip!="localhost") {
	      		this.markers.push ({ 
	      			position: {
	      				lat: host.latitude, 
	      				lng: host.longitude
	      			}, 
					label: host.active, 
					title: host.name 
				});
			}
	    }
	}
}
</script>