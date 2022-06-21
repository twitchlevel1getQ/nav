<template>
  <div>
    <div class="row justify-content-center">
      <img class="col-md-8 col-lg-6" src="../assets/head.png" alt="看診進度" />
    </div>

    <div class="row justify-content-center">
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
