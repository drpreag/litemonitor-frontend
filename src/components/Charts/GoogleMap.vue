<template>
	<div>
	    <gmap-map :center="center" :zoom="5" style="width:600px;  height: 400px;">   
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
export default {
	name: "GoogleMap",
	props: [ "center" ],
	data() {
		return {
			markers: [],
			places: [],
			currentPlace: null
		};
	},
	watch: {
		center () {
			this.markers.push({ position: this.center });
		}
	}
};
</script>
