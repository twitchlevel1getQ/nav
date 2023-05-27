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
        @click="jumpPage('/Navigator')"
        v-if="this.$store.state.area != 0"
      >
        回首頁
      </button>
      <div class="title">
        <div class="title-deptname">門診看診進度</div>
        <div v-if="title != null" class="rwdTitle">
          <p style="display: inline-block; margin: 0px">-</p>
          {{ title }}
        </div>
        <div v-if="title != null" class="rwdTitle2">
          <p style="display: inline-block; margin: 0px"></p>
          {{ title }}
        </div>
          <div v-if="title == ''" class="rwdTitle">
          <p style="display: inline-block; margin: 0px">-</p>
          {{ dept.deptName }}
        </div>
        
        
      </div>
    </div>


    
    <div style="padding: 0px 10px 0px 10px">
      <div class="date">
        <span class="date-left">
          <span class="date-time"
            >{{ today.date }}
            <span style="color: #ff3434">{{ today.time }}</span></span
          >
        </span>
        <span class="date-right" v-if="dept.deptID != 201">
          *每30秒自動刷新
        </span>
      </div>
      <div class="buttons" v-if="dept.deptID != 201">
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

    <div >
      <div >

        <div class="date-right" >
        <!-- {{rgdsmList[dept.deptID][title]}} -->
        <div
      class="outpatient-section"
      v-for="(data, index) in rgdsmList"
      :key="index"
    >
      <ul class="page-list">
        <div>
          <li class="row-title">
            <div class="title-left">
              <font-awesome-icon icon="fa-solid fa-bookmark" />
              <span class="kind">{{ title }}</span>
            </div>
          </li>
          <div class="row-p1" v-for="(group, inx) in rgdsmList[dept.deptID][title]">
            <!-- {{group}}
            {{inx}} -->
            <div
              @click="
                openDept(
                  index,
                  index,
                  inx,
                  rgdsmList[dept.deptID][title][inx].div_no,
                  rgdsmList[dept.deptID][title][inx].nam,
                )
              "
            >
              {{ rgdsmList[dept.deptID][title][inx].nam }}
            </div>
          </div>
        </div>
      </ul>
    </div> 
        </div>
      </div>
    </div>


    
    <div style="text-align: center">
        <h1 v-if="title == '口腔醫學部'" 
        style="font-weight: 600; font-size: 30px; margin: 0px 20px">
            口腔醫學部採約診制，將由專人與您確認看診時段，以避免浪費您寶貴的時間。如有疑義，歡迎來電洽詢，電話：(04)2658-1919 #55301。
          </h1>
        <h1
        style="font-weight: 600; font-size: 30px; margin: 0px 20px"
        v-if="matchState()" 
      >
        {{ dept.deptTim_zh }}{{ dept.deptName }}
        <p style="color: red; display: inline-block">目前無看診資料</p>
      </h1>  
      <h1
        style="font-weight: 600; font-size: 30px; margin: 0px 20px"
        v-if="resmessage != ''" 
      >
        <!-- <p style="color: red; display: inline-block">{{resmessage}}</p> -->
      </h1>
       <!-- {{dept}} -->
      <!-- {{rgdsmList[dept.deptID][title]}}  -->
      <!-- {{opdprogressEsLists}} -->
      <!-- //! rwd 大裝置  -->
      <div class="clinic-info-lg" v-if="isTable == true">
        <div class="row clinic-info-bg" style="">
          <div class="col-1 d-flex align-items-center">時段</div>
          <div class="col-2 d-flex align-items-center justify-content-center">
            診間
          </div>
          <div class="col-2 d-flex align-items-center justify-content-center">
            醫師
          </div>
          <div class="col-2 d-flex align-items-center justify-content-center">
            目前看診號次
          </div>
          <div
            class="col-5 d-flex align-items-center"
            style="padding-left: 30px"
          >
            備註
          </div>
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
            <div class="col-2 d-flex align-items-center justify-content-center">
              <div>
                {{ item.roomID }}
                <span class="text-nowrap">({{ item.roomName }})</span>
              </div>
            </div>
            <div class="col-2 d-flex align-items-center justify-content-center">
              {{ item.doctorName }}
            </div>
            <div
              class="col-2 d-flex align-items-center justify-content-center"
              style="color: red"
            >
              {{ item.calledNumber }}
            </div>
            <div class="col-5">
              <div class="row m-1 pb-1">
                <div
                  class="col-9 d-flex align-items-start justify-content-start"
                >
                  <div v-html="item.msg"></div>
                </div>
                <div
                  class="col-3 d-flex align-items-center justify-content-center"
                >
                  <!-- <button
                    class="btn btn-success text-nowrap"
                    @click="ToEditRemark(index)"
                  >
                    修改
                  </button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- //! rwd 小裝置  -->
      <div class="clinic-info-md" v-if="isTable == true">
        <div class="row clinic-info-bg" style="">
          <div class="col-3 d-flex align-items-center">時段</div>
          <div class="col-3 d-flex align-items-center justify-content-center">
            診間
          </div>
          <div class="col-3 d-flex align-items-center justify-content-center">
            醫師
          </div>
          <div class="col-3 d-flex align-items-center justify-content-center">
            目前看診號次
          </div>
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
            <div class="col-3 d-flex align-items-center">
              <span class="no-wrap">{{ filterTime(item.opdTimeID) }}</span>
            </div>
            <div class="col-3 d-flex align-items-center justify-content-center">
              <div>
                {{ item.roomID }}
                <span class="text-nowrap">({{ item.roomName }})</span>
              </div>
            </div>
            <div class="col-3 d-flex align-items-center justify-content-center">
              {{ item.doctorName }}
            </div>
            <div
              class="col-3 d-flex align-items-center justify-content-center"
              style="color: red"
            >
              {{ item.calledNumber }}
            </div>
          </div>
          <div class="row d-flex m-1 pb-1">
            <div class="col-9 d-flex align-items-start">
              <div v-html="item.msg"></div>
            </div>
            <div class="col-3 d-flex align-items-center">
              <!-- <button
                class="btn btn-success text-nowrap"
                @click="ToEditRemark(index)"
              >
                修改
              </button> -->
            </div>
          </div>
        </div>
      </div>
      </div>
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
  mounted() {
    this.reSetProgressLists();
    this.set();
    this.getopdprogress();
    this.getTime();
    this.getopdprogressES(1);
    this.interval30S();
    this.interval1S();
    this.setButton();
    // this.getrgdsmList();

  },
  methods: {
    openDept(groupID, groupName, inx, deptID, deptName) {
      console.log("opendept", groupName, groupID, deptID, deptName);
      this.$router
        .push({
          path: "/SelectClinic",
          query: {
            deptID: deptID,
            groupID: groupID,
            groupName: deptName,
          },
        })
        .catch((err) => {
          err;
        });
        this.filterLists(this.isbtn,353);
        this.getopdprogress();
    },
    matchState() {
      let res = false;
      if (this.isTable == false) {
        res = true;
      }
      if (this.$route.query.deptID == 201) { 
        res = false;
      }
      return res
    },
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
      if (this.$route.query.groupName == null) {
        this.title = "";
        } else {
        this.title =  this.$route.query.groupName
        }
        if (this.$route.query.groupID == '300') {
          this.isTable = true
        }
      console.log(this.$route.query)
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
      let hh = new Date().getHours();
      let now = null;
      if (hh < 12) {
        now = 1;
      } else if (hh >= 12 && hh <= 17) {
        now = 2;
      } else if (hh > 17) {
        now = 3;
      } 
      if (!opdTimdId) {
        opdTimdId = now;
      }
      let param = {
        hospitalID: "1",
        language: "zh-TW",
        // deptID: this.dept.deptID,
        deptID: this.$route.query.deptID,
        opdTimeID: opdTimdId,
        wb_base64: "0",
        authKey: "F3E1E3E0BAE66D222337314292FD0608",
      };
      this.$gows.callWSOffical("pvt.pip.getopdprogress", param).then((rt) => {
        if (rt.sts == "000000") {
          this.opdprogressEsLists[opdTimdId - 1] = rt.val.resultList;
          console.log("378:", opdTimdId);
          console.log("378:", rt.val.resultList);
          console.log("378:", this.opdprogressEsLists[opdTimdId - 1]);
          this.filterLists(this.isbtn,381);
        } else {
          this.opdprogressEsLists[opdTimdId - 1] = [];
          console.log("381:", opdTimdId);
          this.filterLists(this.isbtn,385);

        }
        // this.filterLists(this.isbtn);
        console.log("every30sec getopdprogress:", rt.val);
        console.log("param:", param);
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
        if (rt.sts == "000000" && rt.val.resultList.length > 1) {
          this.opdprogressEsLists[opdTimdId - 1] = rt.val.resultList;
          this.dept.deptName = rt.val.resultList[0].deptName;
          // console.log("get:", rt.val.resultList);
        } else {
          this.opdprogressEsLists[opdTimdId - 1] = [];
        }
        if (opdTimdId == this.deptTime) {
          // this.filterLists(opdTimdId,413);
        }
        if (opdTimdId < 3) {
          opdTimdId++;
          this.getopdprogressES(opdTimdId);
        } else {
          this.isLoading = false;
        }
        if (rt.val.message != '成功') {
          this.resmessage = rt.val.message;
        }
      });
    },
    getrgdsmList() {
      //先呼叫測試區
      this.isLoading = true;
      let param = {
        wb_base64: "0",
        wb_big5: "0",
        sd_frm_no: "0",
        div_no: this.dept.deptID,
        lang:this.$store.state.language,
        authKey:
          "c81f94f568031f7157a0f7424be40c1ec81f94f568031f7157a0f7424be40c1e",
      };
      this.$gows.callWSOffical2("evt.rg.getrgdsm", param).then((rt) => {
        if (rt.sts == "000000") {
          this.rgdsmList = rt.val;
          console.log(this.rgdsmList)
          console.log(this.rgdsmList[this.$route.query.deptID][this.$route.query.groupName])
          let datalist = this.rgdsmList[this.$route.query.deptID][this.$route.query.groupName];
          console.log(datalist);
          datalist.forEach((item) => {
            // console.log(item); // { name: 'Casper', ... }
            if (item.message.length > 0) {
              alert(item.message[0].dsc)
            }
            if (item.dr.length > 0) {

              console.log(item.dr)
              console.log(item.div_no)
              this.divdrlist[item.div_no] = item.dr 
            }
          });
          console.log(item.divdrlist)
        }
        
        // this.tidy();
        this.isLoading = false;
      });
    }, 
    //! 每30s重新取得資料
    interval30S() {
      this.timer30 = setInterval(() => {
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
      }, 1000 * 30);
    },
    interval1S() {
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
        this.getTime();
      }, 1000 * 1);
    },
    //! 顯示資料
    filterLists(value,log) {
      let arr = [];
      if (value == 0) {
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
      console.log('490',log)
      console.log('491',value)
      console.log('492',this.lists)
      console.log('493',arr)
      console.log('494',this.opdprogressEsLists[value - 1])
      console.log('495',this.lists.length)
      if (this.lists.length == 0) {
        this.isTable = false;
        if (this.$route.query.groupID == '300') {
          this.isTable = true;
        }
      } else {
        this.isTable = true;
      }
      // if (this.$route.query.deptID == '201') {
      //   this.isTable = false;
      // }
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
      this.filterLists(index,'537');
    },
    ToEditRemark(index) {
      this.lists.forEach((key, value) => {
        if (value == index) {
          this.$router.push({
            path: "/EditRemark",
            query: {
              // deptID: key.deptID,
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
    clearInterval(this.timer30);
  },
  computed: {},
};
</script>

