<template>
  <div class="out-frame">
    <loading :active.sync="isLoading"> </loading>
    <head-component :reloadnum="reloadnum" @noon="getNoon"></head-component>
    <div>
      <div
        v-if="isTable == false"
        style="font-weight: 600; font-size: 50px; text-align: center"
      >
        {{ dept.deptTim_zh }}{{ dept.deptName }}
        <span style="color: red"> 無看診</span>
      </div>

      <!-- //! rwd 大裝置  -->
      <div class="clinic-info-lg">
        <div class="row clinic-info-bg" style="">
          <div class="col-1 d-flex align-items-center">時段</div>
          <div class="col-2 d-flex align-items-center">診間</div>
          <div class="col-2 d-flex align-items-center">醫師</div>
          <div class="col-2 d-flex align-items-center">目前看診號次</div>
          <div class="col-5 d-flex align-items-center">備註</div>
        </div>

        <div
          class="col"
          v-for="(item, index) in lists"
          v-bind:class="{ backgroundground: index % 2 == 1 }"
        >
          <div class="row d-flex align-items-center justify-content-center">
            <div class="col-1 d-flex align-items-center">
              <span class="no-wrap">{{ filterTime(item.opdTimeID) }}</span>
            </div>
            <div class="col-2 d-flex align-items-center">
              <div>
                {{ item.roomID }}
                <span class="text-nowrap">({{ item.roomName }})</span>
              </div>
            </div>
            <div class="col-2 align-items-center justify-content-center">
              {{ item.doctorName }}
            </div>
            <div
              class="col-2 align-items-center justify-content-center"
              style="color: red"
            >
              {{ item.calledNumber }}
            </div>
            <div class="col-5 align-items-center justify-content-center">
              <div class="row d-flex m-1 pb-1">
                <div class="col-9">
                  <div v-html="item.msg"></div>
                </div>
                <div
                  class="col-3 d-flex align-items-center justify-content-center"
                >
                  <button
                    class="btn btn-success text-nowrap"
                    @click="ToEditRemark(index)"
                  >
                    修改
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- //! rwd 小裝置  -->
      <div class="clinic-info-md">
        <div class="row clinic-info-bg" style="">
          <div class="col d-flex align-items-center">時段</div>
          <div class="col d-flex align-items-center">診間</div>
          <div class="col d-flex align-items-center">醫師</div>
          <div class="col d-flex align-items-center">目前看診號次</div>
        </div>

        <div
          class="col"
          v-for="(item, index) in lists"
          v-bind:class="{ backgroundground: index % 2 == 1 }"
        >
          <div
            class="row d-flex align-items-center justify-content-center"
            style="height: 60px"
          >
            <div class="col d-flex align-items-center">
              <span class="no-wrap">{{ filterTime(item.opdTimeID) }}</span>
            </div>
            <div class="col d-flex align-items-center">
              <div>
                {{ item.roomID }}
                <span class="text-nowrap">({{ item.roomName }})</span>
              </div>
            </div>
            <div class="col align-items-center justify-content-center">
              {{ item.doctorName }}
            </div>
            <div
              class="col align-items-center justify-content-center"
              style="color: red"
            >
              {{ item.calledNumber }}
            </div>
          </div>
          <div class="row d-flex m-1 pb-1">
            <div class="col-9">
              <div v-html="item.msg"></div>
            </div>
            <div class="col-3 d-flex align-items-center justify-content-center">
              <button
                class="btn btn-success text-nowrap"
                @click="ToEditRemark(index)"
              >
                修改
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import head from "@/views/components/head.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import TextPartLanguage from "@ckeditor/ckeditor5-language/src/textpartlanguage";

import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.component("loading", Loading);

