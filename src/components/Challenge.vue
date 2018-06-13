<template>
	<div>
		<h1>{{ challenge.name }}</h1>
		<b-img
			:src="challenge.bannerImg"
			fluid/>
		<hr class="my-4 mt-4">
		<p>{{ challenge.description }}</p>
	</div>
</template>

<script>
	import challenges from '@/mockData/challenges.json';

	export default {
		name: 'Challange',
		computed: {
			challenge() {
				const challenge = challenges.filter( ( ch ) => {
					if ( ch._id === this.$route.params.id ) {
						return ch;
					}
					return null;
				} );
				return challenge[ 0 ];
			},
		},
	};
</script>
