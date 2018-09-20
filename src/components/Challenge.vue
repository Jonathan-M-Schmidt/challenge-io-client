<template>
	<div>
		<div
			v-if="challenge && !canEdit"
			class="container margin-footer">
			<i
				v-if="isAdmin"
				:class="collapseButtonClasses"
				@click="showCollapse = !showCollapse"/>
			<b-collapse
				v-if="isAdmin"
				id="collapse"
				v-model="showCollapse"
				visible>
				<b-alert
					show
					variant="success">
					You are the Admin for this Challenge.
				</b-alert>
				<div>
					<b-button
						size="sm"
						variant="danger"
						class="mr-2"
						@click="onDelete">
						Delete Challenge
					</b-button>
					<b-button
						size="sm"
						variant="outline-secondary"
						@click="canEdit = true">
						Edit Challenge
					</b-button>
					<hr>
				</div>
			</b-collapse>

			<b-badge
				v-if="isAccepted"
				pill
				variant="success">
				Accepted
			</b-badge>
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

		<!-- Edit Challenge -->
		<div
			v-if="canEdit && challenge"
			class="container">
			<b-form @submit="submitEdit">
				<b-form-group
					label="Title">
					<b-form-input
						:value="challenge.name"
						v-model="edit.name"
						type="text"/>
				</b-form-group>
				<b-form-group
					label="Banner Image">
					<b-form-input
						:value="challenge.bannerImg"
						v-model="edit.bannerImg"
						type="url"/>
				</b-form-group>
				<b-form-group
					label="Description">
					<b-form-textarea
						:value.prop="challenge.description"
						v-model="edit.description"
						:rows="3"/>

				</b-form-group>
				<p><i>To prevent unfair advantages it is not possible to change the dates.</i></p>
				<b-button
					type="submit"
					variant="primary"
					class="mr-2">
					Submit
				</b-button>
				<b-button
					@click="canEdit = false">
					cancel
				</b-button>
			</b-form>

		</div>

		<!-- Footer -->
		<div
			v-if="isAccepted"
			class="container-fluid score-footer">
			<div class="container footer-input">
				<b-form-input
					v-model="scoreValue"
					size="sm"
					type="number"
					class="mt-3 score-input"/>
				<b-button
					variant="success"
					size="sm"
					class="ml-2"
					@click="sendScore">
					Send Score
				</b-button>
			</div>
		</div>
	</div>
</template>

<script>
	import isExpired from '../helper/isExpired';
	import UserBtn from './UserBtn.vue';
	import UserSelection from './UserSelection.vue';
	import deleteChallenge from '../Mutations/deleteChallenge';
	import editChallenge from '../Mutations/editChallenge';
	import acceptInvite from '../Mutations/acceptInvite';
	import sendScore from '../Mutations/sendScore';
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
				showCollapse: true,
				send: false,
				canEdit: false,
				edit: {
					name: '',
					description: '',
					bannerImg: '',
				},
				scoreValue: 0,
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
			isAccepted() {
				if ( !this.user ) return '';
				const accepted = this.user.challenges.map( chal => chal.challenge_id );
				return accepted.indexOf( this.challenge._id ) !== -1;
			},
			collapseButtonClasses() {
				return this.showCollapse ? 'fas fa-arrow-circle-up' : 'fas fa-arrow-circle-down';
			},
			editedChallenge() {
				return this.edit;
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
			submitEdit( event ) {
				event.preventDefault();
				this.$apollo.mutate( {
					mutation: editChallenge,
					variables: {
						id: this.challenge._id,
						name: this.edit.name || this.challenge.name,
						description: this.edit.description || this.challenge.description,
						bannerImg: this.edit.bannerImg || this.challenge.bannerImg,
					},
				} ).then( ( ) => {
					this.$apollo.queries.challenge.refetch( { id: this.challenge._id } );
					this.canEdit = false;
				} ).catch( ( error ) => {
					console.log( error );
				} );
			},
			sendScore() {
				this.$apollo.mutate( {
					mutation: sendScore,
					variables: {
						userID: this.user._id,
						challengeID: this.challenge._id,
						score: this.scoreValue,
					},
				} ).then( () => {
					this.$apollo.queries.user.refetch( { id: this.user._id } );
				} ).catch( ( error ) => {
					console.log( error );
				} );
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

i.fas {
	cursor: pointer;
	display: block;
	margin-bottom: 10px;
	color: gray;
}

.score-footer {
	position: fixed;
	bottom: 0px;
	height: 70px;
	background: #eee;
}
.score-input {
	width: 50%;
	display: inline-block;
}
.margin-footer {
	margin-bottom: 80px;
}
</style>

