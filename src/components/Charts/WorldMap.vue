<template>
	<div>
	    <gmap-map :center="center" :hosts="hosts" :zoom="2" style="width:600px; height: 300px;">
	        <gmap-marker
		        :key="index"
		        v-for="(m, index) in markers"
		        :position="m.position"
		        :title="m.title"
		        :icon="m.icon"
		        @click="center=m.position">
			</gmap-marker>    
	    </gmap-map>
	</div>
</template>

<script>

export default {
	name: "WorldMap",
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
	     	for (var i = 0; i < this.hosts.length; i++) {
	     		if (this.hosts[i].active) {
					this.markers.push ({ 
		      			position: {
		      				lat: this.hosts[i].latitude, 
		      				lng: this.hosts[i].longitude
		      			},
						title: this.hosts[i].name,
						icon: '/static/icons/blue_pin_small.png',
					});
				} 
	    	}
		}
	}
}
</script>