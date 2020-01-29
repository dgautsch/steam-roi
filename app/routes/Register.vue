<template>
  <el-container>
    <el-header>
      <el-container>
        <PageHeader :title="title" />
      </el-container>
    </el-header>
    <el-main>
      <el-form label-position="left" label-width="100px">
        <el-form-item label="E-mail">
          <el-input
            id="email"
            name="email"
            v-model="registerForm.email"
            placeholder="E-mail"
            required
          ></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input
            id="password"
            name="password"
            v-model="registerForm.password"
            show-password
            placeholder="Password"
            required
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm" type="success">Create</el-button>
          <el-button @click="resetForm">Reset</el-button>
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
        email: '',
        password: ''
      }
    }
  },
  methods: {
    resetForm () {
      this.registerForm = {
        email: '',
        password: ''
      }
    },
    submitForm (e) {
      e.preventDefault()
      this.$http.post('/api/register', this.registerForm)
    }
  }
}
</script>

<style lang="sass"></style>
