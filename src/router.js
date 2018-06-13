import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import About from './views/About.vue';
import SignUp from './components/SignUp.vue';
import UserInfo from './components/UserInfo.vue';
import Challenge from './components/Challenge.vue';
import Challenges from './components/Challenges.vue';

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
			path: '/userinfo',
			name: 'user',
			component: UserInfo,
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
	],
} );
