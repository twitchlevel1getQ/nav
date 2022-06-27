<template>
    <div>
        <div class="d-flex flex-column input-data">
            <label for="idOrChart">輸入身分證號或病歷號:</label>
            <input type="text" id="idOrChart" v-model="inputData.idOrChart" @keyup.enter="emitInputData()">
            <label for="idOrChart">輸入處方號:</label>
            <input type="text" id="idOrChart" v-model="inputData.injNumber" @keyup.enter="emitInputData()">
            <button class="btn btn-primary mt-3" @click="emitInputData()" >{{ buttonName }}</button>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    clickedType: {
      type: String
    }
  },
  data () {
    return {
      inputData: {
        idOrChart: '',
        injNumber: ''
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
      let name
      if (this.clickedType === 'reserve') {
        name = '進行預約'
      } else if (this.clickedType === 'cancel') {
        name = '取消預約'
      }
      return name
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
