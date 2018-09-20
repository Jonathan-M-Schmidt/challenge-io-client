module.exports = {
	pwa: {
		themeColor: '#36afff',
		workboxPluginMode: 'GenerateSW',
    	workboxOptions: {
			clientsClaim: true,
			skipWaiting: true,
			navigateFallback: '/',
			cacheId: 'ch-io',
			runtimeCaching: [{
			  urlPattern: new RegExp('http://localhost'),
			  handler: 'cacheFirst',
			  options: {
				cacheableResponse: {
					statuses: [0, 200],
				  },
			  }
			}]
    	}
	}
}
