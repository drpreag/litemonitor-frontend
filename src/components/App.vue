<template>
	<div id-"app" class="container">
    	<top-menu-bar/>
    	<router-view/>
	</div>
</template>

<script>
import TopMenuBar from '@/components/TopMenuBar'

export default {
  name: 'App',
  data () {
  	title
  },
  components: { TopMenuBar }
}
</script>