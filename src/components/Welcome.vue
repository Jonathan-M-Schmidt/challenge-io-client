<template>
	<div class="hello">
		<h2>{{ currentUserName ?
			'Hello ' + currentUserName + ', welcome back!':
		'Welcome to Challenge-io, please register or log in to continue.' }}</h2>
		<SignUp v-if="!isLoggedIn"/>
		<hr>
		<p>If you are new here and don't know what this site is about,
		take a look at the <b-link to="/about">About</b-link> page.</p>
	</div>
</template>

<script>
	import SignUp from '@/components/SignUp';

	export default {
		name: 'Welcome',
		components: {
			SignUp,
		},
		props: {
			msg: {
				type: String,
				default: 'Hello',
			},
		},
		computed: {
			isLoggedIn() {
				return this.$store.getters.isLoggedIn;
			},
			currentUserName() {
				const { name } = this.$store.getters.currentUser;
				if ( !name ) return '';
				return name;
			},
		},
	};
</script>

