<template>
  <div class="home">
    <head-component :reload="reloadnum" @noon="getNoon"></head-component>
    <div
      class="outpatient-section"
      v-for="(title, index) in filterTitle.deptGroupName"
    >
      <ul class="page-list">
        <div>
          <div>
            <li class="row-title">
              <div class="title-left">
                <font-awesome-icon icon="fa-solid fa-bookmark" />
                <span class="kind">{{ title }}</span>
              </div>
              <!-- <span class="title-right">
                *<span class="">僅顯示已開始看診科別</span>
              </span> -->
            </li>
            <li
              class="row-p1"
              v-for="(group, inx) in filterTitle.groups[index]"
            >
              <div @click="openDept(inx, group.deptID, group.deptName)">
                {{ group.deptName }}
              </div>
            </li>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import head from "@/views/components/head.vue";
export default {
  components: {
    "head-component": head,
  },
  data() {
    return {
      reloadnum: 0, //!調整時間
      getdeptList: [], //!getapi所有資料
      //! 篩選後資料
      pageGroup: {
        deptGroupID: [],
        deptGroupName: [],
        groups: [],
      },
    };
  },
  mounted() {
    this.getDeptList();
  },
  methods: {
    //!取得所有診間資料
    getDeptList() {
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
          console.log("callws", this.getdeptList);
        }
      });
    },
    //! 跳頁
    openDept(index, id, name) {
      this.$router.push({
        path: "/SelectClinic",
        query: { deptID: id, deptName: name },
      });
    },
    getNoon(value) {
      console.log("selectclinic getnon", value);
    },
  },
  computed: {
    //! 根據科別 分組
    filterTitle: function () {
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
      return this.pageGroup;
    },
  },
};
</script>
