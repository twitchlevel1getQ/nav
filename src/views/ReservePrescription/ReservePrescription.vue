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
        <reserve-input-component @update-data="getInputDate"></reserve-input-component>
      </div>
      <div class="result-wrap" v-else>
        {{ result }}
          <div>
            <div>
              病歷號 {{  }}  處方號 {{ result.injNumber }}
            </div>
            <div>
              您的慢性病連續處方箋於 <span class="text-danger">{{ formatDate(result.injDateRange.startDate) }}</span> 由
              <span class="text-danger">{{ result.deptName }}-{{ result.doctorName}}</span> 開出 <br>
              最近領藥日為 <span class="text-danger">{{ formatDate(result.injDateRange.startDate) }}</span> 用藥天數為 {} <br>
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
          <div style="width: 100%; margin: auto">
            <button class="btn btn-primary">預約</button>
          </div>
      </div>
    </div>
    <div class="mt-3" v-if="clickedMenu === 'search'">
        <div class="button-set">
            <button class="btn btn-primary"
                    :class="{'btn-success': openPage === 'inputPage'}"
                    @click="changePage('inputPage')">
                手動輸入資料
            </button>
            <button class="btn btn-primary"
                    :class="{'btn-success': openPage === 'qrcodePage'}"
                    @click="changePage('qrcodePage')">
                    掃描QRcode
            </button>
        </div>
        <div class="inputPage w-100" v-if="openPage === 'inputPage'">
          <search-input-component :clickedType="clickedMenu" @update-data="getInputDate"></search-input-component>
        </div>
        <div class="qrcodePage" v-if="openPage === 'qrcodePage'">
            <p v-if="error" class="text-danger">{{ error }}</p>
            <qrcode-stream :key="_uid" @decode="onDecode" @init="onInit" :track="paintOutline"/>
        </div>
        <div class="result-wrap">
          <div v-if="result && result.isSuccess === 'Y'" class="mx-5">
          <div class="alert alert-success">
            {{ result.message }}
          </div>
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
                <tr v-for="data in this.result.resultList" :key="data.injNumber">
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
                    <span v-else>{{ data.notice }}</span>
                  </td>
                </tr>
            </tbody>
          </table>
          </div>
          <div v-else-if="result && result.isSuccess === 'N'" class="mx-5">
            <div class="alert alert-danger">
              {{ result.message }}
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import SearchInputComponent from './SearchInput.vue'
import ReserveInputComponent from './ReserveInput.vue'

export default {
  data () {
    return {
      qrcodeParam: '',
      result: '',
      error: '',
      openPage: '',
      clickedMenu: '',
      inputData: {},
      selectedReserveDate: ''
    }
  },
  methods: {
    onDecode (result) {
      let error = null
      if (result.includes('sltung')) {
        if (!result.includes('chart')) {
          error = {
            'title': '條碼錯誤',
            'text': '無病例號'
          }
        } else {
          this.qrcodeParam = result.split('?')[1].split('&')[0].split('=')[1]
          this.getResult(this.qrcodeParam)
        }
      } else {
        error = {
          'title': '條碼錯誤',
          'text': '請掃描本院的慢箋單上的QRcode'
        }
      }
      if (error != null) {
        this.$swal.fire({
          icon: 'danger',
          title: error.title,
          text: error.text
        })
      }
      this.$swal.fire({
        icon: 'danger',
        title: 'test',
        text: result
      })
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
    changePage (page) {
      this.openPage = page
      this.result = null
    },
    getInputDate (val) {
      this.inputData = val
      this.getResult(this.inputData.idOrChart)
    },
    getResult (chart) {
      const tag = 'pvt.pip.injdataIA'
      const wsParam = {
        'wb_base64': 0,
        'chart': chart,
        'tag': 'pvt.pip.getinjdata'
      }
      this.$gows.callWSOffical(tag, wsParam).then((rt) => {
        console.log(rt)
        this.result = rt.val
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
    formatDate (date) {
      let yy = date.substring(0, 4)
      let mm = date.substring(5, 6)
      let dd = date.substring(7, 8)
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
        'mm': (this.result.injDateRange.startDate.substring(5, 6) < 10 ? '0' : '') + (this.result.injDateRange.startDate.substring(5, 6) - 1),
        'dd': (this.result.injDateRange.startDate.substring(7, 8) < 10 ? '0' : '') + this.result.injDateRange.startDate.substring(7, 8)
      }
      let startDate = new Date(temp.yy, temp.mm, temp.dd)
      let temp2 = {
        'yy': this.result.injDueDate.substring(0, 4),
        'mm': (this.result.injDueDate.substring(5, 6) < 10 ? '0' : '') + (this.result.injDueDate.substring(5, 6) - 1),
        'dd': (this.result.injDueDate.substring(7, 8) < 10 ? '0' : '') + this.result.injDueDate.substring(7, 8)
      }
      let endDate = new Date(temp2.yy, temp2.mm, temp2.dd)
      const diff = endDate.getTime() - startDate.getTime()
      const diffDate = diff / (24 * 60 * 60 * 1000)
      console.log(temp, temp2)
      for (let i = 0; i < diffDate; i++) {
        let tempDate = new Date(temp.yy, temp.mm, parseInt(temp.dd) + i)
        let yy = tempDate.getFullYear()
        let mm = (tempDate.getMonth() < 10 ? '0' : '') + (tempDate.getMonth() + 1)
        let dd = (tempDate.getDate() < 10 ? '0' : '') + tempDate.getDate()
        let day = this.formatDay(tempDate.getDay())
        let obj = {
          'value': tempDate,
          'text': yy + '年' + mm + '月' + dd + '日' + '(' + day + ')'
        }
        list.push(obj)
      }
      console.log(list)
      return list
    }
  },
  components: {
    QrcodeStream,
    'search-input-component': SearchInputComponent,
    'reserve-input-component': ReserveInputComponent
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
    .qrcodePage {
      display: flex;
      flex-direction: column;
      justify-content: center;
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
      width: 60%;
      margin: auto
    }
    @media (max-width: 768px) {
      .menu {
        width: 80% !important;
      }
      .result-wrap {
        width: 80% !important;
      }
    }
</style>
