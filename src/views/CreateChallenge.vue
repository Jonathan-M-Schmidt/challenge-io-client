<template>
	<div class="container">
		<h2>Create a new Challenge:</h2>
		<b-form @submit="onCreate">
			<b-form-group
				id="challenge-title-input-group"
				label="Challenge Title:"
				labelFor="challenge-title-input">
				<b-form-input
					id="challenge-title-input"
					v-model="form.title"
					type="text"
					required
					placeholder="Enter a Title"/>
			</b-form-group>
			<b-form-group
				id="challenge-url-input-group"
				label="Background Image:"
				labelFor=""
				description="If you leave this blank, a default image will be chosen.">
				<b-form-input
					id="challenge-url-input"
					v-model="form.url"
					type="url"
					placeholder="Enter a URL for a fitting banner image"/>
			</b-form-group>
			<b-form-group
				id="challenge-start-input-group"
				label="Start Date:"
				labelFor="challenge-start-input">
				<b-form-input
					id="challenge-start-input"
					v-model="form.dateStart"
					type="date"
					required
					placeholder="Choose a starting date"/>

			</b-form-group>
			<b-form-group
				id="challenge-end-input-group"
				label="End Date:"
				labelFor="challenge-end-input">
				<b-form-input
					id="challenge-end-input"
					v-model="form.dateEnd"
					type="date"
					required
					placeholder="Choose an end date"/>
			</b-form-group>
			<b-form-group
				id="challenge-desc-input-group"
				label="Challenge Description:"
				labelFor="challenge-desc-input">
				<b-form-textarea
					id="challenge-desc-input"
					v-model="form.desc"
					:rows="4"
					required
					placeholder="Enter a fitting description for your Challenge"/>
			</b-form-group>
			<b-button
				type="submit"
				variant="primary">
				Create
			</b-button>
		</b-form>
	</div>
</template>

<script>
	import createChallenge from '@/Mutations/createChallenge';

	export default {
		name: 'CreateChallenge',
		data() {
			return {
				form: {
					title: '',
					adminID: '',
					dateStart: '',
					dateEnd: '',
					desc: '',
				},
			};
		},
		methods: {
			onCreate( event ) {
				event.preventDefault();
				this.form.adminID = this.$store.getters.currentUser.user._id;

				this.$apollo.mutate( {
					mutation: createChallenge,
					variables: this.form,
				} ).then( ( data ) => {
					console.log( data );
				} ).catch( ( error ) => {
					console.log( error );
				} );
			},
		},
	};
</script>

