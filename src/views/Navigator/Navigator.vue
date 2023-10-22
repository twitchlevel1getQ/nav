<template>
  <div :class="containerClass">
    <div class="logo-img"></div>
    <div :class="['topfont', topfont2Class]">
      <span class="text1">2023年1月5日</span>
    </div>
    <div :class="['topfont2', topfont3Class]">
      <span class="text1">星期四</span>
    </div>
    <div :class="['topfont3', topfont1Class]">
      <span :class="bigtext">12:30</span>
    </div>
    <div :class="['topfont4', topfont4Class]">
      <span class="text2">晴時多雲</span>
    </div>
    <div :class="['topfont5', topfont5Class]">
      <span class="text2"></span>
    </div>
    <div :class="['topfont6', topfont6Class]">
      <span class="text">22~30</span>
    </div>
    <div :class="['topfont7', topfont7Class]">
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

    <div :class="boxfather">
      <div :class="containerbox">
        <div :class="['rgpage-box', resPositionClass2]">
          <div class="rgpage-img"></div>
          <div class="rgpage-font">掛號查詢</div>
        </div>
        <div :class="['rgpage-box2', resPositionClass2]" @click="jumpPage('/rgpage')">
          <div class="box2-img"></div>
          <div class="rgpage-font">門診掛號</div>
        </div>
      </div>
      <div :class="containerbox">
        <div :class="['rgpage-box3', resPositionClass]" @click="jumpPage('/ReservePrescription')">
          <div :class="['box3-img', imgclass1]"></div>
          <div class="rgpage-font2">慢籤領藥</div>
        </div>
        <div :class="['rgpage-box4', resPositionClass2]" @click="jumpPage('/ChooseDept')">
          <div :class="['box4-img', imgclass2]"></div>
          <div class="rgpage-font">看診進度</div>
        </div>
        <div :class="['rgpage-box5', resPositionClass]">
          <div :class="['box5-img', imgclass1]"></div>
          <div class="rgpage-font2">該看哪科</div>
        </div>
      </div>
      <div :class="containerbox">
        <div :class="['rgpage-box3row back6', resPositionClass]">
          <div :class="['box6-img', imgclass1]"></div>
          <div class="rgpage-font2">抽血檢驗</div>
        </div>
        <div :class="['rgpage-box3row2 back7', resPositionClass]">
          <div :class="['box7-img', imgclass1]"></div>
          <div class="rgpage-font2">交通指引</div>
        </div>
        <div :class="['rgpage-box3row2 back8', resPositionClass]">
          <div :class="['box8-img', imgclass1]"></div>
          <div class="rgpage-font2">樓層配置</div>
        </div>
        <div :class="['rgpage-box3row2 back9', resPositionClass]">
          <div :class="['box9-img', imgclass1]"></div>
          <div class="rgpage-font2">就醫指南</div>
        </div>
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
    swipeHandler(msg) { },
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

    boxfather() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "father-s";
      } else {
        return "father-b";
      }
    }, containerbox() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "c-box-s";
      } else {
        return "c-box-b";
      }
    }, bigtext() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "text3";
      } else {
        return "text";
      }
    }, resPositionClass() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "smallbox";
      } else {
        return "";
      }
    }, resPositionClass2() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "smallbox-2";
      } else {
        return "";
      }
    },imgclass2() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "simg-2";
      } else {
        return "";
      }
    },imgclass1() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "simg-1";
      } else {
        return "";
      }
    },
    topfont1Class() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "smalltopfont1";
      } else {
        return "";
      }
    },
    topfont2Class() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "smalltopfont2";
      } else {
        return "";
      }
    }, topfont3Class() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "smalltopfont3";
      } else {
        return "";
      }
    }, topfont4Class() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "smalltopfont4";
      } else {
        return "";
      }
    }, topfont7Class() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "smalltopfont7";
      } else {
        return "";
      }
    }, topfont6Class() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "smalltopfont6";
      } else {
        return "";
      }
    }, topfont5Class() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "smalltopfont5";
      } else {
        return "";
      }
    }, responsivePositionClass() {
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
        return "text1"; // 窗口宽度小于等于 1081 时应用的样式类
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
  top: 0;
  left: 0;
  width: 80%;
  height: 0;
  padding: 2px 2px 2px;
  position: relative;

  /* UI Properties */
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) 55px/64px var(--unnamed-font-family-arial);
  color: var(--unnamed-color-ffffff);
  text-align: left;
  font: normal normal bold 1.1em/1.1em Arial;
  font-size: 2.5vw;
  letter-spacing: 1%;
  color: #ffffff;
  text-shadow: 0px 3px 6px #00000029;
  opacity: 1;
}

