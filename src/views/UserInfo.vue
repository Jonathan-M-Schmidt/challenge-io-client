<template>
	<div>
		<div v-if="user">
			{{ id }}
			<h1>{{ user.name }}</h1>
			<h4>{{ user.email }}</h4>
			<hr class="my-2">
			<h4>Friends: {{ user.friends.length }}</h4>
			<div
				v-for="friend in user.friends"
				:key="friend._id">
				<UserBtn :userId="friend._id"/>
				since: {{ new Date(friend.date_friends_since).toLocaleDateString() }}
			</div>
			<h4>Rivals: {{ user.rivals.length }}</h4>
			<div
				v-for="rival in user.rivals"
				:key="'r' + rival._id">
				<UserBtn :userId="rival._id"/>
			</div>
		</div>
	</div>
</template>

<script>
	import gql from 'graphql-tag';
	import UserBtn from '../components/UserBtn.vue';

	export default {
		name: 'UserInfo',
		components: {
			UserBtn,
		},
		data() {
			return {
				user: '',
				id: this.$store.getters.currentUser.user._id,
			};
		},
		apollo: {
			user() {
				return {
					query: gql`query ($id: String!) {
							user(id: $id) {
								_id
								name
								email
								friends{
									_id
									name
								}
								rivals {
									_id
									name
								}
							}
						}`,
					variables: {
						id: this.id,
					},
					fetchPolicy: 'cache-and-network',
				};
			},
		},
	};
</script>

<style>

</style>
