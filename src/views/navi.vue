<template>
  <div class="out-frame">

    </div>
    <!-- //! container end -->
</template>
<script>
import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.component("loading", Loading);

export default {
  data() {
    return {
      naviurl:'http://vue.sltung.com.tw/VUE/NAVI/RG/#/?back=-1&div_no='+this.$route.query.deptID+'&sd_no='+this.$route.query.sd_no,
      rgdsmList:[],
      isLoading: false,
      isbtn: null,
      dept: {
        deptID: null,
        deptName: null,
      },

      timer: null,
      timer30: null,
      //!src
      dept: {
        deptID: null,
        deptName: null,
        deptTim_zh: null,
      },
      //! 現在時間
      today: {
        time: null,
        date: null,
      },
      title: '',
      deptTime: null, //! 上午下午晚上
      lists: [], //! 存放看診資料
      isTable: true,
      opdprogressEsLists: [[], [], []], //! 存放看診資料
      resmessage: '',//回傳訊息
      divdrlist: {},
    };
  },
  created	() {
    this.routeClick()
  },
  methods: {
    routeClick() {
		// 通過此方法可以使用
		window.location.href = this.naviurl
	},
    jumpPage(str) {
      this.$router.push({
        path: str,
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer30);
  },
  computed: {},
};
</script>
<style scoped>
iframe{
      width: 100%;
      height: 800px;
    }
</style>>

