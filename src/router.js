import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import About from './views/About.vue';
import SignUp from './components/SignUp.vue';
import Friends from './components/Friends.vue';
import Challenge from './components/Challenge.vue';
import Challenges from './components/Challenges.vue';
import UserInfo from './views/UserInfo.vue';

Vue.use( Router );

export default new Router( {
	routes: [
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
			path: '/signup',
			name: 'signup',
			component: SignUp,
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
		},
		{
			path: '/challenge/:id',
			name: 'challenge',
			component: Challenge,
		},
		{
			path: '/user/:id',
			name: 'userinfo',
			component: UserInfo,
		},
	],
} );
