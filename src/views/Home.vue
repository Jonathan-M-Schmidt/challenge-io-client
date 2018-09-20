<template>
	<div class="home">
		<Welcome
			msg="Welcome to Your Vue.js App"
			class="container"/>
	</div>
</template>

<script>
	import Welcome from '@/components/Welcome.vue';

	export default {
		name: 'Home',
		components: {
			Welcome,
		},
	};
</script>

<style scoped>

</style>

