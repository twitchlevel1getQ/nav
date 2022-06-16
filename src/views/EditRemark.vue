<template>
  <div class="p-2">
    <loading :active.sync="isLoading"> </loading>
    <div class="inputList pb-2">
      <div class="text-nowrap">
        <label>日期： <input type="date" v-model="search.date" /></label>
      </div>
      <div>
        <label>
          時段：
          <select v-model="search.period">
            <option
              v-for="(item, index) in timeLists.period"
              :value="index"
              :key="index"
            >
              {{ item }}
            </option>
          </select>
        </label>
      </div>
      <div>
        <label
          >科別：
          <input list="group" v-model="search.group" style="width: 200px"
        /></label>
        <datalist id="group">
          <option
            v-for="(item, index) in filterTitle.deptGroupID"
            :key="index"
            :value="filterTitle.deptGroupName[index]"
          >
            {{ filterTitle.deptGroupName[index] }}
          </option>
        </datalist>
      </div>
      <div>
        <label
          >診間：
          <input
            list="depts"
            v-model="search.deptName"
            style="width: 150px"
            :disabled="dis()"
        /></label>
        <datalist id="depts">
          <option
            v-for="(item, index) in filterTitle.groups[pageGroupIndex]"
            :key="item.deptName"
            :value="item.deptName"
          >
            {{ item.deptName }}
          </option>
        </datalist>
      </div>
    </div>
    <div class="m-2">
      <ckeditor
        :editor="editor"
        v-model="editorData"
        :editorConfig="editorConfig"
      ></ckeditor>
    </div>
  </div>
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.component("loading", Loading);
export default {
  data() {
    return {
      isLoading: false,
      tt: null,
      cc: null,
      selectedWeek: null,
      search: {
        group: null,
        period: null, //時段 1 2 3
        deptName: null,
        deptNo: null,
        date: null,
      },
      timeLists: {
        period: ["上午", "下午", "晚上"],
      },
      editor: ClassicEditor,
      editorData:
        "<p>Content of the <strong>editor.</strong>Content of the <strong>editor.</strong>Content of the <strong>editor.</strong></p>",
      editorConfig: {
        toolbar: {
          items: [
            "heading",
            "|",
            "bold",
            "italic",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "undo",
            "redo",
          ],
        },
        test: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "a",
              view: "h2",
              title: "a 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h3",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
          ],
        },
      },
      editorDisabled: false,
      getdeptList: [],
      pageGroupIndex: null,
      pageGroup: {
        deptGroupID: [],
        deptGroupName: [],
        groups: [],
      },
    };
  },
  mounted() {
    this.isLoading = true;
    this.getDeptList();
  },
  methods: {
    dis() {
      if (this.search.group == null || this.search.group == "") {
        return true;
      } else {
        if (this.pageGroupIndex == null || this.search.group == "") return true;
        else return false;
      }
      //   return true;
    },
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
          console.log("getDeptList", this.getdeptList);
        }
      });
    },
  },
  computed: {
    //! 根據科別 分組
    filterTitle: function () {
      console.log("ttstart");
      this.getdeptList.forEach((element) => {
        let deptGroupID = element.deptGroupID;
        let deptGroupName = element.deptGroupName;
        let deptID = element.deptID;
        let deptName = element.deptName;

        // ! groups
        if (this.pageGroup.deptGroupID.includes(deptGroupID) == false) {
          //陣列 第一筆資料
          this.pageGroup.deptGroupID.push(deptGroupID);
          this.pageGroup.deptGroupName.push(deptGroupName);
          let arr = [];
          let obj = {
            deptID: deptID,
            deptName: deptName,
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
      this.isLoading = false;
      console.log("close", this.pageGroup, this.isLoading);
      return this.pageGroup;
    },
  },
  watch: {
    "search.group": function () {
      this.search.deptName = null;
      for (let i = 0; i < this.pageGroup.deptGroupName.length; i++) {
        if (this.pageGroup.deptGroupName[i] == this.search.group) {
          this.pageGroupIndex = i;
          console.log("search.group", this.pageGroup.groups[i], i);
          break;
        } else {
          this.pageGroupIndex = null;
          console.log("search.group", this.pageGroupIndex);
        }
      }
    },
  },
};
</script>
