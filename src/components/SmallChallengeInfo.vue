<template>
	<div v-if="challenge">
		<b-card
			:title="challenge.name"
			:imgSrc="challenge.bannerImg"
			imgTop
			class="mb-4"
			style="max-width: 80%">
			<b-button
				size="sm"
				variant="success"
				class="mb-4 float-right">
				Accept
			</b-button>
		</b-card>

	</div>
</template>

<script>
	import challenge from '../Queries/challenge';

	export default {
		name: 'SmallChallengeInfo',
		props: {
			id: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				challenge: '',
			};
		},
		apollo: {
			challenge() {
				return {
					query: challenge,
					variables: {
						id: this.id,
					},
				};
			},
		},
	};
</script>

