<template>
  <el-container>
    <el-header>
      <el-container>
        <PageHeader :title="title" />
      </el-container>
    </el-header>
    <el-main>
      <el-form label-position="left" label-width="100px">
        <el-form-item label="Username">
          <el-input
            v-model="registerForm.userName"
            placeholder="Username"
          ></el-input>
        </el-form-item>
        <el-form-item label="E-mail">
          <el-input
            v-model="registerForm.email"
            placeholder="E-mail"
          ></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input
            v-model="registerForm.password"
            show-password
            placeholder="Password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm()">Create</el-button>
          <el-button @click="resetForm()">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import PageHeader from '~components/PageHeader.vue'

export default {
  metaInfo: {
    title: 'Steam ROI - Register'
  },
  components: {
    PageHeader
  },
  data () {
    return {
      title: 'Register',
      registerForm: {
        userName: '',
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="sass"></style>
