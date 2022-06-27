<template>
    <div>
        <div class="d-flex flex-column input-data">
            <label for="idOrChart">輸入身分證號或病歷號:</label>
            <input type="text" id="idOrChart" v-model="inputData.idOrChart" @keyup.enter="emitInputData()">
            <label for="month">出生月</label>
            <select v-model="selectedMonth" id="month">
              <option v-for="option in month" :key="option.text" :value="option.value">{{option.text}}</option>
            </select>
            <label for="date">出生日</label>
            <select v-model="selectedDate" id="date">
              <option v-for="option in date" :key="option.text" :value="option.value">{{option.text}}</option>
            </select>
            <button class="btn btn-primary mt-3" @click="emitInputData()">{{buttonName}}</button>
        </div>
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
      selectedMonth: '',
      selectedDate: '',
      inputData: {
        idOrChart: ''
      }
    }
  },
  methods: {
    emitInputData () {
      this.inputData['birthday'] = this.selectedMonth + this.selectedDate
      console.log(this.inputData)
      this.$emit('update-data', this.inputData)
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
    },
    month () {
      let res = []
      let list = [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ]
      list.forEach((element, index) => {
        let i = index + 1
        let temp = {
          text: element,
          value: (i < 10) ? '0' + i : i
        }
        res.push(temp)
      })
      return res
    },
    date () {
      let res = []
      for (let i = 1; i <= 31; i++) {
        let temp = {
          text: i,
          value: (i < 10) ? '0' + i : i
        }
        res.push(temp)
      }
      return res
    }
  }
}
</script>

<style scope>
    .input-data{
        width: 50vw;
        margin: auto;
    }
    @media (min-width: 768px) {
        .input-data{
            width: auto;
        }
    }
</style>
