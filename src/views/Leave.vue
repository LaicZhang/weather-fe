<template>
  <div class="leave-page">
    <div class="p-search-wrap">
      <el-form :model="queryFrom" inline ref="queryFromRef">
        <el-form-item prop="applyState">
          <el-select v-model="queryFrom.applyState">
            <el-option value="" label="全部">全部</el-option>
            <el-option value="1" label="待审批"></el-option>
            <el-option value="2" label="审批中"></el-option>
            <el-option value="3" label="审批拒绝"></el-option>
            <el-option value="4" label="审批通过"></el-option>
            <el-option value="5" label="作废"></el-option>
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
    <div class="p-btn-wrap">
      <el-button type="primary" @click="onOpenDialog('add')"
        >休假申请</el-button
      >
    </div>
    <div class="p-table-wrap">
      <el-table :data="leaveList" stripe show-header>
        <el-table-column v-for="col in columns" :key="col.label" v-bind="col" />
        <el-table-column>
          <template #default="scope">
            <el-button
              type="primary"
              @click="onOpenDialog('preview', scope.row)"
              >查看</el-button
            >
            <el-button type="danger" @click="onDelete(scope.row)">作废</el-button>
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
    <!-- 新增弹窗 -->
    <el-dialog
      v-model="showAddDialog"
      title="休假申请"
      destroy-on-close
      @close="resetFields('leaveFormRef')"
    >
      <el-form
        :model="leaveForm"
        ref="leaveFormRef"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="休假类型" prop="applyType">
          <el-select v-model="leaveForm.applyType">
            <el-option :value="1" label="事假" />
            <el-option :value="2" label="调休" />
            <el-option :value="3" label="年假" />
          </el-select>
        </el-form-item>
        <div class="date-wrap">
          <el-form-item prop="startTime" label="休假时间">
            <el-date-picker
              style="margin: 0"
              v-model="leaveForm.startTime"
              placeholder="选择开始日期"
              @change="(val) => onChangeDate('startTime', val)"
            />
          </el-form-item>
          <div class="divider">-</div>
          <el-form-item prop="endTime">
            <el-date-picker
              style="margin: 0"
              v-model="leaveForm.endTime"
              placeholder="选择结束日期"
              @change="(val) => onChangeDate('endTime', val)"
            />
          </el-form-item>
        </div>
        <el-form-item label="休假时长">
          {{ leaveForm.leaveDay }} 天
        </el-form-item>
        <el-form-item label="休假原因" prop="reasons">
          <el-input
            type="textarea"
            rows="4"
            v-model="leaveForm.reasons"
            placeholder="请输入休假原因"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </template>
    </el-dialog>
    <!-- 查看弹窗 -->
    <el-dialog title="审批详情" v-model="showDetailDialog" destroy-on-close>
      <el-steps :active="calcCurrentDetail.currentStep" finish-status="success">
        <el-step
          v-for="step in calcCurrentDetail.steps"
          :key="step"
          :title="step"
        ></el-step>
      </el-steps>
      <el-form label-width="120px">
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
      </el-form>
      <template #footer>
        <el-button @click="showDetailDialog = false">关闭</el-button>
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
import { leaveListApi, leaveOperateApi } from "../api";
import utils from "../util/utils";
import storage from "../util/storage";
const applyStateMap = {
  审批通过: ["待审批", "审批中", "审批通过"],
  审批拒绝: ["待审批", "审批中", "审批拒绝"],
  残忍拒绝: ["待审批", "审批中", "残忍拒绝"],
  作废: ["待审批", "审批中", "作废"],
};

export default {
  name: "Leave",
  setup() {
    // data
    const { proxy } = getCurrentInstance();
    const pager = reactive({ pageSize: 10, pageNum: 1, total: 0 });
    const action = ref("add");
    const queryFrom = reactive({ applyState: "" });
    const leaveForm = reactive({
      startTime: "",
      endTime: "",
      reasons: "",
      applyType: 1,
      leaveDay: 0, // 计算休假时长, 不需要传后端
    });
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
        prop: "startTime",
        label: "休假时间",
        width: "220px",
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
    const rules = {
      startTime: {
        required: true,
        message: "起始日期不能为空",
        trigger: ["blur", "change"],
      },
      endTime: {
        required: true,
        message: "结束日期不能为空",
        trigger: ["blur", "change"],
      },
      reasons: { required: true, message: "休假原因不能为空", trigger: "blur" },
      applyType: {
        required: true,
        message: "休假类型不能为空",
        trigger: "blur",
      },
    };
    //
    onMounted(() => {
      getLeaveList();
    });
    // methods
    const resetFields = (refName) => {
      proxy.$refs[refName].resetFields();
    };
    const onOpenDialog = (type, row) => {
      action.value = type;
      switch (type) {
        case "add":
          showAddDialog.value = true;
          break;
        case "preview":
          showDetailDialog.value = true;
          // todo
          Object.assign(currentDetail, toRaw(row));
          break;
        default:
          break;
      }
    };
    const onCloseDialog = (showDialog) => {
      showDialog.value = false;
    };
    const onChangeDate = (dateKey, val) => {
      const { startTime, endTime } = leaveForm;
      if (startTime > endTime && endTime) {
        leaveForm[dateKey] = "";
        proxy.$message.warning("开始时间不能大于结束时间");
        leaveForm.leaveDay = 0;
        return;
      }
      if (startTime && endTime) {
        leaveForm.leaveDay = (endTime - startTime) / (24 * 60 * 60 * 1000) + 1;
      }
    };
    const onSubmit = () => {
      proxy.$refs["leaveFormRef"].validate(async (valid) => {
        if (valid) {
          const { userEmail, userId, userName } = storage.getItem("userInfo");
          const params = { ...toRaw(leaveForm), userEmail, userId, userName };
          params.action = action.value;
          params.leaveTime =  (leaveForm.endTime-leaveForm.startTime)/(24*60*60*1000)+1 +'天'
          await leaveOperateApi(params);
          proxy.$message.success("已申请");
          getLeaveList();
          showAddDialog.value = false;
        }
      });
    };
    const onDelete = async(row) => {
      action.value = "delete";
      const params = {};
      params.action = action.value;
      params._id = row._id
      await leaveOperateApi(params);
      proxy.$message.success("删除成功");
      getLeaveList();
      showAddDialog.value = false;
    };
    // api
    const getLeaveList = async () => {
      const params = { ...toRaw(pager), ...toRaw(queryFrom) };
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
      leaveForm,
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
      onChangeDate,
      onSubmit,
      onDelete,
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
