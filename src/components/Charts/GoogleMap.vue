<template>
	<div>
	    <gmap-map :center="marker.position" :zoom="4" style="width:300px; height: 200px;">   
	        <gmap-marker
		        :key=0
		        :position="marker.position"
		        :title="marker.title"
		        :icon="marker.icon"		        
		        @click="center=marker.position">
			</gmap-marker>  			
	    </gmap-map>
	</div>
</template>

<script>

export default {
	name: "GoogleMap",
	props: [ "marker" ],
	data() {
		return {
			markers: []
		};
	},
	watch: {
		center () {
			this.markers.push({ position: this.marker.position });
		}
	},
  	mounted () {
		this.markers.push({ position: this.marker.position, icon: this.marker.icon, title: this.marker.title });
	}
};
</script>
