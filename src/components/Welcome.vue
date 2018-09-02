<template>
	<div class="hello">
		<h2>{{ currentUserName ?
			'Hello there, ' + currentUserName :
		'Welcome to Challenge-io, please register or log in to continue.' }}</h2>
		<SignUp v-if="!isLoggedIn"/>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
