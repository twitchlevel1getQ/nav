<template>
  <div style="height: 100vh">
    <div class="loading" v-if="isLoading">
      <loading :active.sync="isLoading">
        <div class="loadingio-spinner-spinner-5cf73kkmxoq">
          <div class="ldio-4p6krgwc7t8">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </loading>
    </div>
    <div class="logo"></div>

    <div class="bigtitle">
      <div class="bigtitle-font">慢性病處方箋預約</div>
    </div>
    <button class="rollback" @click="jumpPage('/Navigator')">上一頁</button>

    <nav class="menu border rounded-top m-auto">
      <span
        class="p-2 cursor-pointer"
        :class="{ 'text-primary fw-bolder': clickedMenu == 'reserve' }"
        @click="clickMenu('reserve')"
        >預約</span
      >
      <span
        class="p-2 cursor-pointer"
        :class="{ 'text-primary fw-bolder': clickedMenu == 'search' }"
        @click="clickMenu('search')"
        >查詢/取消</span
      >
      <!-- <span class="p-2 cursor-pointer" :class="{'text-primary fw-bolder': clickedMenu == 'cancel'}"  @click="clickMenu('cancel')">查詢/取消</span> -->
    </nav>
    <!-- 預約 -->
    <div class="mt-3" v-if="clickedMenu === 'reserve'">
      <div class="button-set" v-if="!_isandroid()">
        <button
          style="float: right"
          class="btn btn-primary style=“float:right”"
          :class="{ 'btn-success': openPage === 'qrcodePage' }"
          @click="changeFunction('qrcodePage')"
        >
          掃描QRcode
        </button>
      </div>
      <div class="inputPage w-100" v-if="result === null">
        <div
          class="result-wrap"
          v-if="openPage === 'qrcodePage'"
          style="margin-top: 1rem"
        >
          <p v-if="error" class="text-danger">{{ error }}</p>
          <qrcode-stream
            :key="_uid"
            @decode="onDecode"
            @init="onInit"
            :track="paintOutline"
          />
        </div>

        <data-input-component
          @update-data="getInputDate"
          :clickedType="clickedMenu"
        ></data-input-component>
      </div>
      <div
        class="result-wrap"
        v-else-if="result !== null && result.notice !== '已預約'"
      >
        <button class="btn btn-secondary" @click="clickedMenu = 'search'">
          上一頁
        </button>
        <div>
          請選擇院區:
          <select v-model="selectedReservehosID">
            <option
              v-for="option2 in hosID"
              :key="option2.id"
              :value="option2.id"
            >
              {{ option2.hos }}
            </option>
          </select>
        </div>
        <div>
          選擇要預約的日期:
          <select v-model="selectedReserveDate">
            <option
              v-for="option in reserveDate"
              :key="option.text"
              :value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
        <div>
          <div>
            病歷號 {{ inputData.idOrChart }} 處方號 {{ result.injNumber }}
          </div>
          <div>
            您的慢性病連續處方箋於
            <span class="text-danger">{{ formatDate(result.opdDate) }}</span> 由
            <span class="text-danger"
              >{{ result.deptName }}-{{ result.doctorName }}</span
            >
            開出。<br />
            最近領藥日為
            <span class="text-danger">{{
              formatDate(result.injDateRange.startDate)
            }}</span
            ><br />
            此張慢箋於
            <span class="text-danger">{{ formatDate(result.injDueDate) }}</span>
            即無效作廢，過此日期則不得領藥，需重新掛號看診。
          </div>
        </div>

        <div style="height: 30px">
          <button class="btn btn-primary float-end" @click="reserve()">
            預約
          </button>
        </div>
      </div>
      <div class="result-wrap" v-else>
        <div>
          <div>
            病歷號 {{ inputData.idOrChart }} 處方號 {{ result.injNumber }}
            <button
              class="btn btn-secondary float-end"
              @click="clickedMenu = 'search'"
            >
              上一頁
            </button>
            <button
              v-if="
                result.notice === '已預約' && checkExpiration(result.injDueDate)
              "
              class="btn btn-warning"
              @click="cancel(result)"
            >
              可取消
            </button>
          </div>
          <div class="text-danger fs-5">
            {{ getReservedData(result.injNumber) }}
            您的慢性病處方箋已經預約於: {{ selectedReserveDate }}
          </div>
        </div>
      </div>
    </div>
    <!-- 查詢 -->
    <div class="mt-3" v-if="clickedMenu === 'search'">
      <div class="button-set">
        <!-- <button class="btn btn-primary"
                    :class="{'btn-success': openPage === 'inputPage'}"
                    @click="changeFunction('inputPage')">
                手動輸入資料
            </button> -->
        <button
          class="btn btn-primary"
          :class="{ 'btn-success': openPage === 'qrcodePage' }"
          @click="changeFunction('qrcodePage')"
        >
          掃描QRcode
        </button>
      </div>

      <div
        class="result-wrap"
        v-if="openPage === 'qrcodePage'"
        style="margin-top: 1rem"
      >
        <p v-if="error" class="text-danger">{{ error }}</p>
        <qrcode-stream
          :key="_uid"
          @decode="onDecode"
          @init="onInit"
          :track="paintOutline"
        />
      </div>
      <div class="inputPage w-100">
        <!-- <div class="inputPage w-100" v-if="openPage === 'inputPage'"> -->
        <search-input-component
          :clickedType="clickedMenu"
          @update-data="getInputDate"
        ></search-input-component>
      </div>

      <!-- test -->
      <div
        class="container"
        v-if="injData && filterResult && injData.isSuccess === 'Y'"
      >
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>科別</th>
              <th>處方日期</th>
              <th>處方號</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in filterResult" :key="data.injNumber">
              <td>{{ data.deptName }}</td>
              <td>{{ data.opdDate }}</td>
              <td>{{ data.injNumber }}</td>
              <td>
                <button
                  v-if="
                    data.notice === '可預約' && checkExpiration(data.injDueDate)
                  "
                  class="btn btn-success"
                  @click="reservePrescription(data)"
                >
                  {{ data.notice }}
                </button>
                <span
                  v-else-if="
                    data.notice === '已預約' && data.fvDate != undefined
                  "
                >
                  <button
                    v-if="
                      data.notice === '已預約' &&
                      checkExpiration(data.injDueDate)
                    "
                    class="btn btn-warning"
                    @click="cancel(data)"
                  >
                    可取消
                  </button>
                  <!-- {{ data.notice }}-{{ formatDate(data.fvDate) }} -->
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--取消 -->
    <div class="mt-3" v-if="clickedMenu === 'cancel'">
      <div class="inputPage w-100">
        <data-input-component
          @update-data="getInputDate"
          :clickedType="clickedMenu"
        ></data-input-component>
      </div>
    </div>

    <div class="hs">
      <hr />
    </div>
    <!-- 注意事項 -->
    <br />
    <div class="inputPage w-100">
      <table class="tbl1 tbl-info">
        <tbody>
          <tr>
            <th colspan="4">梧棲院區領藥時間</th>
          </tr>
          <tr>
            <td></td>
            <td>系統接受預約時間</td>
            <td>可領藥時間</td>
            <td>領藥地點</td>
          </tr>
          <tr>
            <td>週一~週五</td>
            <td>08:00~21:30</td>
            <td>08:30~22:00</td>
            <td>梧棲B1門診藥局</td>
          </tr>
          <tr>
            <td>週六~週日<br />國定假日</td>
            <td>08:00~12:30</td>
            <td>08:30~13:00</td>
            <td>梧棲B1門診藥局</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="inputPage w-100">
      <table class="tbl2 tbl-info">
        <tbody>
          <tr>
            <th colspan="4">
              <span id="Label5">沙鹿院區領藥時間</span>
            </th>
          </tr>
          <tr>
            <td></td>
            <td>系統接受預約時間</td>
            <td>可領藥時間</td>
            <td>領藥地點</td>
          </tr>
          <tr>
            <td>週一~週五</td>
            <td>08:00~21:30</td>
            <td>08:30~22:00</td>
            <td>沙鹿1F門診藥局</td>
          </tr>
          <tr>
            <td>週六</td>
            <td>08:00~12:30</td>
            <td>08:30~13:00</td>
            <td>沙鹿1F門診藥局</td>
          </tr>
          <tr>
            <td>週日</td>
            <td colspan="3">不開放預約領藥</td>
          </tr>
          <tr>
            <td>國定假日</td>
            <td colspan="3">不開放預約領藥</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
