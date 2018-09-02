<template>
	<div v-if="challenge">
		<b-alert
			v-if="isAdmin"
			show
			variant="success">
			You are the Admin for this Challenge.
		</b-alert>
		<div
			v-if="isAdmin">
			<b-button
				size="sm"
				variant="danger"
				class="mr-2"
				@click="onDelete">
				Delete Challenge
			</b-button>
			<b-button
				size="sm"
				variant="outline-secondary">
				Edit Challenge
			</b-button>
			<hr>
		</div>

		<h1>{{ challenge.name }}</h1>
		<span v-if="isInvited">
			<h5>You are invited:</h5>
			<b-button
				size="sm"
				variant="success"
				class="mb-4"
				@click="onAccept($store.getters.currentUser._id, challenge._id)">
				Accept
			</b-button>
		</span>
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
			class="mb-3"
			@click="onShowModal">
			Invite new User
		</b-button>
		<h4>Users in Challenge:</h4>
		<b-modal
			v-if="isAdmin"
			v-model="showModal"
			okTitle="Select"
			title="Select Users you whant to invite:"
			hideFooter
		>
			<div
				v-if="allUsers">
				<UserSelection
					:users="allUsers"
					:challengeID="challenge._id"
					@close-modal="showModal = !showModal"/>
			</div>
		</b-modal>

		<span
			v-for="user in challenge.users"
			:key="user">
			<UserBtn :userId="user" />
		</span>
	</div>
</template>

<script>
	import isExpired from '../helper/isExpired';
	import UserBtn from './UserBtn.vue';
	import UserSelection from './UserSelection.vue';
	import deleteChallenge from '../Mutations/deleteChallenge';
	import acceptInvite from '../Mutations/acceptInvite';
	import challenge from '../Queries/challenge';
	import allChallenges from '../Queries/allChallenges';
	import allUsers from '../Queries/allUsers';
	import user from '../Queries/user';

	export default {
		name: 'Challenge',
		components: {
			UserBtn,
			UserSelection,
		},
		data() {
			return {
				user: '',
				challenge: '',
				allUsers: '',
				showModal: false,
				send: false,
			};
		},
		computed: {
			isAdmin() {
				if ( this.challenge ) {
					const admin =
						this.$store.getters.currentUser._id === this.challenge.adminID;
					return admin;
				}
				return '';
			},
			isInvited() {
				if ( !this.challenge || !this.user ) return '';
				const invites = this.user.challengeInvites || [];
				return invites.indexOf( this.challenge._id ) !== -1;
			},
		},
		methods: {
			isExpired,
			onShowModal() {
				this.showModal = true;
			},
			onAccept( userID, challengeID ) {
				this.$apollo.mutate( {
					mutation: acceptInvite,
					variables: {
						userID,
						challengeID,
					},
				} ).then( ( { data } ) => {
					this.$store.dispatch( 'setUser', data.acceptInvite );
					this.$apollo.queries.user.refetch( { id: userID } );
					this.$apollo.queries.challenge.refetch( { id: challengeID } );
				} );
			},
			onDelete() {
				const shouldDelete = confirm( 'Do you realy whant to delete this Challenge?' );
				if ( shouldDelete ) {
					this.$apollo.mutate( {
						mutation: deleteChallenge,
						variables: {
							id: this.$route.params.id,
						},
						update: ( store ) => {
							const result = store.readQuery( {
								query: allChallenges,
							} );
							const newData = result
								.allChallenges
								.filter( chal => chal._id !== this.$route.params.id );
							result.allChallenges = newData;
							store.writeQuery( {
								query: allChallenges,
								data: result,
							} );
						},
					} ).then( ( data ) => {
						console.log( data );
						this.$router.push( '/challenges' );
					} ).catch( ( error ) => {
						console.log( error );
					} );
				}
			},
		},
		apollo: {
			user() {
				return {
					query: user,
					variables: {
						id: this.$store.getters.currentUser._id,
					},
				};
			},
			challenge() {
				return {
					query: challenge,
					variables: {
						id: this.$route.params.id,
					},
				};
			},
			allUsers() {
				return {
					query: allUsers,
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

