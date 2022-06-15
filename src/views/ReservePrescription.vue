<template>
  <div>
    <header class="navbar">
        <div class="ms-2 fs-3">
            慢性病處方箋預約
        </div>
    </header>
    <div class="content">
        <!-- // TODO key 病例號處方號 -->
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
        <div v-if="openPage === 'qrcodePage'">
            <p class="text-danger">{{ error }}</p>
            <p class="decode-result">
            Last result: <b>{{ result }}</b>
            </p>
            <qrcode-stream @decode="onDecode" @init="onInit" />
        </div>
        <div class="inputPage" v-if="openPage === 'inputPage'">
            <input type="text" placeholder="輸入病歷號">
            <input type="text" placeholder="輸入處方號">
            <button class="btn">查詢</button>
        </div>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  data () {
    return {
      result: '',
      error: '',
      openPage: ''
    }
  },
  methods: {
    onDecode (result) {
      this.result = result
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
    changePage (page) {
      this.openPage = page
    }

  },
  components: {
    QrcodeStream
  }
}
</script>
<style scope>
    .navbar {
        z-index: 30;
        height: 3.6rem;
        border-bottom: 1px solid #eaecef;
    }
    .content {
        margin-top: 2rem;
    }
    .button-set {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
    .inputPage {
        margin: 1rem 2rem;
        display: flex;
        flex-direction: column;
        height: 50vh;
    }
</style>
