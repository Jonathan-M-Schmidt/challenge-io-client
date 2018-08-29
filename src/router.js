import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import About from './views/About.vue';
import Friends from './components/Friends.vue';
import Challenge from './components/Challenge.vue';
import Challenges from './views/Challenges.vue';
import CreateChallenge from './views/CreateChallenge.vue';
import UserInfo from './views/UserInfo.vue';
import NotFound from './views/NotFound.vue';

import store from './store';

Vue.use( Router );

const authBeforeEnter = ( ( to, from, next ) => {
	if ( !store.getters.isLoggedIn ) {
		next( '/' );
	}
	next();
} );

const router = new Router( {
	mode: 'history',
	routes: [
		{
			path: '*',
			component: NotFound,
		},
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/about',
			name: 'about',
			component: About,
		},
		{
			path: '/friends',
			name: 'user',
			component: Friends,
		},
		{
			path: '/challenges',
			name: 'challenges',
			component: Challenges,
			beforeEnter: authBeforeEnter,
		},
		{
			path: '/challenge/:id',
			name: 'challenge',
			component: Challenge,
			beforeEnter: authBeforeEnter,
		},
		{
			path: '/create-challenge',
			name: 'create-challenge',
			component: CreateChallenge,
			beforeEnter: authBeforeEnter,
		},
		{
			path: '/user',
			name: 'userinfo',
			component: UserInfo,
			beforeEnter: authBeforeEnter,
		},
	],
} );

export default router;
