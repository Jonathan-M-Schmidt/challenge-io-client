<template>
	<div>
		<b-form
			v-if="show"
			@submit="onSubmit"
			@reset="onReset">
			<b-form-group
				id="input-group-name"
				label="Your Name:"
				labelFor="input-name">
				<b-form-input
					id="input-name"
					v-model="form.name"
					type="text"
					required
					placeholder="Enter name"/>
			</b-form-group>
			<b-form-group
				id="input-group-email"
				label="Email address:"
				labelFor="input-email"
				description="We'll never share your email with anyone else.">
				<b-form-input
					id="input-email"
					v-model="form.email"
					type="email"
					required
					placeholder="Enter email"/>
			</b-form-group>
			<b-form-group
				id="input-group-password"
				label="Password:"
				labelFor="input-password">
				<b-form-input
					id="input-password"
					v-model="form.password"
					type="password"
					required
					placeholder="Enter Password"/>
			</b-form-group>
			<b-button
				class="mr-2"
				type="submit"
				variant="primary">Submit</b-button>
			<b-button
				type="reset"
				variant="danger">Reset</b-button>
		</b-form>
		<h3 v-if="response">
			{{ response }}
		</h3>
	</div>
</template>

<script>
	import signUp from '@/Mutations/signUp.js';

	export default {
		data() {
			return {
				form: {
					email: '',
					name: '',
					password: '',
				},
				show: true,
				response: '',
			};
		},
		methods: {
			onSubmit( evt ) {
				evt.preventDefault();
				const { email, name, password } = this.form;

				this.$apollo.mutate( {
					mutation: signUp,
					variables: {
						email,
						name,
						password,
					},
				} ).then( ( { data } ) => {
					if ( localStorage ) {
						localStorage.setItem( 'token', data.userCreate.token );
					}
					this.show = false;
					this.response = `Hello ${ data.userCreate.user.name },
					thank you for creating an account!`;
				} ).catch( ( error ) => {
					console.log( error );
					this.form.email = email;
					this.form.name = name;
				} );
			},
			onReset( evt ) {
				evt.preventDefault();
				this.form.email = '';
				this.form.name = '';
				this.form.password = '';
				this.form.checked = [];
				/* Trick to reset/clear native browser form validation state */
				this.show = false;
				this.$nextTick( () => { this.show = true; } );
			},
		},
	};
</script>
