<template>
  <div :class="containerClass">
    <div class="logo-img"></div>
    <div class="topfont">
      <span class="text">2023年1月5日</span>
    </div>
    <div class="topfont2">
      <span class="text">星期四</span>
    </div>
    <div class="topfont3">
      <span class="text">12:30</span>
    </div>
    <div class="topfont4">
      <span class="text2">晴時多雲</span>
    </div>
    <div class="topfont5">
      <span class="text2"></span>
    </div>
    <div class="topfont6">
      <span class="text">22~30</span>
    </div>
    <div class="topfont7">
      <span class="text2"></span>
    </div>
    <div :class="['rgpage-boxEX1', responsivePositionClass]">
      <div class="rgpage-imgEX1"></div>
      <div class="rgpage-fontEX">藥品查詢</div>
    </div>
    <div :class="['rgpage-boxEX2', responsivePositionClass2]">
      <div class="rgpage-imgEX2"></div>
      <div class="rgpage-fontEX">門診時刻表</div>
    </div>
    <div :class="['rgpage-boxEX3', responsivePositionClass3]">
      <div class="rgpage-imgEX3"></div>
      <div class="rgpage-fontEX">住院流程</div>
    </div>
    <div :class="['rgpage-boxEX4', responsivePositionClass4]">
      <div class="rgpage-imgEX4"></div>
      <div class="rgpage-fontEX">Language</div>
    </div>

    <div class="containerbox">
      <div :class="['rgpage-box', resPositionClass]">
        <div class="rgpage-img"></div>
        <div class="rgpage-font">掛號查詢</div>
      </div>
      <div :class="['rgpage-box2', resPositionClass]" @click="jumpPage('/rgpage')">
        <div class="box2-img"></div>
        <div class="rgpage-font">門診掛號</div>
      </div>
    </div>
    <div class="containerbox">
      <div :class="['rgpage-box3', resPositionClass]" @click="jumpPage('/ReservePrescription')">
        <div class="box3-img"></div>
        <div class="box3-font">慢籤領藥</div>
      </div>
      <div :class="['rgpage-box4', resPositionClass]" @click="jumpPage('/ChooseDept')">
        <div class="box4-img"></div>
        <div class="box4-font">看診進度</div>
      </div>
      <div :class="['rgpage-box5', resPositionClass]">
        <div class="box5-img"></div>
        <div class="box5-font">該看哪科</div>
      </div>
    </div>
    <div class="containerbox">
      <div :class="['rgpage-box3row back6', resPositionClass]">
        <div class="box6-img"></div>
        <div class="box3-font">抽血檢驗</div>
      </div>
      <div :class="['rgpage-box3row2 back7', resPositionClass]">
        <div class="box7-img"></div>
        <div class="box3-font">交通指引</div>
      </div>
      <div :class="['rgpage-box3row2 back8', resPositionClass]">
        <div class="box8-img"></div>
        <div class="box5-font">樓層配置</div>
      </div>
      <div :class="['rgpage-box3row2 back9', resPositionClass]">
        <div class="box9-img"></div>
        <div class="box5-font">就醫指南</div>
      </div>
    </div>
    <div :class="bottomfont">
      <span :class="textbs">誠懇謙卑．感動服務．品質為先．創新卓越</span>
    </div>
  </div>
</template>
<script>
// import VueTouch from 'vue2-touch-events'

