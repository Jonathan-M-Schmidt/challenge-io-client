<template>
	<b-badge
		v-if="user"
		id="invites"
		:to="/user/ + $store.getters.currentUser._id"
		variant="primary"
		class="float-right"
		pill>
		Invites: {{ user.challengeInvites.length || 0 }}
	</b-badge>
</template>

<script>
	import userQuery from '../Queries/user';

	export default {
		name: 'InviteBadge',
		data() {
			return {
				user: '',
			};
		},
		apollo: {
			user() {
				return {
					query: userQuery,
					variables: {
						id: this.$store.getters.currentUser._id,
					},
				};
			},
		},
	};
</script>

