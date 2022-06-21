<template>
    <div>
        <div class="d-flex flex-column input-data">
            <label for="idOrChart">輸入身分證號或病歷號:</label>
            <input type="text" id="idOrChart" v-model="inputData.idOrChart">
            <label>生日</label>
            <input type="date" v-model="inputData.birthday">
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
      inputData: {
        idOrChart: '1092789',
        birthday: ''
      },
      result: []
    }
  },
  methods: {
    emitInputData () {
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
