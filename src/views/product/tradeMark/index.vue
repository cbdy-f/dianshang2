<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showDialog"
      >添加</el-button
    >
    <el-table style="width: 100%" border align="center" :data="list">
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      :page-count="7"
      layout="  prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    >
    </el-pagination>

    <!-- 对话框 -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- form表单 -->
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!--  -->
          <el-upload
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            action="/brand-api/admin/product/fileUpload"
            :show-file-list="false"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script >
export default {
  name: "tradeMark",
  data() {
    return {
      page: 1,
      limit: 3,
      //总共数据条数
      total: 0,
      //列表展示的数据
      list: [],
      //对话框显示与隐藏控制的属性
      dialogFormVisible: false,
      //收集品牌信息
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      //表单验证规则
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2到10个字符", trigger: "change" },
        ],
        logoUrl: [{ required: true, message: "请输入品牌图片" }],
      },
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    //获取品牌列表的数据
    async getPageList(pager = 1) {
      this.page = pager;
      //解构出参数
      const { page, limit } = this;
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    //点击添加品牌按钮
    showDialog() {
      this.dialogFormVisible = true;
      //清除数据
      this.tmForm = { tmName: "", logoUrl: "" };
    },
    //修改某个品牌
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      //将已有的品牌信息给tm进行暴露
      this.tmForm = { ...row };
    },
    //图片上传成功
    handleAvatarSuccess(res, file) {
      //收集品牌图片数据,因为将来要带给服务器
      this.tmForm.logoUrl = res.data;
    },
    //图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //添加按钮(添加或者修改品牌)
    addOrUpdateTradeMark() {
      //当全部验证字段通过，再去书写业务逻辑
      this.$refs.ruleForm.validate(async (success) => {
        //如果全部字段符合条件
        if (success) {
          this.dialogFormVisible = false;
          //发请求（添加品牌|修改品牌）
          let result = await this.$API.trademark.reqAddorUpdateTradeMark(
            this.tmForm
          );
          if (result.code == 200) {
            //弹出信息:添加品牌成功、修改品牌成功
            this.$message({
              type: "success",
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
            });
            //添加或者修改品牌成功以后，需要再次获取品牌列表进行展示
            //如果添加品牌： 停留在第一页，修改品牌应该留在当前页面
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除品牌
    deleteTradeMark(row) {
      this.$confirm(`你确定删除${row.tmName}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //当用户点击确定按钮的时候触发
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //再次获取品牌列表数据
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1);
          }
        })
        .catch(() => {
          //当用户点击按钮的时候触发
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
