<template>
  <el-container>
    <el-header>
      <el-container>
        <PageHeader :title="title" />
      </el-container>
    </el-header>
    <el-container>
      <el-form label-position="left" label-width="100px">
        <el-form-item label="Username">
          <el-input v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="E-mail">
          <el-input v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm()">Create</el-button>
          <el-button @click="resetForm()">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-container>
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
      loginForm: {
        userName: '',
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="sass"></style>
