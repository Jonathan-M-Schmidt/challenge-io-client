<template>
	<div>
		<b-form
			class="mb-4"
			@submit="onSubmit">
			<b-form-group >
				<b-form-checkbox-group
					v-model="selectedUsers">
					<b-form-checkbox
						v-for="user in users"
						:key="user._id"
						:value="user._id"
						class="m-1"
					>
						{{ user.name }}
					</b-form-checkbox>
				</b-form-checkbox-group>
			</b-form-group>
			<b-button
				type="submit"
				variant="primary">
				Select
			</b-button>
		</b-form>
		<b-alert
			v-if="errors"
			variant="warning"
			show>
			{{ errors }}
		</b-alert>
	</div>
</template>

<script>
	import inviteUsersToChallenge from '../Mutations/inviteUsersToChallenge';

	export default {
		name: 'UserSelection',
		props: {
			users: {
				type: Array,
				default: () => [],
			},
			challengeID: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				selectedUsers: [],
				errors: '',
			};
		},
		methods: {
			onSubmit( event ) {
				event.preventDefault();
				if ( this.selectedUsers.length === 0 ) {
					this.errors = 'No Users selected.';
				} else {
					this.errors = '';
					this.$emit( 'close-modal' );
					this.$apollo.mutate( {
						mutation: inviteUsersToChallenge,
						variables: {
							users: this.selectedUsers,
							challengeID: this.challengeID,
						},
					} ).then( ( { data } ) => {
						console.log( data );
					} ).catch( ( error ) => {
						console.log( error );
					} );
				}
			},
		},
	};
</script>
