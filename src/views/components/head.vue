<template>
  <div>
    <div style="padding: 10px 10px 0px 10px">
      <h1 @click="srcToHomePage" class="title" v-if="dept.deptName == null">
        門診看診進度
      </h1>
      <h1 @click="srcToHomePage" class="title" v-else>
        門診看診進度 - {{ dept.deptName }}
      </h1>
    </div>
    <div style="padding: 10px 10px 0px 10px">
      <div class="date">
        <span class="date-left">
          <font-awesome-icon icon="fa-solid fa-calendar-days" />
          <span class="date-time"
            >{{ today.date }}
            <span style="color: #ff3434">{{ today.time }}</span></span
          >
        </span>
        <span class="date-right" v-if="dept.deptName !== null">
          *每30秒自動刷新
        </span>
      </div>
      <div class="buttons">
        <button
          :class="{ isactive: isbtn == 0 }"
          class="btn btn-unactive btn-toShowClinic"
          @click="btn_click(0)"
        >
          全部
        </button>
        <button
          :class="{ isactive: isbtn == 1 }"
          class="btn btn-unactivey btn-toShowClinic"
          @click="btn_click(1)"
        >
          上午
        </button>
        <button
          :class="{ isactive: isbtn == 2 }"
          class="btn btn-unactive btn-toShowClinic"
          @click="btn_click(2)"
        >
          下午
        </button>
        <button
          :class="{ isactive: isbtn == 3 }"
          class="btn btn-unactive btn-toShowClinic"
          @click="btn_click(3)"
        >
          晚上
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reloadnum: {
      type: Number,
    },
  },
  data() {
    return {
      isbtn: null,
      deptName: null,
      dept: {
        deptID: null,
        deptName: null,
      },
      today: {
        time: null,
        date: null,
      },
    };
  },
  mounted() {
    if (this.$route.query.deptName == null) {
      this.dept.deptName = null;
    } else {
      this.dept.deptName = this.$route.query.deptName;
    }
    this.getTime();
    this.setButton();
  },
  methods: {
    srcToHomePage() {
      this.$router.push({
        path: "/",
      });
    },
    //! 取得時間
    getTime() {
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
    //!
    setButton() {
      let hh = new Date().getHours();
      if (hh < 12) {
        this.isbtn = 1;
      } else if (hh >= 12 && hh <= 17) {
        this.isbtn = 2;
      } else if (hh > 17) {
        this.isbtn = 3;
      }
      console.log("head set noon -", this.isbtn);
    },
    btn_click(index) {
      this.isbtn = index;
      this.$emit("noon", index);
    },
  },
  watch: {
    reloadnum() {
      this.getTime();
    },
  },
};
</script>
