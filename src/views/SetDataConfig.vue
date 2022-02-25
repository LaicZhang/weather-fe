<template>
  <div class="SetDataConfig-page">
    <div>1</div>
  </div>
</template>

<script  >
import { defineComponent, nextTick } from "vue";
import { menuListApi, menuOperateApi } from "../api";
export default defineComponent({
  name: "SetDataConfig",
  components: {},
  data() {
    return {
      SetDataConfigSearchFrom: {
        SetDataConfigState: 1, // 1:正常 2:停用
      },
      SetDataConfigList: [],
      SetDataConfigColumns: [
        {
          label: "数据名称",
          prop: "SetDataConfigName",
        },
        {
          label: "图标",
          prop: "icon",
        },
        {
          label: "数据类型",
          prop: "SetDataConfigType", // 1:数据 2:按钮
          formatter(_1, _2, value) {
            return { "1": "数据", "2": "按钮" }[value];
          },
        },
        {
          label: "权限标识",
          prop: "SetDataConfigCode",
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
          prop: "SetDataConfigState",
          formatter(_1, _2, value) {
            return { "1": "正常", "2": "停用" }[value];
          },
        },
      ],
      SetDataConfigForm: {
        parentId: [null],
        SetDataConfigType: 1,
        SetDataConfigState: 1,
      },
      SetDataConfigFromRoles: {
        SetDataConfigName: {
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
    async getSetDataConfigList() {
      const list = await menuListApi(this.SetDataConfigSearchFrom);
      this.SetDataConfigList = list;
    },
    addSetDataConfig() {
      const params = this.SetDataConfigForm;
      params.action = "add";
      return menuOperateApi(params);
    },
    editSetDataConfig() {
      const params = this.SetDataConfigForm;
      params.action = "edit";
      return menuOperateApi(params);
    },
    deleteSetDataConfig(row) {
      const params = {};
      params._id = row._id;
      params.action = "delete";
      return menuOperateApi(params);
    },
    onToggleDialog(flag) {
      this.isShowDialog = flag;
    },
    async onOpenSetDataConfigDialog(type, row) {
      this.isEdit = false;
      // 1:新增  2:子级新增
      this.action = type;
      // 如果是子级新增
      if (type === 2) {
        await nextTick(() => {
          const parentId = [...row.parentId, row._id].filter((id) => id);
          this.SetDataConfigForm.parentId = parentId;
        });
      } else {
        // this.SetDataConfigForm = {};
      }
      this.onToggleDialog(true);
    },
    onSetDataConfigSubmit() {
      this.$refs.SetDataConfigFormRef.validate(async (valid) => {
        if (valid) {
          if (!this.isEdit) {
            await this.addSetDataConfig();
          } else {
            await this.editSetDataConfig();
          }
          this.onToggleDialog(false);
          await this.getSetDataConfigList();
          this.$message.success("操作成功");
        }
      });
    },
    onEmitSetDataConfig(SetDataConfig) {
      this.isEdit = true;
      this.onToggleDialog(true);
      this.SetDataConfigForm = SetDataConfig;
    },
    async onDeleteSetDataConfig(SetDataConfig) {
      await this.deleteSetDataConfig(SetDataConfig);
      this.$message.success("操作成功");
      await this.getSetDataConfigList();
    },
    async onQuerySetDataConfig() {
      await this.getSetDataConfigList();
    },
    resetForm(formRefName) {
      this.$refs[formRefName].resetFields();
    },
  },
  mounted() {
    this.getSetDataConfigList();
  },
});
</script>
<style lang="scss" scoped>
.SetDataConfig-page {
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