export default {
  components: {
    "head-component": head,
  },
  data() {
    return {
      isLoading: false,
      isIndex: null,

      timer: null,
      reloadnum: 0, //!更新時間
      //!src
      dept: {
        deptID: null,
        deptName: null,
        deptTim_zh: null,
      },
      mountCount: 0,
      //! 現在時間
      today: {
        time: null,
        date: null,
      },
      deptTime: null, //! 上午下午晚上
      deptBtn: null,
      noon: null,
      lists: [], //! 存放看診資料
      RemarkLists: [
        `<p>Content of the 
          <strong>editor.</strong>Content of the <strong>editor.
          </strong>Content of the <strong>editor.</strong></p>
          `,
      ], //!備註
      isTable: true,
      opdprogressEsLists: [[], [], []], //! 存放看診資料
    };
  },
  mounted() {
    this.reSetProgressLists();
    this.set();
    this.setNowTime();
    this.getopdprogressES(1);
    this.interval();
  },
  methods: {
    //! 取得deptID,deptName(門診)
    set() {
      if (this.$route.query.deptID == null) {
        this.dept.deptID = "";
      } else {
        this.dept.deptID = this.$route.query.deptID;
        console.log("selectClinic getroutQuery:", this.$route.query.deptID);
      }
      if (this.$route.query.deptName == null) {
        this.dept.deptName = null;
      } else {
        this.dept.deptName = this.$route.query.deptName;
      }
    },
    //!現在時間
    setNowTime() {
      let hh = new Date().getHours();
      if (hh < 12) {
        this.deptTime = 1;
        this.deptBtn = 1;
        this.dept.deptTim_zh = "上午";
      } else if (hh >= 12 && hh <= 17) {
        this.deptTime = 2;
        this.deptBtn = 2;
        this.dept.deptTim_zh = "下午";
      } else if (hh > 17) {
        this.deptTime = 3;
        this.deptBtn = 3;
        this.dept.deptTim_zh = "晚上";
      }
    },
    reSetProgressLists() {
      this.opdprogressEsLists = [[], [], []];
      this.lists = [];
    },

    //!取得診間資料
    getopdprogress(opdTimdId) {
      let param = {
        hospitalID: "1",
        language: "zh-TW",
        deptID: this.dept.deptID,
        opdTimeID: opdTimdId,
        wb_base64: "0",
        authKey: "F3E1E3E0BAE66D222337314292FD0608",
      };
      this.$gows.callWSOffical("pvt.pip.getopdprogress", param).then((rt) => {
        if (rt.sts == "000000") {
          this.opdprogressEsLists[opdTimdId - 1] = rt.val.resultList;
        } else {
          this.opdprogressEsLists[opdTimdId - 1] = [];
        }
        this.filterLists(this.deptBtn);
        console.log("every30sec getopdprogress:", rt.val);
      });
    },
    //!取得全部資料
    getopdprogressES(opdTimdId) {
      let param = {
        hospitalID: "1",
        language: "zh-TW",
        deptID: this.dept.deptID,
        opdTimeID: opdTimdId,
        wb_base64: "0",
        authKey: "F3E1E3E0BAE66D222337314292FD0608",
      };
      this.$gows.callWSOffical("pvt.pip.getopdprogress", param).then((rt) => {
        if (rt.sts == "000000") {
          this.opdprogressEsLists[opdTimdId - 1] = rt.val.resultList;
        } else {
          this.opdprogressEsLists[opdTimdId - 1] = [];
        }
        if (opdTimdId == this.deptTime) {
          this.filterLists(opdTimdId);
        }
        console.log("PushIntoList：", opdTimdId, rt.val.resultList);
        if (opdTimdId < 3) {
          opdTimdId++;
          this.getopdprogressES(opdTimdId);
        }
      });
    },
    //! 畫面刷新
    interval() {
      this.timer = setInterval(() => {
        // this.isLoading = true;
        this.reloadnum += 1; //! 更新時間
        let hh = new Date().getHours();
        let now = null;
        if (hh < 12) {
          now = 1;
        } else if (hh >= 12 && hh <= 17) {
          now = 2;
        } else if (hh > 17) {
          now = 3;
        }
        this.getopdprogress(now);
      }, 1000 * 3);
    },
    //!選擇時間
    getNoon(value) {
      if (value == 0) {
        this.deptBtn = 0;
        this.dept.deptTim_zh = "今日";
      }
      if (value == 1) {
        this.deptBtn = 1;
        this.dept.deptTim_zh = "上午";
      }
      if (value == 2) {
        this.deptBtn = 2;
        this.dept.deptTim_zh = "下午";
      }
      if (value == 3) {
        this.deptBtn = 3;
        this.dept.deptTim_zh = "晚上";
      }
      this.isLoading = true;
      console.log("value", value);
      this.filterLists(value);
    },
    filterLists(value) {
      if (value == 0) {
        let arr = [];
        Object.values(this.opdprogressEsLists[0]).forEach((value) => {
          arr.push(value);
        });
        Object.values(this.opdprogressEsLists[1]).forEach((value) => {
          arr.push(value);
        });
        Object.values(this.opdprogressEsLists[2]).forEach((value) => {
          arr.push(value);
        });
        this.lists = arr;
      } else {
        this.lists = this.opdprogressEsLists[value - 1];
      }
      this.isLoading = false;

      if (this.lists.length == 0) {
        this.isTable = false;
      } else {
        this.isTable = true;
      }
      // this.isLoading = false;
    },
    filterTime(time) {
      if (time == 1) return "上午";
      if (time == 2) return "下午";
      if (time == 3) return "晚上";
    },
    ToEditRemark(index) {
      console.log("tableINdex", index);
      this.$router.push({
        path: "/EditRemark",
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {},
};
</script>

