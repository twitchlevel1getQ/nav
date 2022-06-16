<template>
  <div>
    <!-- <router-link to="/ChooseDept">看診進度</router-link>
    <br>
    <router-link to="/ReservePrescription">慢性病處方箋預約</router-link> -->

    <div class="row justify-content-center">
      <img class="col-md-8 col-lg-6" src="../assets/head.png" alt="看診進度" />
    </div>

    <div class="row justify-content-center">
      <div
        @click="jumpPage('/ChooseDept')"
        class="col-md-4 col-lg-3 division-item"
      >
        <div class="green">
          <h1>看診進度</h1>
        </div>
      </div>

      <div
        @click="jumpPage('/ReservePrescription')"
        class="col-md-4 col-lg-3 division-item"
      >
        <div class="brown">
          <h1>慢性病處方箋預約</h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    jumpPage(src) {
      this.$router.push({
        path: src,
      });
    },
  },
};
</script>
