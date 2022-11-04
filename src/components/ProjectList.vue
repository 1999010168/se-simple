<template>
  <div style="width: 80%; margin: 0 auto">
    <el-row>
      <el-button
        @click="
  data.showProject = true;
data.project = {
  Students: [{ No: null, class: null, name: null, login: null }],
};
        "
        type="success"
        style="margin-bottom: 10px"
      >添加</el-button>
      <el-col :span="3" :offset="19">
        评分模式
        <el-switch v-model="data.rateModel" :before-change="switchModel()" />
      </el-col>
    </el-row>
    <el-table :data="data.projects" stripe border>
      <el-table-column type="expand">
        <template #default="props">
          <ProjectStatus :project="props.row"/>
        </template>
      </el-table-column>
      <el-table-column label="成员">
        <template #default="scope">
          {{
            this.showStudents(scope.row.Students)
          }}
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template #default="scope">
          <el-link type="primary" :href="scope.row.url" target="_blank">{{ scope.row.url }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">Edit</el-button>
        </template>
      </el-table-column>
      <el-table-column label="立项" width="70" align="center">
        <template #default="scope">
          <el-input v-if="data.rateModel" v-model="scope.row.lx" size="small"/>
          <span v-else>
            <span v-if="scope.row.lx" style="color: green;">✔</span>
            <span v-else style="color: red;">✖</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="原型" width="70" align="center">
        <template #default="scope">
          <el-input v-if="data.rateModel" v-model="scope.row.yx" size="small"/>
          <span v-else>
            <span v-if="scope.row.yx" style="color: green;">✔</span>
            <span v-else style="color: red;">✖</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="进度" width="70" align="center">
        <template #default="scope">
          <el-input v-if="data.rateModel" v-model="scope.row.jd" size="small"/>
          <span v-else>
            <span v-if="scope.row.jd" style="color: green;">✔</span>
            <span v-else style="color: red;">✖</span>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <ProjectInfo
    :project="data.project"
    v-model="data.showProject"
    :getProjects="getProjects"
    :closeDlg="() => { 
      data.showProject = false 
      getProjects()
      }"
  />
  <Auth
    v-model="data.showAuth"
    :closeDlg="() => { data.showAuth = false }"
    :authCheck="(result) => data.rateModel = result"
  />
</template>

<script>
import { nanoid } from "nanoid";
import axios from "axios";
import ProjectInfo from "./ProjectInfo.vue";
import Auth from "./Auth.vue"
import { reactive, watch } from 'vue';
import ProjectStatus from "./ProjectStatus.vue";

export default {
  components: { ProjectInfo, Auth, ProjectStatus },
  setup() {

    let data = reactive({
      rateModel: false,
      showProject: false,
      showAuth: false,
      input: 123,
      projects: [],
      project: {
        Students: [{ No: null, class: null, name: null, login: null }],
      },
    })

    const switchModel = () => {
      return () => {
        if (data.rateModel == false) {
          data.showAuth = true
          return false;
        }
        return true
      }
    }

    let getProjects = async function () {
      try {
        let res = await axios.get("/api/project/listProjects");
        data.projects = res.data.data
        data.showProject = false;
        data.projects.forEach(item => watch(item, async (value) => {
          let rt = await axios.post('/api/project/addProject', { ...item })
        }, { deep: true }))
      } catch (error) {
        console.log(error);
      }
    }

    let showStudents = function (members) {
      let names = [];
      members.forEach((member) => names.push(`${member.name}:${member.login}`));
      return names.join(" ");
    }

    const handleEdit = function (row) {
      data.project = row;
      data.showProject = true;
    }

    getProjects();



    watch(() => data.showProject, (newValue, oldValue) => {
      console.log('show change');
    })

    return {
      data,
      showStudents,
      getProjects,
      handleEdit,
      switchModel
    }
  }
}

// export default {
//   data() {
//     return {
//       rateModel:false,
//       show: false,
//       projects: [],
//       project: {
//         Students: [{ No: null, class: null, name: null, login: null }],
//       },
//     };
//   },
//   async mounted() {
//     await this.getProjects();
//   },
//   methods: {
//     async getProjects() {
//       try {
//         let res = await axios.get("/api/project/listProjects");
//         this.projects = res.data.data;
//         this.show = false;
//       } catch (error) {
//         console.log(error);
//       }
//     },
//     showStudents(members) {
//       let names = [];
//       members.forEach((member) => names.push(`${member.name}:${member.login}`));
//       return names.join(" ");
//     },
//     handleEdit(row) {
//       this.show = false;
//       this.$nextTick(() => (this.show = true));
//       this.project = row;
//       console.log(row);
//     },
//   },
//   watch:{
//     projects:{
//       handler: function (val, oldVal) {
//         console.log('change')
//         console.log(val)
//         console.log(oldVal)
//       },
//       deep: true
//     }
//   }
// };
</script>

