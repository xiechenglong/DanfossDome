<template>
	<view>
    Quick menu name:<input type="text" v-model="quickMenuName" />
	</view>
</template>

<script>
	export default {
    props: {
      quickMenuName: {
        type: String,
        default: 'Quick Menu'
      }
    },
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
