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

				<b-navbar-brand
					to="/">
					Challenge-IO
				</b-navbar-brand>
				<b-collapse
					id="nav_dropdown_collapse"
					isNav>
					<b-navbar-nav class="ml-auto">
						<b-nav-item to="/">Home</b-nav-item>
						<b-nav-item to="/about">About</b-nav-item>
						<b-nav-item
							v-if="isLoggedIn"
							to="/challenges">Challenges</b-nav-item>
						<b-nav-item-dropdown
							v-if="isLoggedIn"
							text="User"
							right>
							<b-dropdown-item
								:to="/user/ + $store.getters.currentUser._id">
								Account
							</b-dropdown-item>
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
			<b-btn
				v-if="$route.path !== '/'"
				variant="outline-primary"
				size="sm"
				class="mb-1"
				@click="goBack">

				Back
			</b-btn>
			<b-badge
				v-if="showBadge && $route.name !== 'userinfo'"
				id="invites"
				:to="/user/ + $store.getters.currentUser._id"
				variant="primary"
				class="float-right"
				pill>
				Invites: {{ user.challengeInvites.length || 0 }}
			</b-badge>
			<hr v-if="$route.path !== '/'">
			<router-view :key="$route.fullPath"/>
		</div>
	</div>
</template>

<script>
	import userQuery from './Queries/user';

	export default {
		name: 'App',
		data() {
			return {
				user: '',
				error: '',
				showBadge: false,
			};
		},
		computed: {
			isLoggedIn() {
				return this.$store.getters.isLoggedIn;
			},
		},
		watch: {
			user() {
				if ( this.user ) {
					this.showBadge = true;
				} else {
					this.showBadge = false;
				}
			},
		},
		updated() {
			if ( this.isLoggedIn ) {
				this.$apollo.queries.user.refetch( { id: this.$store.getters.currentUser._id } );
			}
		},
		methods: {
			logout() {
				this.$store.dispatch( 'logout' );
				this.$router.push( '/' );
				this.user = '';
			},
			goBack() {
				this.$router.go( -1 );
			},
		},
		apollo: {
			user() {
				// if ( this.isLoggedIn ) {
				return {
					query: userQuery,
					variables: {
						id: this.$store.getters.currentUser._id,
					},
					error( error ) {
						this.error = error;
						console.log( error );
					},
				};
				// }
				// return '';
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
#invites {
	position: fixed;
	top:65px;
	right:15px;
}
</style>
