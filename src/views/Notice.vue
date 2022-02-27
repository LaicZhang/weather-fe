<template>
  <div class="notice-page">
    <div class="notice-from-wrap radius-hide" v-has="'notice-query'">
      <el-form inline :model="noticeFrom" ref="formRef">
        <el-form-item label="通知ID" prop="_id">
          <el-input v-model="noticeFrom._id" />
        </el-form-item>
        <el-form-item label="通知标题" prop="noticeName">
          <el-input v-model="noticeFrom.noticeName" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select :model-value="1" v-model="noticeFrom.state">
            <el-option label="已阅读" :value="0" />
            <el-option label="未阅读" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearchNoticeFrom">查询</el-button>
          <el-button type="danger" @click="onResetNoticeFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button type="primary" v-has="'notice-create'" @click="onAddNoticeBtn">新增</el-button>
      <el-button type="danger" v-has="'notice-delete'" @click="onDeleteNoticeSelects"
        >批量删除</el-button
      >
      <el-table
        @selection-change="onChangeNoticeSelects"
        class="base-table"
        :data="noticeList"
        size="medium"
        stripe
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="column in noticeColumns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :formatter="column.formatter"
          show-overflow-tooltip
        />
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="mini" type="text" @click="onEditNotice(scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="onAddDeleteList(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="text-right"
        background
        layout="prev, pager, next"
        :current-page="pager.pageNum"
        :page-size="pager.pageSize"
        :total="pager.total"
        @current-change="onChangeCurrentPage"
      />
    </div>
    <!-- 删除弹窗 -->
    <el-dialog v-model="deleteDialog" title="操作" width="30%">
      <span>确定删除?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialog = false">取消</el-button>
          <el-button type="primary" @click="onDeleteNoticeSelects">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 新增弹窗 -->
    <el-dialog v-model="addDialog" title="操作" width="30%">
      <el-form
        ref="addFromRef"
        :model="addNoticeFrom"
        label-width="90px"
        :rules="addNoticeFromRules"
      >
        <el-form-item label="通知标题" prop="noticeTitle">
          <el-input
            placeholder="请输入通知标题"
            v-model="addNoticeFrom.noticeTitle"
          ></el-input>
        </el-form-item>
        <el-form-item label="通知内容" prop="noticeContent">
          <el-input
            placeholder="请输入通知内容"
            v-model="addNoticeFrom.noticeContent"
            :rows="4"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onSummit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import {
    defineComponent,
    onMounted,
    reactive,
    ref,
    getCurrentInstance,
    toRaw,
    nextTick,
  } from 'vue';
  import {
    noticeListApi,
    deleteNoticeApi,
    rolesAllListApi,
    addNoticeApi,
    editNoticeApi,
    noticeAllListApi,
  } from '../api';
  import util from '../util/utils';
  export default defineComponent({
    name: 'Notice',
    components: {},
    setup() {
      const { proxy } = getCurrentInstance();
      // 属性
      const noticeFrom = reactive({
        _id: '',
        noticeTitle: '',
        state: 1,
      });
      const pager = reactive({
        pageNum: 1,
        pageSize: 10,
        total: 0,
      });
      const noticeColumns = [
        { prop: '_id', label: '通知ID' },
        { prop: 'noticeTitle', label: '通知标题' },
        {
          prop: 'noticeContent',
          label: '通知内容',
        },
        {
          prop: 'haveReadCount',
          label: '已阅读人数',
        },
        {
          prop: 'createTime',
          label: '创建时间',
          formatter(row, column, cellValue) {
            return util.formateDate(new Date(cellValue));
          },
        },
        {
          prop: 'updateTime',
          label: '更新时间',
          formatter(row, column, cellValue) {
            return util.formateDate(new Date(cellValue));
          },
        },
      ];
      const isEdit = ref(false);
      const noticeList = ref([]);
      const noticeSelects = ref([]);
      const addDialog = ref(false);
      const deleteDialog = ref(false);
      const addNoticeFrom = reactive({});
      const roleList = ref([]);
      const deptList = ref([]);
      const addNoticeFromRules = {
        noticeTitle: {
          required: true,
          message: '必须填写通知标题',
          trigger: 'blur',
        },
        noticeContent: {
          required: true,
          message: '必须填写通知内容',
          trigger: 'blur',
        },
      };
      // api
      const getNoticeList = async () => {
        const params = { ...noticeFrom, ...pager };
        const { list, page } = await noticeListApi(params);
        pager.pageNum = page.pageNum;
        pager.total = page.total;
        noticeList.value = list;
      };
      const getAllNoticesList = async () => {
        const { list, page } = await noticeAllListApi({});
        pager.pageNum = page.pageNum;
        pager.total = page.total;
        noticeList.value = list;
        console.log(noticeList.value);
      };
      const deleteNotice = async () => {
        if (noticeSelects.value.length > 0) {
          return deleteNoticeApi({ _ids: noticeSelects.value });
        } else {
          proxy.$message.error('请选择删除项');
        }
        noticeAllListApi();
      };
      const getRoleList = async () => {
        roleList.value = await rolesAllListApi();
      };
      const addNotice = async () => {
        const noticeFormRaw = toRaw(addNoticeFrom);
        console.log('noticeFormRaw', noticeFormRaw);
        return addNoticeApi(noticeFormRaw);
      };
      const editNotice = async () => {
        const noticeFormRaw = toRaw(addNoticeFrom);
        return editNoticeApi(noticeFormRaw);
      };
      // 通用方法
      const resetFields = (refName) => {
        proxy.$refs[refName].resetFields();
      };
      // 事件方法: 多选时存入选中列表中
      const onChangeNoticeSelects = (list) => {
        noticeSelects.value = list.map((notice) => notice._id);
      };
      const onChangeCurrentPage = (currentPage) => {
        pager.pageNum = currentPage;
        getNoticeList();
      };
      const onSearchNoticeFrom = () => {
        getNoticeList();
      };
      const onResetNoticeFrom = () => {
        proxy.$refs.formRef.resetFields();
        getAllNoticesList();
      };
      const onEditNotice = async (notice) => {
        addDialog.value = true;
        isEdit.value = true;
        await nextTick(() => {
          Object.assign(addNoticeFrom, notice);
        });
      };
      const onAddNoticeBtn = () => {
        isEdit.value = false;
        addDialog.value = true;
      };
      const onAddDeleteList = (notice) => {
        noticeSelects.value = [notice._id];
        console.log('noticeSelects.value=>', noticeSelects.value);
        deleteDialog.value = true;
      };
      const onDeleteNoticeSelects = async () => {
        try {
          const { nModified } = await deleteNotice();
          if (nModified > 0) {
            noticeSelects.value = [];
            proxy.$message.success('删除成功');
          } else {
            proxy.$message.error('删除失败');
          }
        } catch (error) {}
        deleteDialog.value = false;
            getAllNoticesList();
      };
      const onCancel = () => {
        isEdit.value = false;
        resetFields('addFromRef');
        // addNoticeFrom.state = 3;
        addDialog.value = false;
      };
      const onSummit = () => {
        proxy.$refs.addFromRef.validate(async (valid) => {
          if (valid) {
            try {
              let res;
              console.log('isEdit.value=>', isEdit.value);
              if (isEdit.value) {
                res = await editNotice();
              } else {
                res = await addNotice();
              }
              if (res) {
                proxy.$message.success('通知操作成功');
              } else {
                proxy.$message.error('通知添加失败');
              }
              resetFields('addFromRef');
            } catch (error) {
                proxy.$message.error('通知添加失败');
            }
            // getNoticeList();
            getAllNoticesList();
            addDialog.value = false;
          }
        });
      };
      // 生命周期
      onMounted(() => {
        getRoleList();
        getAllNoticesList();
      });
      //
      return {
        noticeFrom,
        noticeColumns,
        noticeList,
        onChangeNoticeSelects,
        pager,
        isEdit,
        addNoticeFrom,
        addNoticeFromRules,
        roleList,
        deptList,
        addDialog,
        deleteDialog,
        onChangeCurrentPage,
        onSearchNoticeFrom,
        onResetNoticeFrom,
        onEditNotice,
        onAddNoticeBtn,
        onAddDeleteList,
        onDeleteNoticeSelects,
        onSummit,
        onCancel,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .notice-page {
    padding: 30px;
    box-sizing: border-box;
    .notice-from-wrap {
      background: white;
      margin-bottom: 18px;
      .el-form {
        padding: 18px;
        .el-form-item {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
