<template>
  <view class="content ">
    <uni-breadcrumb>
      <view> Paramenter ID：</view>
      <uni-breadcrumb-item v-for="(id,index) in taskIDs" :key="index">
        <view class="breadcrumb"> {{ id }}</view>
      </uni-breadcrumb-item>
    </uni-breadcrumb>
    <view class="list" v-for="node in tree" :key="node.id" @click="handleClick(node)">
      <view class="list-item">{{ node.name }}
        <view v-if="node.value">
          <uni-number-box v-model="node.value" :min="0" :max="9" :step=".1" background="red" color="white"></uni-number-box>
        </view>
      </view>
    </view>
    <view class="backBtnWarp">
      <button class="backBtn" v-if="this.taskIDs.length > 1 " @click="backTask()">Back</button>
    </view>
    <uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
             :direction="direction" @trigger="trigger"/>
    <view>
      <button @click="showDrawer" type="primary">右侧弹出 显示Drawer</button>
      <uni-drawer ref="showRight" mode="right" :mask-click="false">
        <scroll-view style="height: 100%;" scroll-y="true">
          <button @click="closeDrawer" type="primary">关闭Drawer</button>
          <view v-for="item in 60" :key="item">可滚动内容 {{ item }}</view>
        </scroll-view>
      </uni-drawer>
    </view>
  </view>
</template>

<script>
import UniFab from "../../uni_modules/uni-fab/components/uni-fab/uni-fab.vue";
import {
  downloadTask,
  readFile
} from "../../utils/file.js";
import UniBreadcrumb from "../../uni_modules/uni-breadcrumb/components/uni-breadcrumb/uni-breadcrumb.vue";
import UniBreadcrumbItem from "../../uni_modules/uni-breadcrumb/components/uni-breadcrumb-item/uni-breadcrumb-item.vue";

export default {
  components: {
    UniBreadcrumb,
    UniFab,
    UniBreadcrumbItem
  },
  data() {
    return {
      title: 'Hello',
      csvContent: '',
      horizontal: 'right',
      vertical: 'bottom',
      direction: 'vertical',
      taskIDs: [],
      taskTree: [],
      pattern: {
        color: '#ffffff',
        backgroundColor: '#ff000f',
        selectedColor: '#ff0000',
        buttonColor: '#ff0000',
        iconColor: '#fff'
      },
      content: [{
        iconPath: '/static/saoma.png',
        selectedIconPath: '/static/saoma-active.png',
        text: 'Scan',
        active: false
      },
        {
          iconPath: '/static/lishi.png',
          selectedIconPath: '/static/lishi-active.png',
          text: 'History',
          active: false
        },
        {
          iconPath: '/static/shezhi.png',
          selectedIconPath: '/static/shezhi-active.png',
          text: 'Setting',
          active: false
        }
      ],
      tree: [{
        id: "1",
        parent_id: "",
        name: "Main menu",
        children: [{
          id: "4",
          parent_id: "1",
          name: "Motor",
          children: [{
            id: "4.1",
            parent_id: "4",
            name: "Status",
            isQuickMenu: false,
            inQuickMenu: false,
            children: [{
              id: "4.1.1",
              parent_id: "4.1",
              name: "Motor Current",
              children: [],
              isQuickMenu: false,
              inQuickMenu: false
            },
              {
                id: "4.1.2",
                parent_id: "4.1",
                name: "Motor Current2",
                children: [],
                isQuickMenu: false,
                inQuickMenu: false
              }
            ],
          }],
        }]
      }, {
        id: "2",
        parent_id: "",
        name: "Main menu1",
        children: [{
          id: "4",
          parent_id: "2",
          name: "Motor",
          children: [{
            id: "4.1",
            parent_id: "4",
            name: "Status",
            isQuickMenu: false,
            inQuickMenu: false,
            children: [{
              id: "4.1.1",
              parent_id: "4.1",
              name: "Motor Current",
              children: [],
              isQuickMenu: false,
              inQuickMenu: false,
              value: 123
            },
              {
                id: "4.1.2",
                parent_id: "4.1",
                name: "Motor Current2",
                children: [],
                isQuickMenu: false,
                inQuickMenu: false,
                value: 45
              }
            ],
          }],
        }]
      }]
    }

  },
  onLoad() {
    this.taskIDs.push(0);
    this.taskTree.push([...this.tree])
  },

  onBackPress() {
    if (this.$refs.fab.isShow) {
      this.$refs.fab.close()
      return true
    }
    return false
  },
  methods: {
    showDrawer() {
      this.$refs.showRight.open();
    },
    closeDrawer() {
      this.$refs.showRight.close();
    },
    backTask() {
      this.taskIDs.pop();
      this.taskTree.pop();
      this.tree = this.taskTree[this.taskTree.length - 1];
    },
    handleClick(node) {
      if (node.children.length > 0) {
        console.log('点击第一层', node.id);
        this.taskIDs.push(node.id);
        this.taskTree.push([...node.children]);
        this.tree = [...node.children];
      }
    },
    downloadAndSaveFile(fileUrl) {
      const that= this;
      // 发送HTTP请求获取文件数据
      downloadTask(fileUrl).onProgressUpdate((res) => {
        console.log('下载进度' + res.progress);
        // console.log('已经下载的数据长度' + res.totalBytesWritten);
        // console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
        // 满足测试条件，取消下载任务。

      });
    },
    scanQRCode() {
      uni.scanCode({
        scanType: ['qrCode'],
        autoDecodeCharset: true,
        success: (res) => {
          console.log(res);
          const fileUrl = res.result;
          this.downloadAndSaveFile(fileUrl);
        },
        fail: (error) => {
          console.error('扫码失败', error);
        }
      });
    },
    trigger(e) {
      console.log(e);
      if (e.item.text === 'Scan') {
        this.scanQRCode();
      }
      if (e.item.text === 'Setting') {
        uni.navigateTo({
          url: 'pages/setting/setting'
        });
      }
      this.content[e.index].active = !e.item.active
    },
  }
}
</script>

<style lang="scss">


.itemSeparator {
  background-color: aqua;
  width: auto;
  height: auto;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-image: url('../../static/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
}

.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.list-item {
  color: white;
  font-size: 36rpx;
  font-weight: 500;
  border-bottom: 2rpx solid #fff;
  padding: 16rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.text-area {
  display: flex;
  justify-content: center;
  background-color: darkred;
}

.title {
  font-size: 36rpx;
  color: dimgray;
  background-color: red;
}

.warp {
  padding: 10px;
}

.button {
  margin-bottom: 10px;
}

.breadcrumb {
  color: white !important;
  font-size: 36rpx;
}

.backBtnWarp {
  display: flex;
  justify-content: flex-end;
}

.backBtn {
  color: white;
  background-color: red;
  margin: 10px 20rpx 30rpx 40rpx;
  transform: scale(.8);
}

.uni-numbox {
  uni-numbox__minus,
  uni-numbox-btns {
  }
}
</style>