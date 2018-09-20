import Vue from 'vue';

import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import fetch from 'unfetch';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

const httpLink = new HttpLink( {
	uri: 'http://localhost:3000/graphql',
	fetch,
} );

const authLink = setContext( ( _, { headers } ) => {
	const token = localStorage.getItem( 'token' );
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${ token }` : '',
		},
	};
} );

const cache = new InMemoryCache();

const apolloClient = new ApolloClient( {
	link: authLink.concat( httpLink ),
	cache,
	connectToDevTools: true,
} );

persistCache( {
	cache,
	storage: window.localStorage,
} );

Vue.use( VueApollo );
Vue.use( BootstrapVue );

const apolloProvider = new VueApollo( {
	defaultClient: apolloClient,
} );

new Vue( {
	router,
	store,
	provide: apolloProvider.provide(),
	render: h => h( App ),
} ).$mount( '#app' );
