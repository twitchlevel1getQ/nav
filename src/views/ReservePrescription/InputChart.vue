<template>
    <div>
        <div class="d-flex flex-column">
            <label for="idOrChart">輸入身分證號或病歷號:</label>
            <input type="text" id="idOrChart" v-model="inputData.idOrChart">
            <label>生日</label>
            <input type="date" v-model="inputData.birthday">
            <button class="btn btn-primary mt-3" @click="getSearchResult()">{{buttonName}}</button>
        </div>
        <br>
        <div v-if="this.result" class="mt-3">
            <div v-if="this.result.isSuccess === 'Y'">
                <div class="alert alert-success">
                    {{ this.result.message }}
                </div>
                <div>
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
        <!-- {{ this.result }} -->
    </div>
</template>

<script>
export default {
  props: {
    clickedType: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      inputData: {
        idOrChart: '1092789',
        birthday: ''
      },
      result: []
    }
  },
  methods: {
    getSearchResult () {
      const tag = 'pvt.pip.injdataIA'
      const wsParam = {
        'wb_base64': 0,
        'chart': this.inputData.idOrChart,
        'tag': 'pvt.pip.getinjdata'
      }
      this.$gows.callWSOffical(tag, wsParam).then((rt) => {
        console.log(rt)
        this.result = rt.val
      })
    }
  },
  computed: {
    buttonName () {
      let returnButtonName = ''
      if (this.clickedType === 'reserve') {
        returnButtonName = '預約'
      } else if (this.clickedType === 'search') {
        returnButtonName = '查詢'
      } else if (this.clickedType === 'cancel') {
        returnButtonName = '取消'
      }
      return returnButtonName
    }
  }
}
</script>
