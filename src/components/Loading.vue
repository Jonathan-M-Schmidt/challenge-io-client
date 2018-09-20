<template>
	<div class="loading">
		Loading <span class="fas fa-spin fa-spinner fa-2x"/>
	</div>
</template>

<script>
	export default {
		name: 'Loading',
	};
</script>

<style scoped>
.loading{
	width:200px;
	height:90px;
	text-align: center;
	line-height: 90px;
	border-radius: 5px;
	background: rgba(0, 0, 0, 0.5);
	color: white;
	position: fixed;
	top: 10%;
	left: 50%;
	transform: translateX(-50%);
	z-index: 100;
}
</style>
