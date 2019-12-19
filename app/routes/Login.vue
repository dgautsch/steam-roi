<template>
  <el-container>
    <el-header>
      <PageHeader :title="title" />
    </el-header>
    <el-main>
      <el-form
        label-position="left"
        label-width="100px"
        :noValidate="noValidate"
        @submit.prevent="onSubmit"
      >
        <el-form-item label="Username">
          <el-input
            v-model.trim="loginForm.userName"
            placeholder="Username"
            required
          ></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input
            v-model="loginForm.password"
            show-password
            placeholder="Password"
            required
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" native-type="submit">Login</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import PageHeader from '~components/PageHeader.vue'

export default {
  metaInfo: {
    title: 'Steam ROI - Login'
  },
  components: {
    PageHeader
  },
  data () {
    return {
      title: 'Login',
      noValidate: false,
      loginForm: {
        userName: '',
        password: ''
      }
    }
  },
  mounted () {
    this.noValidate = true
  },
  methods: {
    onSubmit () {
      console.log(this.loginForm)
    }
  }
}
</script>

<style lang="sass"></style>
