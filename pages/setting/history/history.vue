<template>
	<view>
		<button @click="getFileList()">file List</button>
		<view v-for="file in fileList">
			<view >{{file.filePath}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList:[]
			}
		},
		methods: {
			getFileList(){
				const that = this;
				uni.getSavedFileList({
				  success: function (res) {
				    console.log('私有目录文件列表', JSON.stringify(res.fileList));
					that.fileList = res.fileList
				  },
				  fail: function (err) {
				    console.error('获取文件列表失败', err);
				  }
				});
			}
		
		}
	}
</script>

<style>

</style>
