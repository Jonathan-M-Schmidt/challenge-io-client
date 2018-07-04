/* TODO: Refactor Friend-Card to seperate component
and move Friends.vue to view folder */
<template>
	<div>
		<h2>Friends:</h2>
		<b-card-group deck>
			<b-card
				v-for="friend in friends.slice(0, showItemCount)"
				:key="friend.name"
				:subTitle="friend.email"
				:title="friend.name"
				tag="article"
				style="max-width: 13rem; min-width: 13rem;"
				class="mb-2">
				<b-img
					:src="friend.img"
					fluid/>
				<p class="card-text">
					{{ friend.bio }}
				</p>
				<b-button
					class="mr-2 mb-2"
					href="#"
					variant="primary">Open Chat
				</b-button>
				<b-button
					class="mr-2 mb-2"
					href="#"
					variant="warning">Unfriend
				</b-button>
			</b-card>
		</b-card-group>
		<b-button
			v-if="showMore"
			size="small"
			@click="handleShowMore"
		>
			show more
		</b-button>
	</div>
</template>

<script>
	import friends from '@/mockData/friends.json';

	export default {
		name: 'Friends',
		data() {
			return {
				friends,
				showItemCount: 3,
				showMore: true,
			};
		},
		methods: {
			handleShowMore() {
				this.showItemCount += this.showItemCount;
				if ( this.showItemCount >= this.friends.length ) {
					this.showMore = false;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
#user-img {
	width: 75px;
	height: 75px
}
</style>
