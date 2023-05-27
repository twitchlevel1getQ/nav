<template>
  <div class="bg">
    <div class="d-flex justify-content-center">
      <div class="img">
        <img
          style="width: 100%; border-radius: 8px"
          src="../assets/head.png"
          alt="看診進度"
        />
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <div class="img d-flex">
        <div class="home-item" @click="jumpPage('/DivisionProgress')">
          <img
            style="width: 100%; padding: 12px; border-radius: 25px"
            src="../assets/chooseDept.png"
            alt="看診進度"
          />
        </div>
        <div class="home-item" @click="jumpPage('/Registed')">
          <img
            style="width: 100%; padding: 12px; border-radius: 25px"
            src="../assets/patientinquire.png"
            alt="病人查詢"
          />
        </div>
        <!-- <div class="img-item green" style="margin: 12px"></div> -->
      </div>
    </div>
  </div>
</template>
<script>
// import { mapState } from "vuex";
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