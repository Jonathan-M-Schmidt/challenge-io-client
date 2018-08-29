<template>
	<div class="home">
		<!-- TODO: Change Logo -->
		<img src="../assets/logo.png">
		<Welcome msg="Welcome to Your Vue.js App" />
		<!-- <div
			v-for="user in allUsers"
			:key="user._id">
			<p>{{ user.name }}</p>
			<p>{{ user.email }}</p>
		</div> -->
	</div>
</template>

<script>
// @ is an alias to /src
	import Welcome from '@/components/Welcome.vue';
	import allUsers from '@/Queries/allUsers.gql';

	export default {
		name: 'Home',
		components: {
			Welcome,
		},
		data() {
			return {
				allUsers: [],
			};
		},
		apollo: {
			allUsers,
		},
	};
</script>
