<template>
  <div class="out-frame">
    <loading :active.sync="isLoading"> </loading>

    <!-- //! header start -->
    <div
      style="
        padding: 10px 10px 0px 10px;
        justify-content: space-between;
        overflow: hidden;
      "
    >
      <button
        class="btn btn-unactive btn-toShowClinic"
        @click="jumpPage('/ChooseDept')"
      >
        回科別
      </button>
      <button
        class="btn btn-unactive btn-toShowClinic"
        @click="jumpPage('/')"
        v-if="this.$store.state.area != 0"
      >
        回首頁
      </button>
      <div>
        <h1 class="title">
          門診看診進度
          <p v-if="dept.deptName != null" style="display: inline-block">
            -{{ dept.deptName }}
          </p>
        </h1>
      </div>
    </div>
    <div style="padding: 10px 10px 0px 10px">
      <div class="date">
        <span class="date-left">
          <font-awesome-icon icon="fa-solid fa-calendar-days" />
          <span class="date-time"
            >{{ today.date }}
            <span style="color: #ff3434">{{ today.time }}</span></span
          >
        </span>
        <span class="date-right" v-if="dept.deptName !== null">
          *每30秒自動刷新
        </span>
      </div>
      <div class="buttons" v-if="dept.deptName != null">
        <button
          :class="{ isactive: isbtn == 0 }"
          class="btn btn-unactive btn-toShowClinic"
          @click="btn_click(0)"
        >
          全部
        </button>
        <button
          :class="{ isactive: isbtn == 1 }"
          class="btn btn-unactivey btn-toShowClinic"
          @click="btn_click(1)"
        >
          上午
        </button>
        <button
          :class="{ isactive: isbtn == 2 }"
          class="btn btn-unactive btn-toShowClinic"
          @click="btn_click(2)"
        >
          下午
        </button>
        <button
          :class="{ isactive: isbtn == 3 }"
          class="btn btn-unactive btn-toShowClinic"
          @click="btn_click(3)"
        >
          晚上
        </button>
      </div>
    </div>
    <!-- //! header end -->

    <!-- //! container start -->
    <div style="text-align: center">
      <h1 style="font-weight: 600; font-size: 50px" v-if="isTable == false">
        {{ dept.deptTim_zh }}{{ dept.deptName }}
        <p style="color: red; display: inline-block">目前無看診資料</p>
      </h1>

      <!-- //! rwd 大裝置  -->
      <div class="clinic-info-lg" v-if="isTable == true">
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
      <div class="clinic-info-md" v-if="isTable == true">
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
    <!-- //! container end -->
  </div>
</template>
<script>
import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.component("loading", Loading);

export default {
  data() {
    return {
      isLoading: false,

      isbtn: null,
      dept: {
        deptID: null,
        deptName: null,
      },

      timer: null,
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
      deptTime: null, //! 上午下午晚上
      lists: [], //! 存放看診資料
      isTable: true,
      opdprogressEsLists: [[], [], []], //! 存放看診資料
    };
  },
  mounted() {
    this.reSetProgressLists();
    this.set();
    this.getTime();
    this.getopdprogressES(1);
    this.interval();
    this.setButton();
  },
  methods: {
    //! 重置
    reSetProgressLists() {
      this.opdprogressEsLists = [[], [], []];
      this.lists = [];
    },
    //! 取得deptID,deptName(門診)
    set() {
      if (this.$route.query.deptID == null) {
        this.dept.deptID = "";
      } else {
        this.dept.deptID = this.$route.query.deptID;
      }
      if (this.$route.query.deptName == null) {
        this.dept.deptName = null;
      } else {
        this.dept.deptName = this.$route.query.deptName;
      }
    },
    //! 現在時間
    getTime() {
      let year = new Date().getFullYear();
      let month =
        new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
      let day =
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate();
      this.today.date = year + "-" + month + "-" + day;
      let hh =
        new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      this.today.time = hh + ":" + mf + ":" + ss;
      if (hh < 12) {
        this.deptTime = 1;
        this.dept.deptTim_zh = "上午";
      } else if (hh >= 12 && hh <= 17) {
        this.deptTime = 2;
        this.dept.deptTim_zh = "下午";
      } else if (hh > 17) {
        this.deptTime = 3;
        this.dept.deptTim_zh = "晚上";
      }
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
          // console.log("getops", rt.val.resultList);
          this.opdprogressEsLists[opdTimdId - 1] = rt.val.resultList;
        } else {
          this.opdprogressEsLists[opdTimdId - 1] = [];
        }
        this.filterLists(this.isbtn);
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
      this.isLoading = true;
      this.$gows.callWSOffical("pvt.pip.getopdprogress", param).then((rt) => {
        if (rt.sts == "000000") {
          this.opdprogressEsLists[opdTimdId - 1] = rt.val.resultList;
          this.dept.deptName = rt.val.resultList[0].deptName;
        } else {
          this.opdprogressEsLists[opdTimdId - 1] = [];
        }
        if (opdTimdId == this.deptTime) {
          this.filterLists(opdTimdId);
        }
        // console.log("PushIntoList：", opdTimdId, rt.val.resultList);
        if (opdTimdId < 3) {
          opdTimdId++;
          this.getopdprogressES(opdTimdId);
        } else {
          this.isLoading = false;
        }
      });
    },

    //! 每30s重新取得資料
    interval() {
      this.timer = setInterval(() => {
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
        this.getTime();
      }, 1000 * 3);
    },
    //! 顯示資料
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
      if (this.lists.length == 0) {
        this.isTable = false;
      } else {
        this.isTable = true;
      }
    },
    filterTime(time) {
      if (time == 1) return "上午";
      if (time == 2) return "下午";
      if (time == 3) return "晚上";
    },

    setButton() {
      let hh = new Date().getHours();
      if (hh < 12) {
        this.isbtn = 1;
      } else if (hh >= 12 && hh <= 17) {
        this.isbtn = 2;
      } else if (hh > 17) {
        this.isbtn = 3;
      }
    },

    //!選擇時間
    btn_click(index) {
      this.isbtn = index;
      if (index == 0) {
        this.dept.deptTim_zh = "今日";
      }
      if (index == 1) {
        this.dept.deptTim_zh = "上午";
      }
      if (index == 2) {
        this.dept.deptTim_zh = "下午";
      }
      if (index == 3) {
        this.dept.deptTim_zh = "晚上";
      }
      this.filterLists(index);
    },
    ToEditRemark(index) {
      this.lists.forEach((key, value) => {
        if (value == index) {
          this.$router.push({
            path: "/EditRemark",
            query: {
              deptID: key.deptID,
              roomID: key.roomID,
              period: key.opdTimeID,
              date: this.today.date,
            },
          });
        }
      });
    },
    jumpPage(str) {
      this.$router.push({
        path: str,
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {},
};
</script>

