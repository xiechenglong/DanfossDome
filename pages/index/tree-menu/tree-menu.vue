<template>
	<view class="content">
		<view>{{nodeTree}}</view>
		<view class="list" v-for="node in nodeTree" :key="node.id" @click="handleClick(node)">
			<view class="list-item">{{ node.name }}
				<view v-if="node.value">
					<uni-number-box v-model="node.value" :min="0" :max="9" :step=".1" @change="change()" background="red" color="white"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
    props: {
      tree: {
        id: String,
        default: () => 0
      }
    },
		data() {
			return {
				nodeTree: [], // 节点树
			}
		},
		mounted() {
			const that = this;
			window.test = this
			uni.$on('update', function(data) {
				console.log('监听到事件来自 update ，携带参数 msg 为：' + JSON.stringify(data.msg));
        that.nodeTree = JSON.parse(JSON.stringify(data.msg))
				// setTimeout(() => {
				// 	// that.nodeTree = JSON.parse(JSON.stringify(data.msg))
				// 	that.$set(that, 'nodeTree', data.msg)
				// 	console.log(that.nodeTree);
				// 	that.$forceUpdate()
				// }, 500);
			});
		},
		methods: {
			handleClick() {
				console.log('handleClick');
			},
			change() {
				console.log('change');
			}
		}
	}
</script>

<style>
	page {
		background-image: url('../../../static/bg.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.list {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.list-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		color: white;
		font-size: 36rpx;
		font-weight: 500;
		border-bottom: 2rpx solid #fff;
		/* 设置底部边框的样式、宽度和颜色 */
		padding: 16rpx;
	}

	.uni-numbox {
		background-color: rgba(0, 0, 0, 0.5);

		uni-numbox__minus,
		uni-numbox-btns {
			color: greenyellow !important;
			background-color: burlywood !important;
		}
	}
</style>