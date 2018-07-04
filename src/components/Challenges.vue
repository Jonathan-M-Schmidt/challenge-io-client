<template>
	<div>
		<h2>All Challenges:</h2>
		<p v-if="loading"/>
		<div
			v-for="value in challenges"
			:key="value._id"
		>
			<b-jumbotron
				:header="value.name"
			>
				<h4>{{ value.description }}</h4>
				<hr class="my-4">
				<p>
					<strong class="bold">
						From:
					</strong>
					{{ new Date(value.dateFrom).toLocaleDateString() }}
				</p>
				<p>
					<strong class="bold">
						Till:
					</strong>
					{{ new Date(value.dateTill).toLocaleDateString() }}
				</p>
				<p v-if="isExpired(value.dateTill)">
					<i>Challenge allready expired</i>
				</p>
				<b-button
					:to="`/challenge/${value._id}`"
					variant="primary">
					Details
				</b-button>
			</b-jumbotron>
		</div>
	</div>
</template>

<script>
	// import challenges from '@/mockData/challenges.json';
	import allChallenges from '@/Queries/allChallenges';
	import isExpired from './helper/isExpired';

	export default {
		name: 'Challanges',
		data() {
			return {
				challenges: '',
				loading: '',
			};
		},
		methods: {
			isExpired,
		},
		apollo: {
			allChallenges: {
				query: allChallenges,
				manual: true,
				result( { data, loading } ) {
					if ( loading ) {
						this.loading = true;
					} else {
						this.challenges = data.allChallenges;
					}
				},
			},
		},
	};
</script>

<style>

</style>
