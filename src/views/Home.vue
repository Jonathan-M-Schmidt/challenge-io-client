<template>
	<div class="home">
		<img src="../assets/logo.png">
		<HelloWorld msg="Welcome to Your Vue.js App" />
		<div
			v-for="user in allUsers"
			:key="user._id">
			<p>{{ user.name }}</p>
			<p>{{ user.email }}</p>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
	import HelloWorld from '@/components/HelloWorld.vue';
	import allUsers from '@/Queries/allUsers.gql';

	export default {
		name: 'Home',
		components: {
			HelloWorld,
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
