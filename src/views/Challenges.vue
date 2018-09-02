<template>
	<div>
		<b-button
			to="/create-challenge"
			variant="outline-success"
			size="sm"
			class="mb-4">
			Create a new Challenge
		</b-button>
		<h2>All Challenges:</h2>
		<p v-if="loading">
			Loading...
		</p>
		<div
			v-for="value in allChallenges"
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
	import allChallenges from '@/Queries/allChallenges';
	import isExpired from '../helper/isExpired';

	export default {
		name: 'Challenges',
		data() {
			return {
				allChallenges: '',
				loading: '',
			};
		},
		methods: {
			isExpired,
		},
		apollo: {
			// allChallenges: {
			// 	query: allChallenges,
			// 	manual: true,
			// 	result( { data, loading } ) {
			// 		if ( loading ) {
			// 			this.loading = true;
			// 		} else {
			// 			this.challenges = data.allChallenges;
			// 		}
			// 	},
			// },
			allChallenges() {
				return {
					query: allChallenges,
					fetchPolicy: 'cache-and-network',
				};
			},
		},
	};
</script>

<style>

</style>
