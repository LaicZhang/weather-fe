<template>
  <div class="leave-page">
    <div class="p-search-wrap">
      <el-form :model="queryFrom" inline ref="queryFromRef">
        <el-form-item prop="applyState">
          <el-select v-model="queryFrom.applyState">
            <el-option value="" label="全部">全部</el-option>
            <el-option :value="1" label="待审批"></el-option>
            <el-option :value="2" label="审批中"></el-option>
            <el-option :value="3" label="审批拒绝"></el-option>
            <el-option :value="4" label="审批通过"></el-option>
            <el-option :value="5" label="作废"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getLeaveList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetFields('queryFromRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="p-table-wrap">
      <el-table :data="leaveList" stripe show-header>
        <el-table-column v-for="col in columns" :key="col.label" v-bind="col" />
        <el-table-column>
          <template #default="scope">
            <el-button
              v-if="[1].includes(scope.row.applyState)"
              type="primary"
              @click="onOpenDialog( scope.row)"
              >审核</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="p-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pager.total"
        @current-change="onChangePage"
      />
    </div>

    <!-- 查看弹窗 -->
    <el-dialog title="审批详情" v-model="showDetailDialog" destroy-on-close @close="resetFields('auditFormRef')">
      <el-steps :active="calcCurrentDetail.currentStep" finish-status="success">
        <el-step
          v-for="step in calcCurrentDetail.steps"
          :key="step"
          :title="step"
        ></el-step>
      </el-steps>
      <el-form label-width="120px" :model="auditForm" ref="auditFormRef" :rules="rules">
        <el-form-item class="detail-dialog-item" label="休假类型:">
          {{ calcCurrentDetail.applyType }}
        </el-form-item>
        <el-form-item class="detail-dialog-item" label="休假时间:">
          {{ calcCurrentDetail.leaveTimeArea }}
        </el-form-item>
        <el-form-item class="detail-dialog-item" label="休假时长:">
          {{ calcCurrentDetail.leaveTime }}
        </el-form-item>
        <el-form-item class="detail-dialog-item" label="休假原因:">
          {{ calcCurrentDetail.reasons }}
        </el-form-item>
        <el-form-item class="detail-dialog-item" label="审批状态:">
          {{ calcCurrentDetail.applyStateText }}
        </el-form-item>
        <el-form-item class="detail-dialog-item" label="审批人:">
          {{ calcCurrentDetail.auditUsers }}
        </el-form-item>
        <el-form-item class="detail-dialog-item" label="当前审批人:">
          {{ calcCurrentDetail.curAuditUserName }}
        </el-form-item>
        <el-form-item label="请输入审核备注" prop="remark">
          <el-input
            type="textarea"
            placeholder="请输入审核备注"
            rows="4"
            v-model="auditForm.remark"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="onSubmit('pass')" type="primary">审核通过</el-button>
        <el-button @click="onSubmit('refuse')" type="danger">驳回</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  ref,
  getCurrentInstance,
  onMounted,
  toRaw,
  nextTick,
  reactive,
  computed,
} from "vue";
import { leaveListApi, approveOperateApi } from "../api";
import utils from "../util/utils";
import storage from "../util/storage";
const applyStateMap = {
  审批通过: ["待审批", "审批中", "审批通过"],
  审批拒绝: ["待审批", "审批中", "审批拒绝"],
  残忍拒绝: ["待审批", "审批中", "残忍拒绝"],
  作废: ["待审批", "审批中", "作废"],
};

