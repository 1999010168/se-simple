<template>
  <el-dialog title="编辑权限验证" width="625px">
    <el-form ref="form" :model="data" label-width="120px" v-loading="data.loading">
      <el-form-item label="挑战码">
        <el-input v-model="data.uuid" readonly />
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="data.authCode" placeholder="请输入32位验证码" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDlg()">取消</el-button>
        <el-button type="primary" @click="auth()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from 'axios'
import { nanoid } from 'nanoid'
import { reactive } from 'vue'
export default {
  props: ['closeDlg', 'authCheck'],
  setup(props) {
    const data = reactive({
      loading: false,
      uuid: nanoid(8),
      authCode: ''
    })

    let auth = async function () {
      try {
        console.log(this);
        this.loading = true;
        let rt = await axios.post('/api/project/auth', { ...this.data })
        if (rt.data.success) {
          console.log('ok')
          props.authCheck(true);
        } else {
          console.log('false')
          props.authCheck(false);
        }
        props.closeDlg();
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    }
    return { data, auth, props }
  }
}
</script>