<template>
	<ApolloQuery
		v-if="userId"
		:query="userQuery"
		:variables="{userId}"
	>
		<template slot-scope="{ result: {loading, error, data}}">
			<span v-if="loading">Loading...</span>
			<span v-else-if="error">Error: {{ error }}</span>
			<span v-else-if="data">
				<b-btn
					:to="'/user/' + data.user._id"
					class="m-1"
					size="sm"
				>
					{{ data.user.name }}
				</b-btn>
			</span>
			<span v-else>No result</span>
		</template>
	</ApolloQuery>
</template>

<script>
	import gql from 'graphql-tag';

	export default {
		name: 'UsersInChallenge',
		props: {
			userId: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				user: '',
				userQuery: gql`query ($userId: String!){
							user(id: $userId) {
								_id
								name
							}
						}`,
				$id: this.userId,
			};
		},
	};
</script>

<style lang="scss" scoped>

</style>
