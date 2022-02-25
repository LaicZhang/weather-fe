<template>
  <div class="showData-page">
    <div>1</div>
  </div>
</template>

<script  >
import { defineComponent, nextTick } from "vue";
import { menuListApi, menuOperateApi } from "../api";
export default defineComponent({
  name: "showData",
  components: {},
  data() {
    return {
      showDataSearchFrom: {
        showDataState: 1, // 1:正常 2:停用
      },
      showDataList: [],
      showDataColumns: [
        {
          label: "数据名称",
          prop: "showDataName",
        },
        {
          label: "图标",
          prop: "icon",
        },
        {
          label: "数据类型",
          prop: "showDataType", // 1:数据 2:按钮
          formatter(_1, _2, value) {
            return { "1": "数据", "2": "按钮" }[value];
          },
        },
        {
          label: "权限标识",
          prop: "showDataCode",
        },
        {
          label: "路由地址",
          prop: "path",
        },
        {
          label: "组件路径",
          prop: "component",
        },
        {
          label: "数据状态",
          prop: "showDataState",
          formatter(_1, _2, value) {
            return { "1": "正常", "2": "停用" }[value];
          },
        },
      ],
      showDataForm: {
        parentId: [null],
        showDataType: 1,
        showDataState: 1,
      },
      showDataFromRoles: {
        showDataName: {
          required: true,
          message: "必须填写数据名称",
          trigger: "blur",
        },
      },
      isShowDialog: false,
      action: 1, // 1:新增  2:子级新增.
      isEdit: false,
    };
  },
  methods: {
    async getshowDataList() {
      const list = await menuListApi(this.showDataSearchFrom);
      this.showDataList = list;
    },
    addshowData() {
      const params = this.showDataForm;
      params.action = "add";
      return menuOperateApi(params);
    },
    editshowData() {
      const params = this.showDataForm;
      params.action = "edit";
      return menuOperateApi(params);
    },
    deleteshowData(row) {
      const params = {};
      params._id = row._id;
      params.action = "delete";
      return menuOperateApi(params);
    },
    onToggleDialog(flag) {
      this.isShowDialog = flag;
    },
    async onOpenshowDataDialog(type, row) {
      this.isEdit = false;
      // 1:新增  2:子级新增
      this.action = type;
      // 如果是子级新增
      if (type === 2) {
        await nextTick(() => {
          const parentId = [...row.parentId, row._id].filter((id) => id);
          this.showDataForm.parentId = parentId;
        });
      } else {
        // this.showDataForm = {};
      }
      this.onToggleDialog(true);
    },
    onshowDataSubmit() {
      this.$refs.showDataFormRef.validate(async (valid) => {
        if (valid) {
          if (!this.isEdit) {
            await this.addshowData();
          } else {
            await this.editshowData();
          }
          this.onToggleDialog(false);
          await this.getshowDataList();
          this.$message.success("操作成功");
        }
      });
    },
    onEmitshowData(showData) {
      this.isEdit = true;
      this.onToggleDialog(true);
      this.showDataForm = showData;
    },
    async onDeleteshowData(showData) {
      await this.deleteshowData(showData);
      this.$message.success("操作成功");
      await this.getshowDataList();
    },
    async onQueryshowData() {
      await this.getshowDataList();
    },
    resetForm(formRefName) {
      this.$refs[formRefName].resetFields();
    },
  },
  mounted() {
    this.getshowDataList();
  },
});
</script>
<style lang="scss" scoped>
.showData-page {
  padding: 30px;
  box-sizing: border-box;
}
.search-from-wrap {
  background: white;
  margin-bottom: 18px;
  .el-form {
    padding: 18px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