export default {
  name: "Approve",
  setup() {
    // data
    const { proxy } = getCurrentInstance();
    const pager = reactive({ pageSize: 10, pageNum: 1, total: 0 });
    const action = ref("add");
    const queryFrom = reactive({ applyState: "" });
    const auditForm = reactive({ remark: "" });
    const rules = {remark:{required:true, message: '必须填写', trigger: 'blur'}};
    const leaveList = ref([]);
    const currentDetail = reactive({});
    const calcCurrentDetail = computed(() => {
      const {
        applyType,
        leaveTime,
        reasons,
        applyState,
        auditUsers,
        startTime,
        endTime,
        curAuditUserName,
      } = currentDetail;
      const result = {};
      result.auditUsers = auditUsers;
      result.curAuditUserName = curAuditUserName;
      result.leaveTime = leaveTime;
      result.reasons = reasons;
      result.leaveTimeArea =
        utils.formateDate(new Date(startTime), "yyyy-MM-dd") +
        " 至 " +
        utils.formateDate(new Date(endTime), "yyyy-MM-dd");
      result.applyType = { 1: "事假", 2: "调休", 3: "年假" }[applyType];
      result.applyStateText = {
        1: "待审批",
        2: "审批中",
        3: "审批拒绝",
        4: "审批通过",
        5: "作废",
      }[applyState];
      if (result.applyStateText === "审批拒绝") {
        result.steps = applyStateMap["审批拒绝"];
      } else if (result.applyState === "作废") {
        result.steps = applyStateMap["作废"];
      } else {
        result.steps = applyStateMap["审批通过"];
      }
      result.currentStep =
        result.steps.findIndex((it) => it === result.applyStateText) + 1;
      return result;
    });
    const showAddDialog = ref(false);
    const showDetailDialog = ref(false);
    const columns = [
      { prop: "orderNo", label: "单号" },
      {
        prop: "",
        label: "申请人",
        formatter(row) {
          return row.applyUser.userName;
        },
      },
      {
        prop: "startTime",
        label: "休假时间",
        width: "200px",
        formatter(row, col, val) {
          const { startTime, endTime } = row;
          return (
            utils.formateDate(new Date(startTime), "yyyy-MM-dd") +
            " 至 " +
            utils.formateDate(new Date(endTime), "yyyy-MM-dd")
          );
        },
      },
      { prop: "leaveTime", label: "休假时长" },
      {
        prop: "applyType",
        label: "休假类型",
        formatter(_1, _2, val) {
          return { 1: "事假", 2: "调休", 3: "年假" }[val];
        },
      },
      { prop: "reasons", label: "休假原因" },
      {
        prop: "createTime",
        label: "申请时间",
        width: "200px",
        formatter(_1, _2, val) {
          return utils.formateDate(new Date(val));
        },
      },
      { prop: "auditUsers", label: "审批人" },
      { prop: "curAuditUserName", label: "当前审批人" },
      {
        prop: "applyState",
        label: "审批状态",
        formatter(_1, _2, val) {
          return {
            1: "待审批",
            2: "审批中",
            3: "审批拒绝",
            4: "审批通过",
            5: "作废",
          }[val];
        },
      },
    ];
    //
    onMounted(() => {
      getLeaveList();
    });
    // methods
    const resetFields = (refName) => {
      proxy.$refs[refName].resetFields();
    };
    const onOpenDialog = ( row) => {
      showDetailDialog.value = true;
      Object.assign(currentDetail, toRaw(row));
    };
    const onCloseDialog = (showDialog) => {
      showDialog.value = false;
    };
    const onSubmit = async(type) => {
      action.value = type;
      const params = {};
          params.remark = auditForm.remark;
          params.action = action.value;
          params._id = currentDetail._id;
          await approveOperateApi(params);
          proxy.$message.success("已处理");
          getLeaveList();
          proxy.$store.dispatch('getLeaveCount')
          showDetailDialog.value = false;
    };

    // api
    const getLeaveList = async () => {
      const params = { ...toRaw(pager), ...toRaw(queryFrom) };
      params.type = "approve";
      const { page, list } = await leaveListApi(params);
      leaveList.value = list;
      Object.assign(pager, page);
    };
    const onChangePage = (pageSize) => {
      pager.pageSize = pageSize;
      getLeaveList();
    };
    return {
      pager,
      queryFrom,
      auditForm,
      leaveList,
      columns,
      rules,
      currentDetail,
      calcCurrentDetail,
      showAddDialog,
      showDetailDialog,
      resetFields,
      getLeaveList,
      onOpenDialog,
      onSubmit,
      onChangePage,
    };
  },
};
</script>

<style scoped lang="scss">
.leave-page {
  .date-wrap {
    display: flex;
    justify-content: left;
    position: relative;
    .el-form-item {
      width: 280px;
    }
    .divider {
      position: absolute;
      left: 365px;
      top: 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      flex-basis: 28px;
    }
  }

  .detail-dialog-item {
    height: 40px;
    line-height: 40px;
  }
}
</style>
