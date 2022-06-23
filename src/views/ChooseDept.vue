<template>
  <div class="home">
    <loading :active.sync="isLoading"> </loading>
    <!-- //! head start -->
    <div
      style="
        padding: 10px 10px 0px 10px;
        justify-content: space-between;
        overflow: hidden;
      "
    >
      <button
        class="btn btn-unactive btn-toShowClinic"
        @click="jumpPage('/')"
        v-if="this.$store.state.area != 0"
      >
        回首頁
      </button>
      <div>
        <h1 class="title">門診看診進度</h1>
      </div>
      <div class="input-group mb-1">
        <input
          type="text"
          class="form-control"
          style="max-width: 200px"
          placeholder="搜尋科別"
          v-model="searchDept"
          @keyup.enter="toSearch()"
        />
        <div class="input-group-append">
          <button class="btn btn-primary" @click="toSearch()">搜尋</button>
        </div>
      </div>
    </div>
    <div style="padding: 0px 10px 0px 10px">
      <div class="date">
        <span class="date-left">
          <span class="date-time"
            >{{ today.date }}
            <span style="color: #ff3434">{{ today.time }}</span></span
          >
        </span>
      </div>
    </div>
    <!-- //! head end -->

    <!-- //! container start -->
    <div
      class="outpatient-section"
      v-for="(title, index) in pageGroup.deptGroupName"
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
                  title,
                  pageGroup.deptGroupID[index],
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
    </div>
    <!-- //! container end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
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
    this.getTime();
  },
  methods: {
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
          console.log("getDeptList", this.getdeptList);
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
    },
    //! 跳SelectClinic
    openDept(groupID, groupName, inx, deptID, deptName) {
      console.log("opendept", groupName, groupID, deptID, deptName);
      this.$router
        .push({
          path: "/SelectClinic",
          query: {
            deptID: deptID,
            deptName: deptName,
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
                console.log("test", key);
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
