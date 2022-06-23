<template>
  <div style="height: 100vh">
    <header class="navbar">
        <div class="ms-2 fs-3">
            慢性病處方箋預約
        </div>
    </header>
    <nav class="menu border rounded-top  m-auto">
      <span class="p-2 cursor-pointer" :class="{'text-primary fw-bolder': clickedMenu == 'reserve'}"  @click="clickMenu('reserve')">預約</span>
      <span class="p-2 cursor-pointer" :class="{'text-primary fw-bolder': clickedMenu == 'search'}"  @click="clickMenu('search')">查詢</span>
      <span class="p-2 cursor-pointer" :class="{'text-primary fw-bolder': clickedMenu == 'cancel'}"  @click="clickMenu('cancel')">取消</span>
    </nav>
    <div class="mt-3" v-if="clickedMenu === 'reserve'">
      <div class="inputPage w-100" v-if="result === null">
        <data-input-component @update-data="getInputDate" :clickedType="clickedMenu"></data-input-component>
      </div>
      <div class="result-wrap" v-else>
          <div>
            <div>
              病歷號 {{ inputData.idOrChart }}  處方號 {{ result.injNumber }}
            <button class="btn btn-secondary float-end" @click="clickedMenu = 'search'">上一頁</button>

            </div>
            <div>
              您的慢性病連續處方箋於 <span class="text-danger">{{ formatDate(result.injDateRange.startDate) }}</span> 由
              <span class="text-danger">{{ result.deptName }}-{{ result.doctorName}}</span> 開出。<br>
              最近領藥日為 <span class="text-danger">{{ formatDate(result.injDateRange.startDate) }}</span><br>
              此張慢箋於 <span class="text-danger">{{ formatDate(result.injDueDate) }}</span> 即無效作廢，過此日期則不得領藥，需重新掛號看診。
            </div>
          </div>
          <div>
            選擇要預約的日期:
            <select v-model="selectedReserveDate">
              <option v-for="option in reserveDate" :key="option.text" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
          <div >
            <button class="btn btn-primary" @click="reserve()">預約</button>
          </div>
      </div>
    </div>
    <div class="mt-3" v-if="clickedMenu === 'search'">
        <div class="button-set">
            <button class="btn btn-primary"
                    :class="{'btn-success': openPage === 'inputPage'}"
                    @click="changeFunction('inputPage')">
                手動輸入資料
            </button>
            <button class="btn btn-primary"
                    :class="{'btn-success': openPage === 'qrcodePage'}"
                    @click="changeFunction('qrcodePage')">
                    掃描QRcode
            </button>
        </div>
        <div class="inputPage w-100" v-if="openPage === 'inputPage'">
          <search-input-component :clickedType="clickedMenu" @update-data="getInputDate"></search-input-component>
        </div>
        <div class="result-wrap" v-if="openPage === 'qrcodePage'" style="margin-top:1rem" >
            <p v-if="error" class="text-danger">{{ error }}</p>
            <qrcode-stream :key="_uid" @decode="onDecode" @init="onInit" :track="paintOutline"/>
        </div>
        <div class="result-wrap" v-if="injData && filterResult && injData.isSuccess === 'Y' ">
          <table class="table table-bordered">
            <thead>
                <tr>
                  <th>科別</th>
                  <th>處方日期</th>
                  <th>處方號</th>
                  <th>狀態</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in filterResult" :key="data.injNumber">
                  <td>{{ data.deptName }}</td>
                  <td>{{ data.injDateRange.startDate }}</td>
                  <td>{{ data.injNumber}}</td>
                  <td>
                    <button v-if="data.notice === '可預約' && checkExpiration(data.injDueDate)"
                            class="btn btn-success"
                            @click="reservePrescription(data)"
                    >
                      {{ data.notice }}
                    </button>
                    <span v-else-if="data.notice === '已預約' && data.fvDate != undefined">{{ data.notice }}-{{ formatDate(data.fvDate) }}</span>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
    </div>
    <div class="mt-3" v-if="clickedMenu === 'cancel'">
      <div class="inputPage w-100" >
        <data-input-component @update-data="getInputDate" :clickedType="clickedMenu"></data-input-component>
      </div>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import SearchInputComponent from './SearchInput.vue'
import DataInputComponent from './DataInput.vue'

