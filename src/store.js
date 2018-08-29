import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

export default new Vuex.Store( {
	state: {
		isLoggedIn: !!localStorage.getItem( 'token' ),
		userID: localStorage.getItem( 'userID' ) || '',
		userEmail: localStorage.getItem( 'userEmail' ) || '',
		userName: localStorage.getItem( 'userName' ) || '',

	},
	mutations: {
		login( state ) {
			state.isLoggedIn = true;
		},
		logout( state ) {
			state.isLoggedIn = false;
			state.userID = '';
			state.userEmail = '';
			state.userName = '';
		},
		setUser( state, user ) {
			state.userID = user._id;
			state.userEmail = user.email;
			state.userName = user.name;
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
				localStorage.removeItem( 'userID' );
				localStorage.removeItem( 'userEmail' );
				localStorage.removeItem( 'userName' );
			}
			commit( 'logout' );
		},
		setUser( { commit }, user ) {
			if ( localStorage ) {
				localStorage.setItem( 'userID', user._id );
				localStorage.setItem( 'userEmail', user.email );
				localStorage.setItem( 'userName', user.name );
			}
			commit( 'setUser', user );
		},
	},
	getters: {
		isLoggedIn: state => state.isLoggedIn,
		currentUser: state => ( {
			user: {
				_id: state.userID,
				email: state.userEmail,
				name: state.userName,
			},
		} ),
	},
} );
