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
			<b-form-group id="exampleGroup4">
				<b-form-checkbox-group
					id="exampleChecks"
					v-model="form.checked">
					<b-form-checkbox value="me">Check me out</b-form-checkbox>
					<b-form-checkbox value="that">Check that out</b-form-checkbox>
				</b-form-checkbox-group>
			</b-form-group>
			<b-button
				class="mr-2"
				type="submit"
				variant="primary">Submit</b-button>
			<b-button
				type="reset"
				variant="danger">Reset</b-button>
		</b-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					email: '',
					name: '',
					password: '',
					checked: [],
				},
				show: true,
			};
		},
		methods: {
			onSubmit( evt ) {
				evt.preventDefault();
				alert( JSON.stringify( this.form ) );
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