import SearchInputComponent from "./SearchInput.vue";
import DataInputComponent from "./DataInput.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  data() {
    return {
      injData: "",
      result: null,
      error: "",
      openPage: "",
      clickedMenu: "reserve",
      inputData: {},
      selectedReservehosID: "",
      hosID: [
        { id: "0", hos: "請選擇院區" },
        { id: "1", hos: "梧棲院區" },
        { id: "2", hos: "沙鹿院區" },
      ],
      selectedReserveDate: "",
      reservedData: [],
      isLoading: false,
    };
  },
  mounted() {
    this.set();
    if (this._isMobile()) {
      if (this._isandroid()) {
      }
      // alert("手機端");
    } else {
      // alert("pc端");
    }
  },
  created() {},
  methods: {
    //App.vue
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    _isandroid() {
      let flag = navigator.userAgent.match(
        /(pad|pod|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    // * QR Code render function

    set() {
      console.log(this.$route.query.patID);
      if (this.$route.query.chart == null) {
        this.inputData.idOrChart = "";
      } else {
        this.inputData.idOrChart = this.$route.query.chart;
      }
      if (this.$route.query.ordID == null) {
        this.inputData.injNumber = "";
      } else {
        this.inputData.injNumber = this.$route.query.ordID;
      }
      if (this.inputData.idOrChart && this.inputData.injNumber) {
        this.getInjData(
          this.inputData.idOrChart,
          this.inputData.injNumber,
          "1"
        );
      }
      // this.getReservedData()
      // * 跳轉至預約畫面
      this.clickedMenu = "reserve";
      this.openPage = null;
    },
    //! 跳頁 參數
    jumpPage(str) {
      this.$router.push({
        path: str,
      });
    },
    onDecode(result) {
      let error = null;
      if (result.includes("sltung")) {
        if (!result.includes("chart")) {
          error = {
            title: "條碼錯誤",
            text: "無病例號",
          };
        } else {
          this.inputData = {
            idOrChart: result.split("?")[1].split("&")[0].split("=")[1],
            injNumber: result.split("?")[1].split("&")[1].split("=")[1],
          };
          this.getInjData(
            this.inputData.idOrChart,
            this.inputData.injNumber,
            "1"
          );
          // this.getReservedData()
          // * 跳轉至預約畫面
          this.clickedMenu = "reserve";
          this.openPage = null;
        }
      } else {
        error = {
          title: "條碼錯誤",
          text: "請掃描本院的慢箋單上的QRcode",
        };
      }
      if (error != null) {
        this.$swal.fire({
          icon: "error",
          title: error.title,
          text: error.text,
        });
      }
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        } else if (error.name === "InsecureContextError") {
          this.error =
            "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },
    clickMenu(menu) {
      this.clickedMenu = menu;
      this.result = null;
      this.selectedReserveDate = "";
      this.selectedReservehosID = "";
    },
    changeFunction(page) {
      if (this.openPage === page) {
        this.openPage = null;
      } else {
        this.openPage = page;
        this.injData = null;
      }
    },
    getInputDate(val) {
      this.inputData = val;
      console.log(this.clickedMenu);
      if (this.clickedMenu === "reserve") {
        this.getInjData(
          this.inputData.idOrChart,
          this.inputData.injNumber,
          "1"
        );
      } else if (this.clickedMenu === "search") {
        this.getInjData(this.inputData.idOrChart);
        this.getReservedData();
      } else if (this.clickedMenu === "cancel") {
        this.getInjData(this.inputData.idOrChart, this.inputData.injNumber);
        this.cancel();
      }
    },
    // 取慢籤資料
    getInjData(chart, injNumber, flag) {
      //1
      this.isLoading = true;

      const tag = "pvt.pip.injdataIA";
      const wsParam = {
        wb_base64: 0,
        chart: chart,
        date: this.inputData.birthday,
        tag: "pvt.pip.getinjdata",
      };
      console.log(wsParam);
      if (flag == "1") {
        console.log(chart);
        console.log(injNumber);
        if (chart && !injNumber && this.clickedMenu === "reserve") {
          this.$swal.fire({
            icon: "error",
            title: "缺少輸入",
            text: "缺少處方號",
          });
        }
        this.$gows.callWSOffical(tag, wsParam).then((rt) => {
          this.injData = null;
          this.result = null;
          this.isLoading = false;

          if (rt.sts === "000000") {
            if (injNumber === undefined) {
              this.injData = rt.val;
            } else {
              this.injData = rt.val;
              rt.val.resultList.forEach((data) => {
                if (data.injNumber === injNumber) {
                  this.result = data;
                }
              });
              if (this.result == null) {
                this.$swal.fire({
                  icon: "warning",
                  title: "無可預約處方",
                  text: "",
                });
              }
            }
          } else {
            this.$swal.fire({
              icon: "error",
              title: "缺少輸入",
              text: rt.val,
            });
          }
        });
      } else {
        if (wsParam.date.length !== 4) {
          this.isLoading = false;

          this.$swal.fire({
            icon: "error",
            title: "缺少輸入",
            text: "缺少日期",
          });
        } else {
          this.$gows.callWSOffical(tag, wsParam).then((rt) => {
            this.injData = null;
            this.result = null;
            this.isLoading = false;

            let alert = {};
            if (rt.sts === "000000") {
              if (injNumber === undefined) {
                this.injData = rt.val;
                alert = {
                  icon: "success",
                  title: "查詢成功",
                  text: rt.val.message === "查詢成功" ? "" : rt.val.message,
                };
              } else {
                this.injData = rt.val;
                rt.val.resultList.forEach((data) => {
                  if (data.injNumber === injNumber) {
                    this.result = data;
                    alert = {
                      icon: "success",
                      title: "查詢成功",
                      text: rt.val.message,
                    };
                  }
                });
                if (this.result === null) {
                  alert = {
                    icon: "error",
                    title: "查無資料",
                    text: "請再檢查資料是否填寫正確",
                  };
                }
              }
            } else {
              alert = {
                icon: "error",
                title: "查無資料",
                text: rt.val.message,
              };
            }
            this.$swal.fire({
              icon: alert.icon,
              title: alert.title,
              text: alert.text,
            });
          });
        }
      }
    },
    getReservedData(injNumber) {
      const tag = "pvt.pip.injdataIA";
      const wsParam = {
        wb_base64: 0,
        chart: this.inputData.idOrChart,
        tag: "pvt.pip.injdataquery",
      };
      this.$gows.callWSOffical(tag, wsParam).then((rt) => {
        if (injNumber !== undefined) {
          rt.val.resultList.forEach((element) => {
            if (element.injNumber === injNumber) {
              this.selectedReserveDate = this.formatDate(element.fvDate);
            }
          });
        } else {
          this.reservedData = rt.val;
        }
      });
    },
    // 取消慢籤 WS
    cancel(data) {
      const tag = "pvt.pip.injdataIA";
      const wsParam = {
        wb_base64: 0,
        chart: data.idOrChart ? data.idOrChart : data.injNumber,
        tag: "pvt.pip.injdataquery",
      };
      console.log(this.selectedReserveDate);
      console.log(data.fvDate);
      let date = null;
      let dateparam =
        data.fvDate != undefined ? data.fvDate : this.selectedReserveDate;
      if (data.fvDate != undefined) {
        date = this.formatDate(dateparam);
      } else {
        date = dateparam;
      }
      this.$swal
        .fire({
          title: "確定要取消此次預約嗎?",
          text: "預約時間" + date,
          showDenyButton: true,
          confirmButtonText: "是",
          denyButtonText: "否",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.cancelPrescription(data);
          }
        });

      // this.$gows.callWSOffical(tag, wsParam).then((rt) => {
      //   if (rt.sts === '000000') {
      //     if (rt.val.resultList.length === 0) {
      //       this.$swal.fire(rt.val.message, '', 'error')
      //     } else {
      //       if (this.inputData.injNumber !== undefined) {
      //         rt.val.resultList.forEach(element => {
      //           if (element.injNumber === this.inputData.injNumber) {
      //             date = this.formatDate(element.fvDate)
      //             this.$swal.fire({
      //               title: '確定要取消此次預約嗎?',
      //               text: '預約時間' + date,
      //               showDenyButton: true,
      //               confirmButtonText: '是',
      //               denyButtonText: '否'
      //             }).then((result) => {
      //               if (result.isConfirmed) {
      //                 this.cancelPrescription()
      //               }
      //             })
      //           }
      //         })
      //         if (date === null) {
      //           this.$swal.fire('尚未預約', '', 'error')
      //         }
      //       } else {
      //         this.reservedData = rt.val
      //       }
      //     }
      //   } else {
      //     if (rt.val.message === undefined) {
      //       this.$swal.fire(rt.val, '', 'error')
      //     } else {
      //       this.$swal.fire(rt.val.message, '', 'error')
      //     }
      //   }
      // })
    },
    cancelPrescription(data) {
      const tag = "pvt.pip.injdataIA";
      const wsParam = {
        wb_base64: 0,
        chart: this.inputData.idOrChart,
        injNumber: data.injNumber,
        tag: "pvt.pip.doinjcancel",
      };
      this.$gows.callWSOffical(tag, wsParam).then((rt) => {
        let alert = {};
        if (rt.sts === "000000") {
          if (rt.val.isSuccess === "Y") {
            alert = {
              icon: "success",
              title: "取消成功",
              text: "",
            };
          } else {
            alert = {
              icon: "error",
              title: "取消失敗",
              text: rt.val.message,
            };
          }
        } else {
          alert = {
            icon: "error",
            title: "錯誤",
            text: rt.msg,
          };
        }
        this.$swal.fire({
          icon: alert.icon,
          title: alert.title,
          text: alert.text,
        });
        this.clickedMenu = "search";
        this.openPage = null;
        this.getInjData(this.inputData.idOrChart, undefined, 1);
        this.getReservedData();
      });
    },
    checkExpiration(expirationDate) {
      let temp = new Date();
      let mm = temp.getMonth() + 1;
      let dd = temp.getDate();
      const today = [
        temp.getFullYear(),
        (mm > 9 ? "" : "0") + mm,
        (dd > 9 ? "" : "0") + dd,
      ].join("");
      if (today < expirationDate) {
        return true;
      } else {
        return false;
      }
    },
    reservePrescription(data) {
      this.clickedMenu = "reserve";
      this.result = data;
      this.selectedReserveDate = "0";
      this.selectedReservehosID = "0";
    },
    //預約
    reserve() {
      const tag = "pvt.pip.injdataIA";
      const wsParam = {
        wb_base64: 0,
        chart: this.inputData.idOrChart,
        injNumber: this.result.injNumber,
        fvDate: this.selectedReserveDate,
        hospitalID: this.selectedReservehosID,
        doctorID: this.result.doctorID,
        deptID: this.result.deptID,
        opdDate: this.result.opdDate,
        tag: "pvt.pip.doinj",
      };
      if (wsParam.hospitalID <= "0") {
        this.$swal.fire({
          icon: "error",
          title: "請選擇院區",
          text: "缺少院區",
        });
        return;
      }

      if (wsParam.fvDate <= "0") {
        this.$swal.fire({
          icon: "error",
          title: "請選擇日期",
          text: "缺少預約日期",
        });
        return;
      }
      this.$gows.callWSOffical(tag, wsParam).then((rt) => {
        let alert = {};
        if (rt.sts === "000000") {
          if (rt.val.isSuccess === "Y") {
            alert = {
              icon: "success",
              title: rt.val.resultList[0].notice,
              text:
                "領藥日期:" +
                this.formatDate(rt.val.resultList[0].fvDate) +
                " ， 領藥號:" +
                rt.val.resultList[0].fvNum,
            };
          } else {
            alert = {
              icon: "error",
              title: "預約失敗",
              text: rt.val.notice,
            };
          }
          this.$swal.fire({
            icon: alert.icon,
            title: alert.title,
            text: alert.text,
          });
          this.clickedMenu = "search";
          this.openPage = null;
          this.selectedReservehosID = "";
          this.selectedReserveDate = "";
          this.getInjData(this.inputData.idOrChart, undefined, 1);
          this.getReservedData();
        }
      });
    },
    formatDate(date) {
      let yy = date.substring(0, 4);
      let mm = date.substring(4, 6);
      let dd = date.substring(6, 8);
      return yy + "年" + mm + "月" + dd + "日";
    },
    formatDay(day) {
      let res = "";
      if (day === 0) {
        res = "日";
      } else if (day === 1) {
        res = "一";
      } else if (day === 2) {
        res = "二";
      } else if (day === 3) {
        res = "三";
      } else if (day === 4) {
        res = "四";
      } else if (day === 5) {
        res = "五";
      } else if (day === 6) {
        res = "六";
      }
      return res;
    },
  },
  computed: {
    reserveDate() {
      console.log(this.selectedReservehosID);
      console.log(602);
      let list = [
        {
          value: "0",
          text: "請選擇日期",
        },
      ];
      let temp = {
        yy: this.result.injDateRange.startDate.substring(0, 4),
        mm:
          (this.result.injDateRange.startDate.substring(4, 6) < 9 ? "0" : "") +
          (this.result.injDateRange.startDate.substring(4, 6) - 1),
        dd:
          (this.result.injDateRange.startDate.substring(6, 8) < 10 ? "0" : "") +
          this.result.injDateRange.startDate.substring(6, 8),
      };
      let startDate = new Date(temp.yy, temp.mm, temp.dd);
      if (startDate < new Date()) {
        startDate = new Date();
      }
      let temp2 = {
        yy: this.result.injDueDate.substring(0, 4),
        mm:
          (this.result.injDueDate.substring(4, 6) < 9 ? "0" : "") +
          (this.result.injDueDate.substring(4, 6) - 1),
        dd:
          (this.result.injDueDate.substring(6, 8) < 10 ? "0" : "") +
          this.result.injDueDate.substring(6, 8),
      };
      let endDate = new Date(temp2.yy, temp2.mm, temp2.dd);
      const diff = endDate.getTime() - startDate.getTime();
      const diffDate = diff / (24 * 60 * 60 * 1000);
      for (let i = 0; i <= Math.ceil(diffDate); i++) {
        let tempDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + i
        );
        let yy = tempDate.getFullYear();
        let mm =
          (tempDate.getMonth() < 9 ? "0" : "") + (tempDate.getMonth() + 1);
        let dd = (tempDate.getDate() < 10 ? "0" : "") + tempDate.getDate();
        let day = this.formatDay(tempDate.getDay());
        let obj = {
          value: yy + mm + dd,
          text: yy + "年" + mm + "月" + dd + "日" + "(" + day + ")",
        };
        list.push(obj);
        console.log(tempDate.getMonth());
      }
      console.log(list);
      console.log(688);
      return list;
    },
    filterResult() {
      let list = [];
      if (this.injData.length === 0 || this.reservedData.length === 0) {
        return list;
      }
      this.injData.resultList.forEach((element) => {
        let flag = true;
        this.reservedData.resultList.forEach((data) => {
          if (element.injNumber === data.injNumber) {
            let temp = element;
            temp["fvDate"] = data.fvDate;
            flag = false;
            list.push(temp);
          }
        });
        if (flag === true) {
          list.push(element);
        }
      });
      return list;
    },
  },
  components: {
    QrcodeStream,
    "search-input-component": SearchInputComponent,
    "data-input-component": DataInputComponent,
    loading: Loading,
  },
};
</script>
<style scope>
.navbar {
  z-index: 30;
  height: 3.6rem;
  border-bottom: 1px solid #eaecef;
}
.button-set {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.inputPage {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.menu {
  width: 50%;
  display: flex;
  justify-content: space-evenly;
}
.cursor-pointer {
  cursor: pointer;
}
.result-wrap {
  border: 1px black solid;
  border-radius: 1rem;
  width: 60%;
  margin: 1rem auto;
  padding: 2rem;
}
.result-wrap2 {
  border-radius: 1rem;
  width: 90%;
  margin: 0.5rem;
  padding: 0.5rem;
}

@media (max-width: 768px) {
  .menu {
    width: 80% !important;
  }
  .result-wrap {
    width: 80% !important;
  }
}
@media (max-width: 576px) {
  .result-wrap > table {
    width: 90% !important;
    font-size: 13px;
    padding: 0;
  }
}
.tbl1 {
  border: 2px solid #1b75bc;
}
.tbl1 th {
  background-color: #1b75bc;
}
.tbl-info th {
  text-align: center;
  font-size: 24pt;
  color: White;
  height: 42px;
}
.tbl-info {
  /* width: 600px; */
  height: auto;
  padding: 10px;
  border-collapse: collapse;
  /* margin-left: 150px; */
}
.tbl1 td {
  color: #167a8a;
}
.tbl-info td {
  font-size: 20px;
  text-align: center;
  border: 1px solid #e6e7e8;
}
.tbl2 {
  border: 2px solid #167a8a;
}
.tbl2 th {
  background-color: #167a8a;
}
.tbl2 td {
  color: #167a8a;
}
.tbl-info {
  /* width: 600px; */
  height: auto;
  padding: 10px;
  border-collapse: collapse;
  /* margin-left: 150px; */
}
.hs {
  width: 80%;
  /* margin-left: 150px; */
}
</style>
