<template>
  <div class="p-2">
    <loading :active.sync="isLoading"> </loading>
    <div class="inputList pb-2">
      <div class="text-nowrap">
        <label
          >日期： <input type="date" v-model="search.date" disabled="disabled"
        /></label>
      </div>
      <div>
        <label>
          時段：
          <select v-model="search.period" disabled="disabled">
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
          <input
            v-model="search.inputDept"
            style="width: 200px"
            disabled="disabled"
        /></label>
        <!-- <datalist id="group">
          <option v-for="(item, index) in deptNameList" :key="index">
            {{ item }}
          </option>
        </datalist> -->
      </div>
      <!-- <div>
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
            v-for="(item, index) in pageGroup.groups[pageGroupIndex]"
            :key="item.deptName"
            :value="item.deptName"
          >
            {{ item.deptName }}
          </option></datalist
        >
      </div> -->
      <!-- <select v-model="search.roomID">
        <option
          value=""
          v-for="item in opdprogressEsLists"
          :value="item.roomID"
        >
          ({{ item.roomName }}) {{ item.doctorName }}
        </option>
      </select> -->
      <div>
        <label
          >診間：
          <input type="text" disabled="disabled" v-model="search.inputRoomName"
        /></label>
      </div>
    </div>
    <!-- <div class="m-2">
      <ckeditor
        :editor="editor"
        v-model="editorData"
        :config="editorConfig"
      ></ckeditor>
    </div> -->
    <div style="border: 1px solid #ccc;">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="editorData"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
        />
    </div>
    <div style="text-align: center">
      <button class="btn btn-blue" @click="updOoormd()">儲存</button>
    </div>
  </div>
</template>
<script>
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import CKEditor from "@ckeditor/ckeditor5-vue";
// import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
// import "@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh";
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Vue from "vue";

Vue.component("loading", Loading);
export default {
  components: { Editor, Toolbar },

  data() {
    return {
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: { },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'  
      isLoading: false,

      search: {
        groupName: null,
        period: null, //時段 1 2 3
        deptName: null,
        deptID: null,
        roomID: null,
        date: null,
        inputDept: null,
        inputRoomName: null,
      },
      timeLists: {
        period: {
          1: "上午",
          2: "下午",
          3: "晚上",
        },
      },
      updOormdData: {
        seq: "1",
        msg_typ: "H",
        sts: "A",
        rtp: "28298",
        rtd: null,
      },
      // editor: DecoupledEditor,
      editorData: "",
      // editorConfig: {
      //   language: "zh-tw",
      //   toolbar: {
      //     items: [
      //       "heading",
      //       "|",
      //       "bold",
      //       "fontFamily",
      //       "italic",
      //       "bulletedList",
      //       "numberedList",
      //       "blockQuote",
      //       "undo",
      //       "redo",
      //     ],
      //   },
      //   fontFamily: {
      //       options: [
      //           'default',
      //           'Ubuntu, Arial, sans-serif',
      //           'Ubuntu Mono, Courier New, Courier, monospace'
      //       ]
      //   },
      //   test: {
      //     options: [
      //       {
      //         model: "paragraph",
      //         title: "Paragraph",
      //         class: "ck-heading_paragraph",
      //       },
      //       {
      //         model: "a",
      //         view: "h2",
      //         title: "a 1",
      //         class: "ck-heading_heading1",
      //       },
      //       {
      //         model: "heading2",
      //         view: "h3",
      //         title: "Heading 2",
      //         class: "ck-heading_heading2",
      //       },
      //     ],
      //   },
      // },
      routedept: false,
      editorDisabled: false,
      deptIDList: [],
      deptNameList: [],
      getdeptList: [],
      pageGroupIndex: null,
      opdprogressEsLists: [],
      pagedeptIndex: null,
      pageGroup: [],
    };
  },
  mounted() {
    this.isLoading = true;
    this.search.date = this.$route.query.date;
    this.search.period = this.$route.query.period;
    this.search.roomID = this.$route.query.roomID;
    this.getDeptList();
    this.getTime();
    this.getopdprogress();
  },
  beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
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
      this.updOormdData.rtd = year + "-" + month + "-" + day;
    },
    //! 取得科別
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
          let deptIDList = [];
          let deptNameList = [];
          this.getdeptList.forEach((element) => {
            let deptID = element.deptID;
            let deptName = element.deptName;

            if (deptIDList.includes(deptID) == false) {
              deptIDList.push(deptID);
              deptNameList.push(deptName);
            } else {
            }
          });
          this.deptIDList = deptIDList;
          this.deptNameList = deptNameList;
          if (this.routedept == false) {
            this.deptIDList.forEach((key, value) => {
              if (key == this.$route.query.deptID)
                this.search.groupName = this.deptNameList[value];
            });
            this.routedept == true;
          }
        }
      });
    },

    //! 取得備註
    getOoormd() {
      let param = {
        wb_base64: "0",
        wb_big5: "0",
        dat: this.search.date,
        sft: this.search.period,
        rom: this.search.roomID,
      };
      this.$gows.callWSOffical("pvt.oo.getOoormd", param).then((rt) => {
        if (rt.sts == "000000") {
          this.editorData = rt.val.msg;
        } else {
          this.editorData = "";
        }
        this.isLoading = false;
        console.log("getOoormd:", rt);
      });
    },
    //! 更新備註
    updOoormd() {
      let param = {
        wb_base64: "0",
        wb_big5: "0",
        dat: this.search.date,
        sft: this.search.period,
        rom: this.search.roomID,
        seq: this.updOormdData.seq,
        msg_typ: this.updOormdData.msg_typ,
        msg: this.editorData,
        sts: this.updOormdData.sts,
        rtp: this.updOormdData.rtp,
        rtd: this.updOormdData.rtd,
      };
      this.isLoading = true;
      this.$gows.callWSOffical("pvt.oo.updOoormd", param).then((rt) => {
        if (rt.sts == "000000") {
          this.$swal.fire({
            icon: "success",
            title: "上傳成功",
          });
          // this.editorData = rt.val.msg;
          //   console.log("getooorm:", this.editorData);
        } else {
          this.$swal.fire({
            icon: "error",
            title: "上傳失敗",
          });
        }
        this.isLoading = false;
        console.log("upd:", rt);
      });
    },
    //!取得看診診間
    getopdprogress() {
      let param = {
        hospitalID: "1",
        language: "zh-TW",
        deptID: "",
        opdTimeID: this.search.period,
        wb_base64: "0",
        authKey: "F3E1E3E0BAE66D222337314292FD0608",
      };
      this.$gows.callWSOffical("pvt.pip.getopdprogress", param).then((rt) => {
        if (rt.sts == "000000") {
          this.opdprogressEsLists = rt.val.resultList;
          this.opdprogressEsLists.forEach((key, value) => {
            if (key.roomID == this.search.roomID) {
              this.search.deptID = key.deptID;
              this.search.deptName = key.deptName;
              this.search.inputDept = "(" + key.deptID + ")" + key.deptName;
              this.search.inputRoomName =
                key.roomID + "(" + key.roomName + ")" + key.doctorName;
            }
          });
        } else {
        }
        this.isLoading = false;
        console.log("getopdprogress:", rt.val);
      });
    },
  },
  computed: {},
  watch: {
    "search.roomID": function () {
      this.getOoormd();
    },
  },
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>

<!-- 
<style lang="scss">
/* 全局修改生效 */
#ck-editer {
  // 编辑器高度，边框
  .ck-content {
    min-height: 400px;
    border: 1px solid #ccc !important;
    
    background-color: white;
  }
}
</style> -->
