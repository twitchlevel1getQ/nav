<template>
    <div>
      <div class="d-flex justify-content-left" style="margin: 12px">
        <div class="img d-flex justify-content-left rollback" @click="goback()">
            « 上一頁
        </div>
      </div>
      <h1 class="title">掛號查詢</h1>

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
  