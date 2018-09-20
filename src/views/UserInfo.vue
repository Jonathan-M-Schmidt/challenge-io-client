<template>
	<div class="container">
		<div v-if="user">
			<h1>{{ user.name }}</h1>
			<h4>{{ user.email }}</h4>
			<hr class="my-2">
			<span v-if="isCurrentUser">
				<h4><span
					:class="collapseButtonClasses"
					@click="showCollapse = !showCollapse"/> Options:</h4>
				<b-collapse
					id="userCollapse"
					v-model="showCollapse">
					<p>Push-Notifications: {{ user.options.push_notifications }}</p>
					<p>No Friends as Rivals: {{ user.options.allow_no_friend_rivals }}</p>
				</b-collapse>
				<hr>
			</span>
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

			<span v-if="isCurrentUser">
				<h4>Challenges invited to: {{ user.challengeInvites.length }} </h4>
				<SmallChallengeInfo
					v-for="challenge in user.challengeInvites"
					:key="challenge"
					:id="challenge"
					@on-accept="onAccept(user._id, challenge)"/>
			</span>

			<h4>Accepted Challenges: {{ user.challenges.length }}</h4>

			<ul>
				<li
					v-for="challenge in challengesWithScores"
					:key="challenge._id">
					<p>{{ challenge.name }}
						<b-button
							:to="/challenge/ + challenge._id"
							size="sm"
							variant="link">
							More Info
						</b-button>
					</p>
					<p>Score: {{ challenge.total_score }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import UserBtn from '../components/UserBtn.vue';
	import SmallChallengeInfo from '../components/SmallChallengeInfo.vue';
	import user from '../Queries/user';
	import challengesAsAdmin from '../Queries/challengesAsAdmin';
	import challenges from '../Queries/challenges';
	import acceptInvite from '../Mutations/acceptInvite';

	export default {
		name: 'UserInfo',
		components: {
			UserBtn,
			SmallChallengeInfo,
		},
		data() {
			return {
				user: '',
				id: this.$route.params.id,
				error: '',
				acceptedChallenges: '',
				showCollapse: false,
			};
		},
		computed: {
			isCurrentUser() {
				return this.id === this.$store.getters.currentUser._id;
			},
			challengeIDs() {
				if ( !this.user ) return [];
				return this.user.challenges.map( challenge => challenge.challenge_id );
			},
			challengesWithScores() {
				if ( !this.acceptedChallenges || !user ) return '';
				return this.acceptedChallenges.map( ( challenge ) => {
					const index =
						this.user.challenges.findIndex( chal => chal.challenge_id === challenge._id );
					return { ...challenge, ...this.user.challenges[ index ] };
				} );
			},
			collapseButtonClasses() {
				return this.showCollapse ? 'fas fa-arrow-circle-up' : 'fas fa-arrow-circle-down';
			},
		},
		methods: {
			onAccept( userID, challengeID ) {
				this.$apollo.mutate( {
					mutation: acceptInvite,
					variables: {
						userID,
						challengeID,
					},
				} ).then( ( ) => {
					this.$apollo.queries.user.refetch( { id: userID } );
				} );
			},
		},
		apollo: {
			user() {
				return {
					query: user,
					variables: {
						id: this.id,
					},
					fetchPolicy: 'cache-and-network',
					error( error ) {
						if ( error.graphQLErrors ) {
							const errMsg = error.graphQLErrors[ 0 ].message;
							if ( errMsg === 'invalid token' ) {
								this.$store.dispatch( 'logout' );
								this.$router.push( '/' );
							}
						}
					},
					result( { loading } ) {
						if ( !loading ) {
							this.$apollo.query( {
								query: challenges,
								variables: {
									ids: this.challengeIDs,
								},
							} ).then( ( result ) => {
								this.acceptedChallenges = result.data.challenges;
							} );
						}
					},
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
