<template>
    <div>
        <div class="d-flex flex-column input-data">
            <label for="idOrChart">輸入身分證號或病歷號:</label>
            <input type="text" id="idOrChart" v-model="inputData.idOrChart">
            <label for="idOrChart">輸入處方號:</label>
            <input type="text" id="idOrChart" v-model="inputData.injNumber">
            <button class="btn btn-primary mt-3" @click="emitInputData()">進行預約</button>
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
        idOrChart: '-32',
        injNumber: ''
      },
      result: []
    }
  },
  methods: {
    emitInputData () {
      this.$emit('update-data', this.inputData)
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
