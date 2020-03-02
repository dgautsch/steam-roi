<template>
  <el-container>
    <el-header>
      <PageHeader :title="title" />
    </el-header>
    <el-main>
      <el-form label-position="left" label-width="100px">
        <el-form-item label="E-mail">
          <el-input
            id="email"
            v-model="loginForm.email"
            name="email"
            placeholder="E-mail"
            required
          />
        </el-form-item>
        <el-form-item label="Password">
          <el-input
            id="password"
            v-model="loginForm.password"
            name="password"
            show-password
            placeholder="Password"
            required
          />
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click.prevent="onSubmit">
            Login
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import { mapActions } from 'vuex'

import PageHeader from '~components/PageHeader.vue'
import { LOGIN_USER } from '~store'

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
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      loginUser: LOGIN_USER
    }),
    async onSubmit () {
      try {
        await this.loginUser({
          client: this.$http,
          payload: this.loginForm
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="sass"></style>
