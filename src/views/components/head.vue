<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div
      style="
        padding: 10px 10px 0px 10px;
        justify-content: space-between;
        overflow: hidden;
      "
    >
      <button
        class="btn btn-unactive btn-toShowClinic"
        @click="jumpPage('/ChooseDept')"
        v-if="this.$route.query.deptName != null"
      >
        回科別
      </button>
      <button class="btn btn-unactive btn-toShowClinic" @click="jumpPage('/')">
        回首頁
      </button>
      <div>
        <h1 class="title">
          門診看診進度
          <p v-if="dept.deptName != null" style="display: inline-block">
            -{{ dept.deptName }}
          </p>
        </h1>
      </div>
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
import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.component("loading", Loading);
export default {
  props: {
    reloadnum: {
      type: Number,
    },
  },
  data() {
    return {
      isLoading: false,
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
      this.$router
        .push({
          path: "/ChooseDept",
        })
        .catch((err) => {
          err;
        });
    } else {
      this.dept.deptName = this.$route.query.deptName;
    }
    this.getTime();
    this.setButton();
  },
  methods: {
    jumpPage(str) {
      this.$router.push({
        path: str,
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
      let hh =
        new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      this.today.time = hh + ":" + mf + ":" + ss;
      // this.setButton();
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
      console.log("head setButton：", this.isbtn);
    },
    btn_click(index) {
      this.isbtn = index;
      // this.isLoading = true;
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
