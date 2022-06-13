<template>
  <div id="app" style="width: 100%">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      isbtn: 1,
      deptName: null,
      today: {
        time: null,
        date: null,
      },
    };
  },
  mounted() {
    let year = new Date().getFullYear();
    let month =
      new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1;
    let day =
      new Date().getDate() < 10
        ? "0" + new Date().getDate()
        : new Date().getDate();
    this.today.date = year + "/" + month + "/" + day;
    let hh = new Date().getHours();
    let mf =
      new Date().getMinutes() < 10
        ? "0" + new Date().getMinutes()
        : new Date().getMinutes();
    let ss =
      new Date().getSeconds() < 10
        ? "0" + new Date().getSeconds()
        : new Date().getSeconds();
    this.today.time = hh + ":" + mf + ":" + ss;
  },
};
</script>
