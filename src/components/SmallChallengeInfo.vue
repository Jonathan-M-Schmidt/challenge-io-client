<template>
	<div v-if="challenge">
		<b-card
			:title="challenge.name"
			:imgSrc="challenge.bannerImg"
			imgTop
			class="mb-4"
			style="max-width: 80%">
			<b-button
				:to="/challenge/ + challenge._id"
				size="sm"
				variant="link">
				More Info
			</b-button>
			<b-button
				size="sm"
				variant="success"
				class="mb-4 float-right"
				@click="onAccept">
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
		methods: {
			onAccept() {
				this.$emit( 'on-accept' );
			},
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

