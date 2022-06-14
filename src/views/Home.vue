<template>
  <div>
    <div class="row justify-content-center">
      <img class="col-md-8 col-lg-6" src="../assets/head.png" alt="看診進度" />
    </div>

    <div class="row justify-content-center">
      <img
        @click="jumpPage('/DivisionProgress')"
        class="col-md-4 col-lg-3 img-item"
        src="../assets/chooseDept.png"
        alt="看診進度"
      />
      <img
        @click="jumpPage('/PatientInquire')"
        class="col-md-4 col-lg-3 img-item"
        src="../assets/patientinquire.png"
        alt="病人查詢"
      />
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    jumpPage(str) {
      this.$router
        .push({
          path: str,
        })
        .catch((err) => {
          err;
        });
    },
  },
};
</script>