<template>
  <div style="height: 100vh">
    <header class="navbar">
        <div class="ms-2 fs-3">
            慢性病處方箋預約
        </div>
    </header>
    <nav class="menu border rounded-top  m-auto">
      <span class="p-2 cursor-pointer" :class="{'text-danger': clickedMenu == 'reserve'}"  @click="clickMenu('reserve')">預約</span>
      <span class="p-2 cursor-pointer" :class="{'text-danger': clickedMenu == 'search'}"  @click="clickMenu('search')">查詢</span>
      <span class="p-2 cursor-pointer" :class="{'text-danger': clickedMenu == 'cancel'}"  @click="clickMenu('cancel')">取消</span>
    </nav>
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
          <input-component :clickedType="clickedMenu" @update-data="getInputDate"></input-component>
        </div>
        <div class="qrcodePage" v-if="openPage === 'qrcodePage'">
            <p v-if="error" class="text-danger">{{ error }}</p>
            {{ qrcodeParam }}
            <qrcode-stream @decode="onDecode" @init="onInit" />
        </div>
        <div v-if="result" class="mx-5">
          <table class="table table-bordered">
            <thead>
                <tr>
                  <th>科別</th>
                  <th>開始日期</th>
                  <th>結束日期</th>
                  <th>狀態</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in this.result.resultList" :key="data.injNumber">
                  <td>{{ data.deptName }}</td>
                  <td>{{ data.injDateRange.startDate }}</td>
                  <td>{{ data.injDateRange.endDate }}</td>
                  <td>{{ data.notice }}</td>
                </tr>
            </tbody>
        </table>
        </div>

    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import inputComponent from './InputChart.vue'

export default {
  data () {
    return {
      qrcodeParam: '',
      result: '',
      error: '',
      openPage: '',
      clickedMenu: '',
      inputData: {}
    }
  },
  methods: {
    onDecode (result) {
      this.qrcodeParam = result.split('?')[1].split('&')[0].split('=')[1]
      this.getResult(this.qrcodeParam)
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
    clickMenu (menu) {
      this.clickedMenu = menu
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
    }

  },
  components: {
    QrcodeStream,
    'input-component': inputComponent
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
    @media (max-width: 768px) {
      .menu {
        width: 80% !important;
      }
    }
</style>