export default {
  data() {
    return {
      windowWidth: window.innerWidth,
      windowOrientation: window.screen.orientation.type, // 初始化窗口方向
    };
  },
  mounted() {
    this.$store.dispatch("updateArea", 1);
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("orientationchange", this.handleOrientationChange);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener(
      "orientationchange",
      this.handleOrientationChange
    );
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    handleOrientationChange() {
      this.windowOrientation = window.screen.orientation.type;
    },
    changelanguage(lang) {
      this.$store.dispatch("updlanguage", lang);
    },
    touchHandler() {
      alert("touchHandler");
    },
    swipeHandler(msg) {},
    goback() {
      this.$router.back();
    },
    jumpPage(src) {
      this.$router.push({
        path: src,
      });
    },
  },
  computed: {
    resPositionClass() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "smallbox";
      } else {
        return "";
      }
    },
    responsivePositionClass() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "smalltype";
      } else {
        return "";
      }
    },
    responsivePositionClass2() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "smalltype2";
      } else {
        return "";
      }
    },
    responsivePositionClass3() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "smalltype3";
      } else {
        return "";
      }
    },
    responsivePositionClass4() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "smalltype4";
      } else {
        return "";
      }
    },
    containerClass() {
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "bg-small"; // 窗口宽度小于等于 1081 时应用的样式类
      } else {
        return "bg-large"; // 窗口宽度大于 1081 时应用的样式类
      }
    },
    bottomfont() {
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "bottomfont-small"; // 窗口宽度小于等于 1081 时应用的样式类
      } else {
        return "bottomfont-large"; // 窗口宽度大于 1081 时应用的样式类
      }
    },
    textbs() {
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "text"; // 窗口宽度小于等于 1081 时应用的样式类
      } else {
        return "text2"; // 窗口宽度大于 1081 时应用的样式类
      }
    },
  },
};
</script>
<style scoped>
.rgpage-fontEX {
  /* Layout Properties */
  top: 17px;
  left: -2px;
  width: 650px;
  height: 77px;
  padding: 2px 2px 2px;
  position: relative;

  /* UI Properties */
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    55px/64px var(--unnamed-font-family-arial);
  color: var(--unnamed-color-ffffff);
  text-align: left;
  font: normal normal bold 30px/36px Arial;
  letter-spacing: 1.65px;
  color: #ffffff;
  text-shadow: 0px 3px 6px #00000029;
  opacity: 1;
}
.rgpage-imgEX4 {
  top: 67px;
  left: 20px;
  width: 180px;
  height: 180px;
  position: relative;
  background: transparent url("../../../public/images/icon-global.svg") 0% 0%
    no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}
.rgpage-imgEX3 {
  top: 67px;
  left: 20px;
  width: 180px;
  height: 180px;
  position: relative;
  background: transparent url("../../../public/images/icon-patient.svg") 0% 0%
    no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}
