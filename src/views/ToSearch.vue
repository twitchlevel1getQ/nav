<template>
  <div>
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
      <div class="img d-flex justify-content-start w-60">
        <div class="context-item color2" @click="jumpPage('/ChooseDept')">
          <p>門診查詢</p>
        </div>
        <div class="context-item color1" @click="jumpPage('/Registed')">
          <p>掛號查詢</p>
        </div>
        <div class="context-item-empty"></div>
      </div>
    </div>
    <div class="d-flex justify-content-center" style="margin: 12px">
      <div class="img d-flex justify-content-center rollback" @click="goback()">
        上一頁
      </div>
    </div>
    <!-- <div class="row justify-content-center">
      <div
        @click="jumpPage('/ChooseDept')"
        class="col-md-4 col-lg-3 division-item"
      >
        <div class="brown">
          <h1>門診查詢</h1>
        </div>
      </div>

      <div
        @click="jumpPage('/Registed')"
        class="col-md-4 col-lg-3 division-item"
      >
        <div class="green">
          <h1>掛號查詢</h1>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
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
