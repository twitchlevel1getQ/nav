<template>
  <div>
    患者查詢
    <button class="btn btn-unactive btn-toShowClinic" @click="jumpPage('/Navigator')">
      回首頁
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    jumpPage(str) {
      this.$router.push({
        path: str,
      });
    },
  },
};
</script>
