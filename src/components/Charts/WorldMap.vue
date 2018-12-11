<template>
	<div>
	    <gmap-map :center="center" :hosts="hosts" :zoom="1" :style="divstyle">
	    <!-- gmap-map :center="center" :hosts="hosts" :zoom="1" style="width:450px; height:300px;" -->
	        <gmap-marker
		        :key="index"
		        v-for="(m, index) in markers"
		        :position="m.position"
		        :title="m.title"
		        :icon="m.icon"
		        @click="center=m.position"
		        >
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
			currentPlace: null,
			divstyle: "width:300px; height:200px;"
		};
	},
	created() {
		// let gwidth = document.getElementById("gmap_div").clientWidth;
		let element = document.getElementById("gmap_div");
		// if (document.body.contains("gmap_div")) {
		if (typeof(element) !== 'undefined' && element != null) {
			let gwidth = element.clientWidth;
			if (gwidth>600) {
				gwidth=600;
			}
			let gheight = gwidth * 2 / 3;
			this.divstyle = 'width:'+gwidth+'px; height:'+gheight+'px;';
		}
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