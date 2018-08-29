<template>
	<div v-if="challenge">
		<b-alert
			v-if="isAdmin"
			show
			variant="success">
			You are the Admin for this Challenge.
		</b-alert>
		<b-btn
			variant="primary"
			size="sm"
			to="/challenges">Back</b-btn>
		<h1>{{ challenge.name }}</h1>
		<div
			id="banner"
			:style="{ backgroundImage: 'url(' + challenge.bannerImg+ ')' }"
		/>
		<b-alert
			v-if="isExpired(challenge.dateTill)"
			show
			dismissible
			variant="warning">
			Challenge allready expired
		</b-alert>
		<h4>{{ challenge.description }}</h4>
		<p>
			<strong class="bold">
				From:
			</strong>
			{{ new Date(challenge.dateFrom).toLocaleDateString() }}
			<strong class="bold">
				Till:
			</strong>
			{{ new Date(challenge.dateTill).toLocaleDateString() }}
		</p>
		<hr>
		<b-button
			v-if="isAdmin"
			variant="outline-success"
			class="mb-3">
			Invite new User
		</b-button>
		<h4>Users in Challenge:</h4>
		<span
			v-for="user in challenge.users"
			:key="user">
			<UserBtn :userId="user" />
		</span>
	</div>
</template>

<script>
	import gql from 'graphql-tag';
	import isExpired from '../helper/isExpired';
	import UserBtn from './UserBtn.vue';

	export default {
		name: 'Challenge',
		components: {
			UserBtn,
		},
		data() {
			return {
				challenge: '',
			};
		},
		computed: {
			isAdmin() {
				if ( this.challenge ) {
					const admin =
						this.$store.getters.currentUser.user._id === this.challenge.adminID;
					return admin;
				}
				return '';
			},
		},
		methods: {
			isExpired,
		},
		apollo: {
			challenge() {
				return {
					query: gql` query challenge($id: String!) {
							challenge(id: $id) {
								name
								adminID
								bannerImg
								dateFrom
								dateTill
								description
								users
							}
						}`,
					variables: {
						id: this.$route.params.id,
					},
				};
			},
		},
	};
</script>

<style lang="scss" scoped>
#banner {
	height: 0;
	padding-top: 35%;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	margin-bottom: 10px;
}
</style>

