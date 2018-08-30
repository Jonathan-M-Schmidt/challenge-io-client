<template>
	<div>
		<div v-if="user">
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
			<h4>Created Challenges:
				<span v-if="challengesAsAdmin">{{ challengesAsAdmin.length }}</span>
			<span v-else>0</span></h4>
			<ul v-if="challengesAsAdmin">
				<li
					v-for="challenge in challengesAsAdmin"
					:key="challenge._id">
					{{ challenge.name }}
					<b-button
						:to="/challenge/ + challenge._id"
						size="sm"
						variant="link">
						More Info
					</b-button>
				</li>
			</ul>

			<h4>Challenges invited to:</h4>
			<SmallChallengeInfo
				v-for="challenge in user.challengeInvites"
				:key="challenge"
				:id="challenge"/>
		</div>
	</div>
</template>

<script>
	import UserBtn from '../components/UserBtn.vue';
	import SmallChallengeInfo from '../components/SmallChallengeInfo.vue';
	import user from '../Queries/user';
	import challengesAsAdmin from '../Queries/challengesAsAdmin';

	export default {
		name: 'UserInfo',
		components: {
			UserBtn,
			SmallChallengeInfo,
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
					query: user,
					variables: {
						id: this.id,
					},
					fetchPolicy: 'cache-and-network',
				};
			},
			challengesAsAdmin() {
				return {
					query: challengesAsAdmin,
					variables: {
						id: this.id,
					},
				};
			},
		},
	};
</script>

<style>

</style>
