<template>
  <div style="width: 100%">
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
        <div class="context-item color1" @click="jumpPage('/ToSearch')">
          <p>看診進度</p>
        </div>
        <div
          class="context-item color2"
          @click="jumpPage('/ReservePrescription')"
        >
          <p>慢性病處方箋預約</p>
        </div>
        <div class="context-item-empty"></div>
      </div>
    </div>
    <div class="d-flex justify-content-center" style="margin: 12px">
      <div class="img d-flex justify-content-center rollback" @click="goback()">
        上一頁
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch("updateArea", 1);
  },
  methods: {
    goback() {
      this.$router.back();
    },
    jumpPage(src) {
      this.$router.push({
        path: src,
      });
    },
  },
};
</script>
