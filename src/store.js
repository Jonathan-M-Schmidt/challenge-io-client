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
			const newUser = { ...state.user, ...user };
			state.user = newUser;
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
			if ( localStorage ) {
				const newUser = { ...this.state.user, ...user };
				localStorage.setItem( 'user', JSON.stringify( newUser ) );
			}
			commit( 'setUser', user );
		},
	},
	getters: {
		isLoggedIn: state => state.isLoggedIn,
		currentUser: state => state.user,
	},
} );
