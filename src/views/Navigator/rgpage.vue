<template>
  <div :class="['home']">
    <div class="button-container">
      <button class="floating-button">Button 1</button>
      <button class="floating-button">Button 2</button>
      <button class="floating-button">Button 3</button>
    </div>
    <loading :active.sync="isLoading"> </loading>
    <!-- //! head start -->
    <div class="header">
      
      <div :class="resPositionClass">
        <div class="logo"></div>
        <div class="bigtitle-font">門診掛號</div>
        <div
        style="
          padding: 10px 10px 0px 10px;
          display: flex;
          overflow: hidden;
          flex-direction: row;
          z-index: 2;
        "
      >
        <button class="rollback" @click="jumpPage('/Navigator')">上一頁</button>
      </div>
      </div>
      
    </div>
    <div :class="titleClass">
      <div v-for="(data, index) in rgdsmList" :key="index">
        <ul class="page-list">
          <div>
            <li class="row-title">
              <div class="title-left">
                <font-awesome-icon icon="fa-solid fa-bookmark" />
                <span class="kind">{{ index }}</span>
              </div>
            </li>
            <li class="row-p1" v-for="(group, inx) in rgdsmList[index]">
              <!-- {{group}}
            {{inx}} -->
              <div
                @click="
                  openDept(
                    index,
                    index,
                    inx,
                    rgdsmList[index][inx].div_no,
                    rgdsmList[index][inx].nam,
                    group.sd_no
                  )
                "
              >
                {{ rgdsmList[index][inx].nam }}
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
    <!-- //! container end -->
    <!-- {{pageGroup}} -->
    <!-- <div
      class="outpatient-section"
      v-for="(title, index) in pageGroup.deptGroupName"
      v-if=" checkgroupID(pageGroup.deptGroupID[index]) > '-1'"
      :key="index"
    >
      <ul class="page-list">
        <div>
          <li class="row-title">
            <div class="title-left">
              <font-awesome-icon icon="fa-solid fa-bookmark" />
              <span class="kind">{{ title }}</span>
            </div>
          </li>
          <li class="row-p1" v-for="(group, inx) in pageGroup.groups[index]">
            <div
              @click="
                openDept(
                  pageGroup.deptGroupID[index],
                  title,
                  inx,
                  group.deptID,
                  group.deptName
                )
              "
            >
              {{ group.deptName }}
            </div>
          </li>
        </div>
      </ul>
    </div> -->
    <!-- //! container end -->
    <div :class="footerClass">
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    footerClass() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "footer";
      } else {
      }
    },
    resPositionClass() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "bigtitle-small";
      } else {
        return "bigtitle";
      }
    },
    titleClass() {
      // 根据条件判断是否应用共享的CSS类
      if (this.windowWidth <= 1081 || this.windowOrientation === "portrait") {
        return "outpatient-section-small";
      } else {
        return "outpatient-section";
      }
    },
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      windowOrientation: window.screen.orientation.type, // 初始化窗口方向
      isLoading: false,

      // maindept: {320:320, 270:270, 350:350, 330:330, 340:340, 360:360, 310:310, 411:411, 500:500, 380:380, 253:253, 370:370, 300:300, 110:110, 218:218},
      maindept: {
        100: { group: "100", groupName: "內科" },
        200: { group: "200", groupName: "外科" },
        300: { group: "300", groupName: "口腔醫學部" },
      },
      rgdsmList: [], //取得科別階層
      getdeptList: [], //!getapi所有資料
      //! 篩選後資料
      pageGroup: {
        deptGroupID: [],
        deptGroupName: [],
        groups: [],
      },
      today: {
        time: null,
        date: null,
      },
      searchDept: null,
    };
  },
  mounted() {
    this.getDeptList();
    this.getrgdsmList();
    this.getTime();
    this.interval1S();
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    handleOrientationChange() {
      this.windowOrientation = window.screen.orientation.type;
    },
    //! 取得時間
    interval1S() {
      this.timer = setInterval(() => {
        let hh = new Date().getHours();
        let now = null;
        if (hh < 12) {
          now = 1;
        } else if (hh >= 12 && hh <= 17) {
          now = 2;
        } else if (hh > 17) {
          now = 3;
        }
        this.getTime();
      }, 1000 * 1);
    },
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
    },
    //!取得所有診間資料
    getrgdsmList() {
      this.isLoading = true;
      let param = {
        wb_base64: "0",
        wb_big5: "0",
        sd_frm_no: "1",
        lang: this.$store.state.language,
        authKey:
          "c81f94f568031f7157a0f7424be40c1ec81f94f568031f7157a0f7424be40c1e",
      };
      this.$gows.callWSOffical("evt.rg.getrgdsm", param).then((rt) => {
        if (rt.sts == "000000") {
          this.rgdsmList = rt.val;
          console.log(this.rgdsmLis);
        }
        // this.tidy();
        this.isLoading = false;
      });
    },
    //!取得所有診間資料
    getDeptList() {
      this.isLoading = true;
      let param = {
        wb_base64: "0",
        wb_big5: "0",
        hospitalID: "1",
        language: "zh-TW",
        authKey:
          "c81f94f568031f7157a0f7424be40c1ec81f94f568031f7157a0f7424be40c1e",
        deptGrouptID: " ",
      };
      this.$gows.callWSOffical("pvt.pip.getdept", param).then((rt) => {
        if (rt.sts == "000000") {
          this.getdeptList = rt.val.resultList;
          // console.log("getDeptList", this.getdeptList);
        }
        this.tidy();
        this.isLoading = false;
      });
    },
    //! 資料分類
    tidy() {
      (this.pageGroup = {
        deptGroupID: [],
        deptGroupName: [],
        groups: [],
      }),
        this.getdeptList.forEach((element) => {
          let deptGroupID = element.deptGroupID;
          if (this.pageGroup.deptGroupID.includes(deptGroupID) == false) {
            this.pageGroup.deptGroupID.push(deptGroupID);
            this.pageGroup.deptGroupName.push(element.deptGroupName);
            let arr = [];
            let obj = {
              deptID: element.deptID,
              deptName: element.deptName,
            };
            arr.push(obj);
            this.pageGroup.groups.push(arr);
          } else {
            let inx = this.pageGroup.deptGroupID.indexOf(deptGroupID);
            let obj = {
              deptID: element.deptID,
              deptName: element.deptName,
            };
            this.pageGroup.groups[inx].push(obj);
          }
        });
      console.log(this.pageGroup);
    },
    checkmaindept(id, dept) {
      var maindept = [
        "320",
        "270",
        "350",
        "330",
        "340",
        "360",
        "310",
        "411",
        "500",
        "380",
        "253",
        "370",
        "300",
        "110",
        "218",
      ];
      if (maindept.indexOf(id) > "-1") {
        if (id == dept) {
          return 1;
        }
      }
      return -1; // -1
    },
    checkgroupID(id) {
      var idlist = [100, 200];
      // console.log(id)
      // console.log(idlist.indexOf(id))
      return idlist.indexOf(id); // -1
    },
    //! 跳SelectClinic
    openDept(groupID, groupName, inx, deptID, deptName, sdno) {
      console.log("opendept", groupName, groupID, deptID, deptName);
      this.$router
        .push({
          path: "/navi",
          query: {
            deptID: deptID,
            groupID: groupID,
            groupName: deptName,
            sd_no: sdno,
          },
        })
        .catch((err) => {
          err;
        });
    },
    //! 跳頁 參數
    jumpPage(str) {
      this.$router.push({
        path: str,
      });
    },
    //!關鍵字搜尋
    toSearch() {
      this.tidy();
      if (this.searchDept == null) {
      } else if (this.searchDept != "") {
        //! 輸入關鍵字
        let obj = {
          deptGroupID: [],
          deptGroupName: [],
          groups: [],
        };
        for (let i = 0; i < this.pageGroup.deptGroupName.length; i++) {
          let deptGroupName = this.pageGroup.deptGroupName[i];
          let deptGroupID = this.pageGroup.deptGroupID[i];
          let groups = this.pageGroup.groups[i];
          let a = false;
          //! 分類有
          if (this.pageGroup.deptGroupName[i].includes(this.searchDept)) {
            let arr = [];
            groups.forEach((element) => {
              arr.push(element);
            });
            a = true;
            groups = arr;
          } else {
            let arr = [];
            //! 科別有
            groups.forEach((key, value) => {
              if (key.deptName.includes(this.searchDept)) {
                arr.push(key);
                console.log("search", key);
                a = true;
              }
            });
            groups = arr;
          }
          if (a) {
            obj.deptGroupID.push(deptGroupID);
            obj.deptGroupName.push(deptGroupName);
            obj.groups.push(groups);
          }
        }
        this.pageGroup = obj;
        //!無搜尋資料
        if (this.pageGroup.deptGroupName.length == 0) {
          this.$swal.fire({
            icon: "error",
            title: "查無此科別",
          });
        }
      }
    },
  },
};
</script>
<style scoped>
.footer {
  height: 400px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.outpatient-section-small {
  max-height: 1520px;
  padding-top: 220px; /* 页头高度 */
  overflow-y: auto;
  scroll-margin-top: 420px; /* 设置初始位置的高度 */
  border-radius: 40px 40px 0px 0px;
  opacity: 1;
  top:10%;
  position: relative;
}
.button-container {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

.floating-button {
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #ccc;
  color: #fff;
  border: none;
  cursor: pointer;
  z-index: 3;
}

.floating-button:last-child {
  margin-bottom: 0;
}
</style>
