import Vue from 'vue';

import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

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
} );

const apolloClient = new ApolloClient( {
	link: httpLink,
	cache: new InMemoryCache(),
	connectToDevTools: true,
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
