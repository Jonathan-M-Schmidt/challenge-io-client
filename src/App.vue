<template>
	<div
		id="app"
	>
		<div>
			<b-navbar
				type="dark"
				variant="secondary"
				toggleable
				class="mb-3">
				<b-navbar-toggle target="nav_dropdown_collapse"/>
				<b-collapse
					id="nav_dropdown_collapse"
					isNav>
					<b-navbar-nav>
						<b-nav-item to="/">Home</b-nav-item>
						<b-nav-item to="/about">About</b-nav-item>
						<b-nav-item
							v-if="isLoggedIn"
							to="/challenges">Challenges</b-nav-item>
						<b-nav-item-dropdown
							v-if="isLoggedIn"
							text="User"
							left>
							<b-dropdown-item to="/user">Account</b-dropdown-item>
							<b-dropdown-item
								@click="logout">
								Logout
							</b-dropdown-item>
						</b-nav-item-dropdown>
					</b-navbar-nav>
				</b-collapse>
			</b-navbar>
		</div>

		<div
			class="container">
			<router-view :key="$route.fullPath"/>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'App',
		computed: {
			isLoggedIn() {
				return this.$store.getters.isLoggedIn;
			},
		},
		methods: {
			logout() {
				this.$store.dispatch( 'logout' );
				this.$router.push( '/' );
			},
		},
	};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