.rgpage-imgEX4 {
  width: 40%;
  height: 70%;
  position: relative;
  background: transparent url("../../../public/images/icon-global.svg") 0% 0% no-repeat padding-box;
  opacity: 1;
  margin-right: 2%;
  background-size: cover;

}

.rgpage-imgEX3 {
  width: 30%;
  height: 55%;
  position: relative;
  background: transparent url("../../../public/images/icon-patient.svg") 0% 0% no-repeat padding-box;
  opacity: 1;
  background-size: cover;
}

.rgpage-imgEX2 {
  width: 30%;
  height: 55%;
  position: relative;
  background: transparent url("../../../public/images/icon-calendar.png") 0% 0% no-repeat padding-box;
  background-size: cover;
  opacity: 1;

}

.rgpage-boxEX4 {
  /* Layout Properties */
  justify-content: flex-start;
  /* 将 justify-content 设置为 flex-start */
  display: flex;
  align-items: center;
  position: absolute;
  /* Layout Properties */
  top: 860px;
  left: 1630px;
  width: 240px;
  height: 100px;
  /* UI Properties */
  background: transparent linear-gradient(180deg, #4c9cde 0%, #1d66bf 100%) 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
}

.rgpage-boxEX3 {
  /* Layout Properties */
  justify-content: flex-start;
  /* 将 justify-content 设置为 flex-start */
  display: flex;
  align-items: center;
  position: absolute;
  /* Layout Properties */
  top: 748px;
  left: 1630px;
  width: 240px;
  height: 100px;
  /* UI Properties */
  background: transparent linear-gradient(180deg, #4c9cde 0%, #1d66bf 100%) 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
}

.rgpage-boxEX2 {
  /* Layout Properties */
  justify-content: flex-start;
  /* 将 justify-content 设置为 flex-start */
  display: flex;
  align-items: center;
  position: absolute;
  /* Layout Properties */
  top: 636px;
  left: 1630px;
  width: 240px;
  height: 100px;
  /* UI Properties */
  background: transparent linear-gradient(180deg, #4c9cde 0%, #1d66bf 100%) 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
}

.rgpage-imgEX1 {
  width: 30%;
  height: 55%;
  position: relative;
  background: transparent url("../../../public/images/icon-pill.svg") 0% 0% no-repeat padding-box;
  background-size: cover;
  opacity: 1;
}

.rgpage-boxEX1 {
  /* Layout Properties */
  justify-content: flex-start;
  /* 将 justify-content 设置为 flex-start */
  display: flex;
  align-items: center;
  position: absolute;
  /* Layout Properties */
  top: 524px;
  left: 1630px;
  width: 240px;
  height: 100px;
  /* UI Properties */
  background: transparent linear-gradient(180deg, #4c9cde 0%, #1d66bf 100%) 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
}

.rgpage-box3row2 {
  align-items: center;
  position: relative;
  top: 114px;
  width: 240px;
  height: 240px;
  /* UI Properties */
  background: transparent linear-gradient(135deg, #4c9cde 0%, #1d66bf 100%) 0% 0% no-repeat padding-box;
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
  background: transparent linear-gradient(135deg, #4c9cde 0%, #1d66bf 100%) 0% 0% no-repeat padding-box;
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
  background: transparent linear-gradient(135deg, #4c9cde 0%, #1d66bf 100%) 0% 0% no-repeat padding-box;
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
  background: transparent linear-gradient(134deg, #cca96f 0%, #917548 100%) 0% 0% no-repeat padding-box;
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
  background: transparent linear-gradient(135deg, #d66081 0%, #af2b4f 100%) 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 8px;
  opacity: 1;
}

.rgpage-box2 {
  /* Layout Properties */
  justify-content: flex-start;
  /* 将 justify-content 设置为 flex-start */
  display: flex;
  align-items: center;
  position: relative;
  top: 90px;
  left: 72px;
  width: 50%;
  height: 12.5%;
  /* UI Properties */
  background: transparent linear-gradient(134deg, #eaa74c 0%, #ce7d36 100%) 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 15px #2c5e4b;
  border-radius: 8px;
  opacity: 1;
}

.rgpage-box {
  /* Layout Properties */
  justify-content: flex-start;
  /* 将 justify-content 设置为 flex-start */
  display: flex;
  align-items: center;
  position: relative;
  top: 90px;
  left: 60px;
  width: 50%;
  height: 12.5%;
  /* UI Properties */
  background: transparent linear-gradient(134deg, #60bfc1 0%, #379698 100%) 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 15px #2c5e4b;
  border-radius: 8px;
  opacity: 1;
}

.rgpage-img {
  position: relative;
  top: 0px;
  left: 6%;
  width: 46%; /* 图片的最大宽度为其容器的宽度 */
  height: 90%; /* 高度自动调整以保持比例 */
  background: transparent url("../../../public/images/icon-掛號查詢.svg") 0% 0% no-repeat padding-box;
  background-size: cover; /* 背景图像自适应整个DIV的宽度和高度 */
  opacity: 1;
  margin-right: 4%;

}

.box2-img {
  position: relative;
  
  background: transparent url("../../../public/images/icon-門診掛號.svg") 0% 0% no-repeat padding-box;
  background-size: cover; /* 背景图像自适应整个DIV的宽度和高度 */
  top: 0px;
  left: 6%;
  width: 46%; /* 图片的最大宽度为其容器的宽度 */
  height: 90%; /* 高度自动调整以保持比例 */
  opacity: 1;
  margin-right: 4%;
}

.box6-img {
  top: 16px;
  left: 55px;
  width: 180px;
  height: 160px;
  position: relative;
  background: transparent url("../../../public/images/icon-抽血檢驗.svg") 0% 0% no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}

.box7-img {
  top: 16px;
  left: 55px;
  width: 180px;
  height: 160px;
  position: relative;
  background: transparent url("../../../public/images/icon-交通指引.svg") 0% 0% no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}

.box8-img {
  top: 16px;
  left: 55px;
  width: 180px;
  height: 160px;
  position: relative;
  background: transparent url("../../../public/images/icon-樓層配置.svg") 0% 0% no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}

.box9-img {
  top: 16px;
  left: 55px;
  width: 180px;
  height: 160px;
  position: relative;
  background: transparent url("../../../public/images/icon-就醫指南.svg") 0% 0% no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}

.box3-img {
  top: 16px;
  left: 55px;
  width: 180px;
  height: 160px;
  position: relative;
  background: transparent url("../../../public/images/icon-慢箋領藥.svg") 0% 0% no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}

.box3-font {
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) var(--unnamed-font-size-38) / var(--unnamed-line-spacing-43) var(--unnamed-font-family-arial);
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
  background: transparent url("../../../public/images/icon-看診進度.svg") 0% 0% no-repeat padding-box;
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
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) 55px/64px var(--unnamed-font-family-arial);
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
  background: transparent url("../../../public/images/icon-該看哪科.svg") 0% 0% no-repeat padding-box;
  opacity: 1;
  margin-right: 20px;
}

.box5-font {
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) var(--unnamed-font-size-38) / var(--unnamed-line-spacing-43) var(--unnamed-font-family-arial);
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
  left: 0px;
  width: 50%;
  height: 37%;
  padding: 2px 2px 2px;
  /* UI Properties */
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) 55px/64px var(--unnamed-font-family-arial);
  color: var(--unnamed-color-ffffff);
  text-align: center;
  font: normal normal bold 100% Arial;
  aspect-ratio: 9 / 16; /* 设置DIV的宽高比为 1080 * 1920 或者 540 * 960 */
  font-size: 4.8vw; /* 设置字体大小为视口宽度的3% */
  letter-spacing: 1.65px;
  color: #ffffff;
  text-shadow: 0px 3px 6px #00000029;
  opacity: 1;
}.rgpage-font2 {
  /* Layout Properties */
  position: relative;
  top: 10%;
  width: 100%;
  height: 37%;
  padding: 2px 2px 2px;
  /* UI Properties */
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) 55px/64px var(--unnamed-font-family-arial);
  color: var(--unnamed-color-ffffff);
  text-align: center;
  font: normal normal bold 100% Arial;
  aspect-ratio: 9 / 16; /* 设置DIV的宽高比为 1080 * 1920 或者 540 * 960 */
  font-size: 4.25vw; /* 设置字体大小为视口宽度的3% */
  letter-spacing: 1.65px;
  color: #ffffff;
  text-shadow: 0px 3px 6px #00000029;
  opacity: 1;
}


.c-box-b {
  display: flex;
  /* 將容器設置為彈性盒子 */
  flex-direction: row;
  width: 55%;
  /* width: 984px; */
}

.c-box-s {
  display: flex;
  flex: 1;
  margin: -1%;
  height: 33%;

}



.bg {
  min-width: 1920px;
  min-height: 1080px;
  background: transparent url("../../../public/images/bg-03.png") 0% 0% no-repeat padding-box;
  opacity: 1;
  width: 100vw;
  min-height: 100vh;
  position: relative;
}

.bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../../../public/images/bg-03.png") 0% 0% no-repeat padding-box;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.back6 {
  background: transparent linear-gradient(135deg, #959595 0%, #676767 100%) 0% 0% no-repeat padding-box;
}

.back7 {
  background: transparent linear-gradient(135deg, #387caf 0%, #1e4867 100%) 0% 0% no-repeat padding-box;
  left: 72px;
}

.back8 {
  background: transparent linear-gradient(135deg, #eab944 0%, #b88e2f 100%) 0% 0% no-repeat padding-box;
  left: 84px;
}

.back9 {
  background: transparent linear-gradient(135deg, #04af7a 0%, #01835a 100%) 0% 0% no-repeat padding-box;
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
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) var(--unnamed-font-size-30) / var(--unnamed-line-spacing-36) var(--unnamed-font-family-noto-sans-tc);
  letter-spacing: var(--unnamed-character-spacing-0);
  color: var(--unnamed-color-ffffff);
  text-align: left;
  font: normal normal bold 30px/36px Noto Sans TC;
  letter-spacing: 0px;
  color: #ffffff;
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
  top: 74%;
  left: 3%;
  width: 22%;
  height: 6%;

  /* UI Properties */
  background: transparent linear-gradient(180deg, #4c9cde 0%, #1d66bf 100%) 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
}

.smalltype2 {
  /* Layout Properties */
  top: 74%;
  left: 27%;
  width: 22%;
  height: 6%;
  /* UI Properties */
  background: transparent linear-gradient(180deg, #4c9cde 0%, #1d66bf 100%) 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
}

.smalltype3 {
  /* Layout Properties */
  top: 74%;
  left: 51%;
  width: 22%;
  height: 6%;
  /* UI Properties */
  background: transparent linear-gradient(180deg, #4c9cde 0%, #1d66bf 100%) 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
}

.smalltype4 {
  /* Layout Properties */
  top: 74%;
  left: 75%;
  width: 22%;
  height: 6%;
  /* UI Properties */
  background: transparent linear-gradient(180deg, #4c9cde 0%, #1d66bf 100%) 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
}

.smallbox {
  top: 0;
  left: 0;
  width: 24.5%;
  height: 90%;
  margin: 1.5%;
}

.smallbox-2 {
  top: 0;
  left: 0;
  width: 52.5%;
  height: 90%;
  margin: 1.5%;
}

.box {
  height: 90%;
  box-sizing: border-box;
  border: 1px solid black;
  margin: 1%;

}

.c-box-s:nth-child(1) .box {
  flex-basis: 50%;
}

.c-box-s:nth-child(2) .box:nth-child(1),
.c-box-s:nth-child(2) .box:nth-child(3) {
  flex-basis: 25%;
}

.c-box-s:nth-child(2) .box:nth-child(2) {
  flex-basis: 50%;
}

.c-box-s:nth-child(3) .box {
  flex-basis: 25%;
}
.simg-2 {
  background-size: cover; /* 背景图像自适应整个DIV的宽度和高度 */
  top: 0px;
  left: 6%;
  width: 45%; /* 图片的最大宽度为其容器的宽度 */
  height: 90%; /* 高度自动调整以保持比例 */
}
.simg-1 {
  background-size: cover; /* 背景图像自适应整个DIV的宽度和高度 */
  top: 10%;
  left: 22.5%;
  width: 50%; /* 图片的最大宽度为其容器的宽度 */
  height: 50%; /* 高度自动调整以保持比例 */
}

</style>
