<template>
	<div class="home">
		<!-- TODO: Change Logo -->
		<img src="../assets/logo.png">
		<Welcome msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
// @ is an alias to /src
	import Welcome from '@/components/Welcome.vue';

	export default {
		name: 'Home',
		components: {
			Welcome,
		},
	};
</script>
