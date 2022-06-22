<template>
  <div class="w-100">
    <div
      style="
        padding: 10px 10px 0px 10px;
        justify-content: space-between;
        overflow: hidden;
      "
    >
      <button class="btn btn-unactive btn-toShowClinic" @click="jumpPage()">
        上一頁
      </button>
    </div>
    <!-- //! 輸入欄列表 -->
    <div class="reg-inputlist">
      <div class="d-inline text-wrap">
        <label>
          身分證字號：<input
            type="text"
            style="width: 150px"
            v-model="search.idNumber"
          />
        </label>
      </div>
      <div class="d-inline text-wrap">
        <label> 出生：<input type="date" v-model="search.birthday" /> </label>
      </div>
      <div class="d-inline text-wrap">
        <label>
          病歷號：<input
            type="text"
            style="width: 150px"
            v-model="search.patNumber"
          />
        </label>
        <button class="btn btn-registed" @click="getregquery()">搜尋</button>
      </div>
    </div>

    <div style="clear: both">
      <!-- //!大裝置 table-->
      <div class="regist-info-lg" v-if="isTable == true">
        <div class="row clinic-info-bg">
          <div class="col-2 d-flex align-items-center">時段</div>
          <div class="col-2 d-flex align-items-center">科別</div>
          <div class="col-2 d-flex align-items-center">診間</div>
          <div class="col-2 d-flex align-items-center">醫師</div>
          <div class="col-2 d-flex align-items-center">目前看診號次</div>
          <div
            class="col-2 d-flex align-items-center"
            style="padding-left: 25px"
          >
            備註
          </div>
        </div>
        <div
          class="col"
          v-for="(item, index) in regqueryLists"
          v-bind:class="{ backgroundground: index % 2 == 1 }"
        >
          <div
            class="row d-flex align-items-center justify-content-center"
            style="height: 90px; word-break: break-word"
          >
            <div class="col-2 d-flex align-items-center">
              <div class="regist-transDate">
                <p>{{ transyy(item.opdDate) }}</p>
                <p>
                  {{ transmd(item.opdDate) }}
                </p>
                <p>
                  <span class="text-nowrap">({{ item.weekDay }})</span
                  >{{ transTimd(item.opdTimeID) }}
                </p>
              </div>
            </div>
            <div class="col-2 d-flex align-items-center">
              <div>{{ item.deptName }}</div>
            </div>
            <div class="col-2 d-flex align-items-center">
              {{ item.roomID }}({{ item.roomName }})
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
            <div class="col-2 align-items-center justify-content-center">
              <div class="row d-flex m-1 pb-1">
                <div class="col-9"></div>
                <div
                  class="col-3 d-flex align-items-center justify-content-center"
                >
                  <!-- <button class="btn btn-success text-nowrap">修改</button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- //! rwd 小裝置  table -->
      <div class="regist-info-md" v-if="isTable == true">
        <div class="clinic-info-bg d-flex">
          <div class="d-flex align-items-center" style="width: 30%">時間</div>
          <div class="d-flex align-items-center" style="width: 20%">科別</div>
          <div class="d-flex align-items-center" style="width: 20%">診間</div>
          <div class="d-flex align-items-center" style="width: 15%">醫師</div>
          <div class="d-flex align-items-center" style="width: 15%">
            目前看診號次
          </div>
        </div>

        <div
          v-for="(item, index) in regqueryLists"
          v-bind:class="{ backgroundground: index % 2 == 1 }"
        >
          <div class="d-flex" style="height: 150px">
            <div
              class="d-flex align-items-center p-1"
              style="width: 30%; word-break: break-word"
            >
              <div class="regist-transDate">
                <p>
                  {{ transyy(item.opdDate) }}
                </p>
                <p>
                  {{ transmd(item.opdDate) }}
                </p>
                <p>
                  <span class="text-nowrap">({{ item.weekDay }})</span
                  >{{ transTimd(item.opdTimeID) }}
                </p>
              </div>
            </div>
            <div
              class="d-flex align-items-center p-1"
              style="width: 20%; word-break: break-word"
            >
              {{ item.deptName }}
            </div>
            <div
              class="d-flex align-items-center p-1"
              style="width: 20%; word-break: break-word"
            >
              {{ item.roomID }}({{ item.roomName }})
            </div>
            <div
              class="d-flex align-items-center p-1"
              style="width: 15%; word-break: break-word"
            >
              {{ item.doctorName }}
            </div>
            <div
              class="d-flex align-items-center p-1"
              style="width: 15%; word-break: break-word"
            >
              {{ item.calledNumber }}
            </div>
          </div>
          <!-- <div class="d-flex">
            <div
              class="d-flex align-items-center"
              style="width: 70%; word-break: break-word"
            >
              <div>備註</div>
            </div>
            <div
              class="d-flex align-items-center"
              style="width: 30%; word-break: break-word"
            >
              <div>按鈕</div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: {
        idNumber: "A256166167",
        birthday: "2020-07-01",
        patNumber: "-6",
      },
      isTable: false,
      regqueryLists: [],
    };
  },
  methods: {
    jumpPage() {
      this.$router.back();
    },
    //! 日期
    transyy(str) {
      let yy = str.substring(0, 4);
      return yy + "/";
    },
    transmd(str) {
      let mm = str.substring(4, 6);
      let dd = str.substring(6, 8);
      return mm + "/" + dd;
    },
    transTimd(str) {
      if (str == 1) {
        return "上午";
      }
      if (str == 2) {
        return "下午";
      }
      if (str == 3) {
        return "晚上";
      }
    },
    // ! 取得病患預約看診
    getregquery() {
      let arr = this.search.birthday.split("-");
      let birth = arr[0] + arr[1] + arr[2];
      let param = {
        wb_base64: "0",
        wb_big5: "0",
        hospitalID: "1",
        language: "zh-TW",
        authKey:
          "c81f94f568031f7157a0f7424be40c1ec81f94f568031f7157a0f7424be40c1e",
        patNumber: this.search.patNumber,
        idNumber: this.search.idNumber,
        idType: "1",
        birthday: birth,
        isFirst: "N",
      };
      console.log(param);
      this.$gows.callWSOffical("pvt.pip.regquery", param).then((rt) => {
        if (rt.sts == "000000") {
          this.regqueryLists = rt.val.resultList;
          if (this.regqueryLists.length == 0) {
            this.$swal.fire({
              icon: "info",
              title: "查無資料",
            });
            this.isTable = false;
          } else {
            this.isTable = true;
          }
        } else {
          this.regqueryLists = rt.val.resultList;
          this.$swal.fire({
            icon: "error",
            title: "查無病歷資料",
          });
          this.isTable = false;
        }
        console.log("getregquery", rt);
      });
    },
  },
};
</script>
