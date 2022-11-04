<template>
  <el-dialog title="添加小组信息" width="625px" v-model="show">
    <el-form ref="form" :model="project" label-width="120px" v-loading="loading">
      <el-form-item label="项目地址">
        <el-input v-model="project.url" placeholder="项目在Gitee上的地址"></el-input>
      </el-form-item>
      <el-form-item label="项目成员" v-for="(item,i) in project.Students" :key="item.id">
        <el-row style="padding-bottom: 5px;">
          <el-col :span="10">
            <el-input v-model="item.class" placeholder="班级"></el-input>
          </el-col>
          <el-col :span="1">&nbsp</el-col>
          <el-col :span="12">
            <el-input v-model="item.No" placeholder="学生学号" required></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-input v-model="item.name" placeholder="学生姓名"></el-input>
          </el-col>
          <el-col :span="1">&nbsp</el-col>
          <el-col :span="10">
            <el-input v-model="item.login" placeholder="Gitee账号名"></el-input>
          </el-col>
          <el-col :span="1">
            <el-button
              icon="el-icon-plus"
              type="success"
              size="small"
              style="margin-left:10px"
              circle
              v-if="i === (project.Students.length - 1)"
              @click="addStudent"
            ></el-button>
            <el-button
              icon="el-icon-minus"
              type="danger"
              size="small"
              style="margin-left:10px"
              circle
              v-else
              @click="removeStudent(i)"
            ></el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDlg()">取消</el-button>
        <el-button type="primary" @click="addProject">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from 'axios'
export default {
  props: ['project', 'show', 'getProjects', 'closeDlg'],
  data() {
    return ({
      loading: false
    })
  },
  methods: {
    async addProject() {
      try {
        this.loading = true;
        let rt = await axios.post('/api/project/addProject', { ...this.project })
        await this.getProjects();
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    addStudent() {
      this.project.Students.push({ No: null, class: null, name: null, login: null });
    },
    removeStudent(index){
      this.project.Students.splice(index,1)
    }
  }
}
</script>