.rgpage-imgEX2 {
  top: 67px;
  left: 20px;
  width: 180px;
  height: 180px;
  position: relative;
  opacity: 1;
  background: transparent url("../../../public/images/icon-calendar.png") 0% 0%
    no-repeat padding-box;
  margin-right: 20px;
}
.rgpage-boxEX4 {
  /* Layout Properties */
  justify-content: flex-start; /* 将 justify-content 设置为 flex-start */
  display: flex;
  align-items: center;
  position: absolute;
  /* Layout Properties */
  top: 860px;
  left: 1630px;
  width: 240px;
  height: 100px;
  /* UI Properties */
  background: transparent linear-gradient(180deg, #4c9cde 0%, #1d66bf 100%) 0%
    0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
}
.rgpage-boxEX3 {
  /* Layout Properties */
  justify-content: flex-start; /* 将 justify-content 设置为 flex-start */
  display: flex;
  align-items: center;
  position: absolute;
  /* Layout Properties */
  top: 748px;
  left: 1630px;
  width: 240px;
  height: 100px;
  /* UI Properties */
  background: transparent linear-gradient(180deg, #4c9cde 0%, #1d66bf 100%) 0%
    0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
}
.rgpage-boxEX2 {
  /* Layout Properties */
  justify-content: flex-start; /* 将 justify-content 设置为 flex-start */
  display: flex;
  align-items: center;
  position: absolute;
  /* Layout Properties */
  top: 636px;
  left: 1630px;
  width: 240px;
  height: 100px;
  /* UI Properties */
  background: transparent linear-gradient(180deg, #4c9cde 0%, #1d66bf 100%) 0%
    0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
}
.rgpage-imgEX1 {
  top: 67px;
  left: 20px;
  width: 180px;
  height: 180px;
  position: relative;
  background: transparent url("../../../public/images/icon-pill.svg") 0% 0%
    no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}
.rgpage-boxEX1 {
  /* Layout Properties */
  justify-content: flex-start; /* 将 justify-content 设置为 flex-start */
  display: flex;
  align-items: center;
  position: absolute;
  /* Layout Properties */
  top: 524px;
  left: 1630px;
  width: 240px;
  height: 100px;
  /* UI Properties */
  background: transparent linear-gradient(180deg, #4c9cde 0%, #1d66bf 100%) 0%
    0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
}
.logo-img {
  /* Layout Properties */
  position: relative;
  top: 30px;
  left: 80px;
  width: 620px;
  height: 130px;
  /* UI Properties */
  background: transparent url("../../../public/images/logo.svg") 0% 0% no-repeat
    padding-box;
  opacity: 1;
}
.rgpage-box3row2 {
  align-items: center;
  position: relative;
  top: 114px;
  width: 240px;
  height: 240px;
  /* UI Properties */
  background: transparent linear-gradient(135deg, #4c9cde 0%, #1d66bf 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 0px 15px #2c5e4b;
  border-radius: 8px;
  opacity: 1;
}
.rgpage-box3row {
  align-items: center;
  position: relative;
  top: 114px;
  left: 60px;
  width: 240px;
  height: 240px;
  /* UI Properties */
  background: transparent linear-gradient(135deg, #4c9cde 0%, #1d66bf 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 0px 15px #2c5e4b;
  border-radius: 8px;
  opacity: 1;
}
.rgpage-box5 {
  /* Layout Properties */
  /* display: flex; */
  align-items: center;
  position: relative;
  top: 102px;
  left: 84px;
  width: 240px;
  height: 240px;
  /* UI Properties */
  background: transparent linear-gradient(135deg, #4c9cde 0%, #1d66bf 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 0px 15px #2c5e4b;
  border-radius: 8px;
  opacity: 1;
}
.rgpage-box4 {
  /* Layout Properties */
  display: flex;
  align-items: center;
  position: relative;
  top: 102px;
  left: 72px;
  width: 492px;
  height: 240px;
  /* UI Properties */
  background: transparent linear-gradient(134deg, #cca96f 0%, #917548 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 0px 15px #2c5e4b;
  border-radius: 8px;
  opacity: 1;
}
.rgpage-box3 {
  /* Layout Properties */
  /* display: flex; */
  align-items: center;
  position: relative;
  top: 102px;
  left: 60px;
  width: 240px;
  height: 240px;
  /* UI Properties */
  background: transparent linear-gradient(135deg, #d66081 0%, #af2b4f 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 8px;
  opacity: 1;
}
.rgpage-box2 {
  /* Layout Properties */
  justify-content: flex-start; /* 将 justify-content 设置为 flex-start */
  display: flex;
  align-items: center;
  position: relative;
  top: 90px;
  left: 72px;
  width: 476px;
  height: 240px;
  /* UI Properties */
  background: transparent linear-gradient(134deg, #eaa74c 0%, #ce7d36 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 0px 15px #2c5e4b;
  border-radius: 8px;
  opacity: 1;
}
.rgpage-box {
  /* Layout Properties */
  justify-content: flex-start; /* 将 justify-content 设置为 flex-start */
  display: flex;
  align-items: center;
  position: relative;
  top: 90px;
  left: 60px;
  width: 492x;
  height: 240px;
  /* UI Properties */
  background: transparent linear-gradient(134deg, #60bfc1 0%, #379698 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 0px 15px #2c5e4b;
  border-radius: 8px;
  opacity: 1;
}
.rgpage-img {
  top: 0px;
  left: 24px;
  width: 180px;
  height: 180px;
  background: transparent url("../../../public/images/icon-掛號查詢.svg") 0% 0%
    no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}
.box2-img {
  top: 0px;
  left: 24px;
  width: 180px;
  height: 180px;
  background: transparent url("../../../public/images/icon-門診掛號.svg") 0% 0%
    no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}
.box6-img {
  top: 16px;
  left: 55px;
  width: 180px;
  height: 160px;
  position: relative;
  background: transparent url("../../../public/images/icon-抽血檢驗.svg") 0% 0%
    no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}
.box7-img {
  top: 16px;
  left: 55px;
  width: 180px;
  height: 160px;
  position: relative;
  background: transparent url("../../../public/images/icon-交通指引.svg") 0% 0%
    no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}
.box8-img {
  top: 16px;
  left: 55px;
  width: 180px;
  height: 160px;
  position: relative;
  background: transparent url("../../../public/images/icon-樓層配置.svg") 0% 0%
    no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}
.box9-img {
  top: 16px;
  left: 55px;
  width: 180px;
  height: 160px;
  position: relative;
  background: transparent url("../../../public/images/icon-就醫指南.svg") 0% 0%
    no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}
.box3-img {
  top: 16px;
  left: 55px;
  width: 180px;
  height: 160px;
  position: relative;
  background: transparent url("../../../public/images/icon-慢箋領藥.svg") 0% 0%
    no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}
.box3-font {
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    var(--unnamed-font-size-38) / var(--unnamed-line-spacing-43)
    var(--unnamed-font-family-arial);
  letter-spacing: var(--unnamed-character-spacing-1-14);
  color: var(--unnamed-color-ffffff);
  text-align: center;
  font: normal normal bold 38px/43px Arial;
  letter-spacing: 1.14px;
  color: #ffffff;
  text-shadow: 0px 3px 6px #00000029;
  opacity: 1;
}
.box4-img {
  top: 0px;
  left: 34px;
  width: 180px;
  height: 180px;
  position: relative;
  background: transparent url("../../../public/images/icon-看診進度.svg") 0% 0%
    no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}
.box4-font {
  /* Layout Properties */
  top: 530px;
  left: 560px;
  width: 300px;
  height: 77px;
  /* UI Properties */
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    55px/64px var(--unnamed-font-family-arial);
  color: var(--unnamed-color-ffffff);
  text-align: center;
  font: normal normal bold 55px/64px Arial;
  letter-spacing: 1.65px;
  color: #ffffff;
  text-shadow: 0px 3px 6px #00000029;
  opacity: 1;
}
.box5-img {
  top: 16px;
  left: 55px;
  width: 180px;
  height: 160px;
  position: relative;
  background: transparent url("../../../public/images/icon-該看哪科.svg") 0% 0%
    no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}
.box5-font {
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    var(--unnamed-font-size-38) / var(--unnamed-line-spacing-43)
    var(--unnamed-font-family-arial);
  letter-spacing: var(--unnamed-character-spacing-1-14);
  color: var(--unnamed-color-ffffff);
  text-align: center;
  font: normal normal bold 38px/43px Arial;
  letter-spacing: 1.14px;
  color: #ffffff;
  text-shadow: 0px 3px 6px #00000029;
  opacity: 1;
}
.rgpage-font {
  /* Layout Properties */
  top: 10px;
  left: 0px;
  width: 250px;
  height: 77px;
  padding: 2px 2px 2px;
  /* UI Properties */
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    55px/64px var(--unnamed-font-family-arial);
  color: var(--unnamed-color-ffffff);
  text-align: center;
  font: normal normal bold 55px/64px Arial;
  letter-spacing: 1.65px;
  color: #ffffff;
  text-shadow: 0px 3px 6px #00000029;
  opacity: 1;
}
.rgpage-img,
.box2-img,
.rgpage-font {
  flex: 0 0 auto;
  position: relative;
}

.rgpage-box {
  flex: 1; /* 兩個子元素平均佔據可用空間 */
}

.containerbox {
  display: flex; /* 將容器設置為彈性盒子 */
  flex-direction: row;
  /* width: 55%; */
  width: 984px;
}
.box {
  flex: 1; /* 兩個子元素平均佔據可用空間 */
  height: 100px;
  background-color: gray;
}
.bg {
  min-width: 1920px;
  min-height: 1080px;
  background: transparent url("../../../public/images/bg-03.png") 0% 0%
    no-repeat padding-box;
  opacity: 1;
  width: 100vw;
  height: 100vh;
  position: relative;
}
.bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../../../public/images/bg-03.png") 0% 0% no-repeat
    padding-box;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.back6 {
  background: transparent linear-gradient(135deg, #959595 0%, #676767 100%) 0%
    0% no-repeat padding-box;
}
.back7 {
  background: transparent linear-gradient(135deg, #387caf 0%, #1e4867 100%) 0%
    0% no-repeat padding-box;
  left: 72px;
}
.back8 {
  background: transparent linear-gradient(135deg, #eab944 0%, #b88e2f 100%) 0%
    0% no-repeat padding-box;
  left: 84px;
}
.back9 {
  background: transparent linear-gradient(135deg, #04af7a 0%, #01835a 100%) 0%
    0% no-repeat padding-box;
  left: 96px;
}
.bottomfont-large {
  /* Layout Properties */
  position: relative;
  top: 162px;
  left: 293px;
  width: 570px;
  height: 44px;
  /* UI Properties */
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    var(--unnamed-font-size-30) / var(--unnamed-line-spacing-36)
    var(--unnamed-font-family-noto-sans-tc);
  letter-spacing: var(--unnamed-character-spacing-0);
  color: var(--unnamed-color-ffffff);
  text-align: left;
  font: normal normal bold 30px/36px Noto Sans TC;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
.bottomfont-small {
  /* Layout Properties */
  position: relative;
  top: 701px;
  left: 132px;
  width: 817px;
  height: 62px;
  /* UI Properties */
  font: var(--unnamed-font-style-normal) normal
    var(--unnamed-font-weight-medium) 43px/67px
    var(--unnamed-font-family-noto-sans-tc);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: center;
  font: normal normal medium 860px/1340px Noto Sans TC;
  letter-spacing: 0px;
  color: #e5e5e5;
  opacity: 1;
}
.topfont {
  /* Layout Properties */
  top: 50px;
  left: 1106px;
  width: 448px;
  height: 56px;
  position: absolute;

  /* UI Properties */
  color: var(--unnamed-color-ffffff);
  text-align: left;
  font: normal normal medium 40px/50px Futura;
  letter-spacing: 2px;
  color: #ffffff;
  opacity: 1;
}
.topfont2 {
  /* Layout Properties */
  top: 50px;
  left: 1395px;
  width: 144px;
  height: 56px;
  position: absolute;

  /* UI Properties */
  font: var(--unnamed-font-style-normal) normal
    var(--unnamed-font-weight-medium) var(--unnamed-font-size-40) / 50px
    var(--unnamed-font-family-futura);
  color: var(--unnamed-color-ffffff);
  text-align: left;
  font: normal normal medium 40px/50px Futura;
  letter-spacing: 2px;
  color: #ffffff;
  opacity: 1;
}
.topfont3 {
  /* Layout Properties */
  top: 50px;
  left: 1554px;
  width: 116px;
  height: 52px;
  position: absolute;

  /* UI Properties */
  font: var(--unnamed-font-style-normal) normal
    var(--unnamed-font-weight-medium) var(--unnamed-font-size-40) / 50px
    var(--unnamed-font-family-futura);
  color: var(--unnamed-color-ffffff);
  text-align: left;
  font: normal normal medium 40px/50px Futura;
  letter-spacing: 2px;
  color: #ffffff;
  opacity: 1;
}
.topfont4 {
  /* Layout Properties */
  top: 50px;
  left: 1712px;
  width: 60px;
  height: 80px;
  position: absolute;

  /* UI Properties */
  font: var(--unnamed-font-style-normal) normal
    var(--unnamed-font-weight-medium) var(--unnamed-font-size-30) /
    var(--unnamed-line-spacing-36) var(--unnamed-font-family-noto-sans-tc);
  letter-spacing: var(--unnamed-character-spacing-0);
  color: var(--unnamed-color-ffffff);
  text-align: left;
  font: normal normal medium 30px/36px Noto Sans TC;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
.topfont5 {
  /* Layout Properties */
  top: 50px;
  left: 1782px;
  width: 78px;
  height: 78px;
  position: absolute;

  /* UI Properties */
  background: transparent url("../../../public/images/天象.svg") 0% 0% no-repeat
    padding-box;
  opacity: 1;
}
.topfont6 {
  /* Layout Properties */
  top: 130px;
  left: 1712px;
  width: 114px;
  height: 58px;
  position: absolute;
  /* UI Properties */
  font: var(--unnamed-font-style-normal) normal
    var(--unnamed-font-weight-medium) var(--unnamed-font-size-40) /
    var(--unnamed-line-spacing-49) var(--unnamed-font-family-noto-sans-tc);
  letter-spacing: var(--unnamed-character-spacing-0);
  color: var(--unnamed-color-ffffff);
  text-align: left;
  font: normal normal medium 40px/49px Noto Sans TC;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
.topfont7 {
  top: 127px;
  left: 1820px;
  width: 39px;
  height: 58px;
  position: absolute;
  background: transparent url("../../../public/images/度.svg") 0% 0% no-repeat
    padding-box;
  mix-blend-mode: normal;
  opacity: 1;
}
.text {
  font-size: 40px;
  font-family: Futura;
}
.text2 {
  font-size: 30px;
  font-family: Futura;
}
body {
  margin-left: 0%;
}
/* CSS重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* 其他重置样式 */
}
div {
  user-select: none;
}
.smalltype {
  /* Layout Properties */
  top: 1426px;
  left: 53px;
  width: 220px;
  height: 120px;

  /* UI Properties */
  background: transparent linear-gradient(180deg, #4c9cde 0%, #1d66bf 100%) 0%
    0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
}
.smalltype2 {
  /* Layout Properties */
  top: 1426px;
  left: 294px;
  width: 230px;
  height: 120px;
  /* UI Properties */
  background: transparent linear-gradient(180deg, #4c9cde 0%, #1d66bf 100%) 0%
    0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
}
.smalltype3 {
  /* Layout Properties */
  top: 1426px;
  left: 546px;
  width: 230px;
  height: 120px;
  /* UI Properties */
  background: transparent linear-gradient(180deg, #4c9cde 0%, #1d66bf 100%) 0%
    0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
}
.smalltype4 {
  /* Layout Properties */
  top: 1426px;
  left: 798px;
  width: 225px;
  height: 120px;
  /* UI Properties */
  background: transparent linear-gradient(180deg, #4c9cde 0%, #1d66bf 100%) 0%
    0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
}.smallbox {
top: 500px;
left: 42px;
width: 492px;
height: 240px;
margin: 12px;
}
</style>
