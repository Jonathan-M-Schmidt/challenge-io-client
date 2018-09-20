import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

export default new Vuex.Store( {
	state: {
		isLoggedIn: !!localStorage.getItem( 'token' ),
		user: JSON.parse( localStorage.getItem( 'user' ) ) || '',
	},
	mutations: {
		login( state ) {
			state.isLoggedIn = true;
		},
		logout( state ) {
			state.isLoggedIn = false;
			state.user = '';
		},
		setUser( state, user ) {
			state.user = user;
		},
	},
	actions: {
		login( { commit }, token ) {
			if ( localStorage ) {
				localStorage.setItem( 'token', token );
			}
			commit( 'login' );
		},
		logout( { commit } ) {
			if ( localStorage ) {
				localStorage.removeItem( 'token' );
				localStorage.removeItem( 'user' );
			}
			commit( 'logout' );
		},
		setUser( { commit }, user ) {
			const newUser = { ...this.state.user, ...user };
			if ( localStorage ) {
				localStorage.setItem( 'user', JSON.stringify( newUser ) );
			}
			commit( 'setUser', newUser );
		},
	},
	getters: {
		isLoggedIn: state => state.isLoggedIn,
		currentUser: state => state.user,
	},
} );
