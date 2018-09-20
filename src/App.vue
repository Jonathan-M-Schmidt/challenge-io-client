<template>
	<div
		id="app"
		class="mb-2"
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
							to="/challenges">
							Challenges
						</b-nav-item>
						<b-nav-item-dropdown
							v-if="isLoggedIn && currentUser"
							:text="currentUser.name"
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
		<!-- <Loading v-if="!$apollo.data"/> -->
		<div>
			<div
				v-if="$route.path === '/'"
				class="logo">
				<h1 >Challenge
				<span class="serif">IO</span></h1>
			</div>
			<b-btn
				v-if="$route.path !== '/'"
				variant="outline-primary"
				size="sm"
				class="mb-1 ml-2"
				@click="goBack">

				Back
			</b-btn>
			<Badge v-if="isLoggedIn && $route.name !== 'userinfo'"/>
			<hr v-if="$route.path !== '/'">
			<router-view
				:key="$route.fullPath"
			/>
		</div>
	</div>
</template>

<script>
	import Loading from './components/Loading.vue';
	import Badge from './components/Badge.vue';

	export default {
		name: 'App',
		components: {
			Loading,
			Badge,
		},
		data() {
			return {
				user: this.currentUser,
				error: '',
				showBadge: false,
			};
		},
		computed: {
			isLoggedIn() {
				return this.$store.getters.isLoggedIn;
			},
			currentUser() {
				return this.$store.getters.currentUser;
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
			currentUser() {
				this.user = this.currentUser;
			},
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

.serif {
	font-family: 'Times New Roman', Times, serif;
}
.logo h1{
	background-image: linear-gradient(to top right, #36afff, #dd35ff);
	color: white;
	font-size: 3.75em;
	width: 100vw;
	height: 35vh;
	margin-bottom: 25px;
	margin-top: 35px;
	padding: 25px;
	text-align: center;
}
</style>