export default {
  data () {
    return {
      injData: '',
      result: null,
      error: '',
      openPage: '',
      clickedMenu: '',
      inputData: {},
      selectedReserveDate: '',
      reservedData: []
    }
  },
  methods: {
    // * QR Code render function
    onDecode (result) {
      let error = null
      if (result.includes('sltung')) {
        if (!result.includes('chart')) {
          error = {
            'title': '條碼錯誤',
            'text': '無病例號'
          }
        } else {
          this.inputData = {
            idOrChart: result.split('?')[1].split('&')[0].split('=')[1],
            injNumber: result.split('?')[1].split('&')[1].split('=')[1]
          }
          this.getInjData(this.inputData.idOrChart, this.inputData.injData)
          this.clickedMenu = 'reserve'
        }
      } else {
        error = {
          'title': '條碼錯誤',
          'text': '請掃描本院的慢箋單上的QRcode'
        }
      }
      if (error != null) {
        this.$swal.fire({
          icon: 'error',
          title: error.title,
          text: error.text
        })
      }
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permission'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        } else if (error.name === 'InsecureContextError') {
          this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
        } else {
          this.error = `ERROR: Camera error (${error.name})`
        }
      }
    },
    paintOutline (detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [ firstPoint, ...otherPoints ] = detectedCode.cornerPoints

        ctx.strokeStyle = 'red'

        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
      }
    },
    clickMenu (menu) {
      this.clickedMenu = menu
      this.result = null
    },
    changeFunction (page) {
      this.openPage = page
      this.injData = null
    },
    getInputDate (val) {
      this.inputData = val
      if (this.clickedMenu === 'reserve') {
        this.getInjData(this.inputData.idOrChart, this.inputData.injNumber)
      } else if (this.clickedMenu === 'search') {
        this.getInjData(this.inputData.idOrChart)
        this.getReservedData()
      } else if (this.clickedMenu === 'cancel') {
        this.cancelPrescription()
      }
    },
    getInjData (chart, injNumber, flag) {
      const tag = 'pvt.pip.injdataIA'
      const wsParam = {
        'wb_base64': 0,
        'chart': chart,
        'tag': 'pvt.pip.getinjdata'
      }
      this.$gows.callWSOffical(tag, wsParam).then((rt) => {
        this.injData = null
        this.result = null
        console.log(rt)
        let alert = {}
        if (rt.sts === '000000') {
          if (injNumber === undefined) {
            this.injData = rt.val
            alert = {
              'icon': 'success',
              'title': '查詢成功',
              'text': ''
            }
          } else {
            this.injData = rt.val
            rt.val.resultList.forEach(data => {
              if (data.injNumber === injNumber) {
                this.result = data
                alert = {
                  'icon': 'success',
                  'title': '查詢成功',
                  'text': ''
                }
              }
            })
            if (this.result === null) {
              alert = {
                'icon': 'error',
                'title': '查無資料',
                'text': '請再檢查資料是否填寫正確'
              }
            }
          }
        } else {
          alert = {
            'icon': 'error',
            'title': '查無資料',
            'text': '請再檢查資料是否填寫正確'
          }
        }
        if (flag === undefined) {
          this.$swal.fire({
            icon: alert.icon,
            title: alert.title,
            text: alert.text
          })
        }
      })
    },
    getReservedData () {
      const tag = 'pvt.pip.injdataIA'
      const wsParam = {
        'wb_base64': 0,
        'chart': this.inputData.idOrChart,
        'tag': 'pvt.pip.injdataquery'
      }
      this.$gows.callWSOffical(tag, wsParam).then((rt) => {
        this.reservedData = rt.val
        console.log(rt)
      })
    },
    cancelPrescription () {
      const tag = 'pvt.pip.injdataIA'
      const wsParam = {
        'wb_base64': 0,
        'chart': this.inputData.idOrChart,
        'injNumber': this.inputData.injNumber,
        'tag': 'pvt.pip.doinjcancel'
      }
      this.$gows.callWSOffical(tag, wsParam).then((rt) => {
        let alert = {}
        if (rt.sts === '000000') {
          if (rt.val.isSuccess === 'Y') {
            alert = {
              icon: 'success',
              title: '取消成功',
              text: ''
            }
          } else {
            alert = {
              icon: 'error',
              title: '取消失敗',
              text: rt.val.message
            }
          }
        } else {
          alert = {
            icon: 'error',
            title: '錯誤',
            text: rt.msg
          }
        }
        this.$swal.fire({
          icon: alert.icon,
          title: alert.title,
          text: alert.text
        })
        this.clickedMenu = 'search'
        this.getInjData(this.inputData.idOrChart, undefined, 1)
        this.getReservedData()
        console.log(rt)
      })
    },
    checkExpiration (expirationDate) {
      let temp = new Date()
      let mm = temp.getMonth() + 1
      let dd = temp.getDate()
      const today = [temp.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
      ].join('')
      if (today < expirationDate) {
        return true
      } else {
        return false
      }
    },
    reservePrescription (data) {
      this.clickedMenu = 'reserve'
      this.result = data
    },
    reserve () {
      const tag = 'pvt.pip.injdataIA'
      const wsParam = {
        'wb_base64': 0,
        'chart': this.inputData.idOrChart,
        'injNumber': this.result.injNumber,
        'fvDate': this.selectedReserveDate,
        'doctorID': this.result.doctorID,
        'deptID': this.result.deptID,
        'opdDate': this.result.opdDate,
        'tag': 'pvt.pip.doinj'
      }
      this.$gows.callWSOffical(tag, wsParam).then((rt) => {
        console.log(rt)
        let alert = {}
        if (rt.sts === '000000') {
          if (rt.val.isSuccess === 'Y') {
            alert = {
              'icon': 'success',
              'title': '預約成功',
              'text': rt.val.message
            }
          } else {
            alert = {
              'icon': 'error',
              'title': '預約失敗',
              'text': rt.val.message
            }
          }
          this.$swal.fire({
            icon: alert.icon,
            title: alert.title,
            text: alert.text
          })
          this.clickedMenu = 'search'
          this.getInjData(this.inputData.idOrChart, undefined, 1)
          this.getReservedData()
        }
      })
    },
    formatDate (date) {
      let yy = date.substring(0, 4)
      let mm = date.substring(4, 6)
      let dd = date.substring(6, 8)
      return yy + '年' + mm + '月' + dd + '日'
    },
    formatDay (day) {
      let res = ''
      if (day === 0) {
        res = '日'
      } else if (day === 1) {
        res = '一'
      } else if (day === 2) {
        res = '二'
      } else if (day === 3) {
        res = '三'
      } else if (day === 4) {
        res = '四'
      } else if (day === 5) {
        res = '五'
      } else if (day === 6) {
        res = '六'
      }
      return res
    }

  },
  computed: {
    reserveDate () {
      let list = []
      let temp = {
        'yy': this.result.injDateRange.startDate.substring(0, 4),
        'mm': (this.result.injDateRange.startDate.substring(4, 6) < 10 ? '0' : '') + (this.result.injDateRange.startDate.substring(4, 6) - 1),
        'dd': (this.result.injDateRange.startDate.substring(6, 8) < 10 ? '0' : '') + this.result.injDateRange.startDate.substring(6, 8)
      }
      let startDate = new Date(temp.yy, temp.mm, temp.dd)
      if (startDate < new Date()) {
        startDate = new Date()
      }
      let temp2 = {
        'yy': this.result.injDueDate.substring(0, 4),
        'mm': (this.result.injDueDate.substring(4, 6) < 10 ? '0' : '') + (this.result.injDueDate.substring(4, 6) - 1),
        'dd': (this.result.injDueDate.substring(6, 8) < 10 ? '0' : '') + this.result.injDueDate.substring(6, 8)
      }
      let endDate = new Date(temp2.yy, temp2.mm, temp2.dd)
      const diff = endDate.getTime() - startDate.getTime()
      const diffDate = diff / (24 * 60 * 60 * 1000)
      for (let i = 0; i <= Math.ceil(diffDate); i++) {
        let tempDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i)
        let yy = tempDate.getFullYear()
        let mm = (tempDate.getMonth() < 10 ? '0' : '') + (tempDate.getMonth() + 1)
        let dd = (tempDate.getDate() < 10 ? '0' : '') + tempDate.getDate()
        let day = this.formatDay(tempDate.getDay())
        let obj = {
          'value': yy + mm + dd,
          'text': yy + '年' + mm + '月' + dd + '日' + '(' + day + ')'
        }
        list.push(obj)
      }
      return list
    },
    filterResult () {
      let list = []
      if (this.injData.length === 0 || this.reservedData.length === 0) {
        return list
      }
      this.injData.resultList.forEach((element) => {
        let flag = true
        this.reservedData.resultList.forEach(data => {
          if (element.injNumber === data.injNumber) {
            let temp = element
            temp['fvDate'] = data.fvDate
            flag = false
            list.push(temp)
          }
        })
        if (flag === true) { list.push(element) }
      })
      console.log(list)
      return list
    }
  },
  components: {
    QrcodeStream,
    'search-input-component': SearchInputComponent,
    'data-input-component': DataInputComponent
  }
}
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
      margin: auto;
      padding: 2rem;
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
        padding :0;
      }
    }
</style>
