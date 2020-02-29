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
            v-model="registerForm.email"
            name="email"
            placeholder="E-mail"
            required
          />
        </el-form-item>
        <el-form-item label="Password">
          <el-input
            id="password"
            v-model="registerForm.password"
            name="password"
            show-password
            placeholder="Password"
            required
          />
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click.prevent="submitForm">
            Create
          </el-button>
          <el-button @click="resetForm">
            Reset
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import { mapActions } from 'vuex'

import PageHeader from '~components/PageHeader.vue'
import { REGISTER_USER } from '~data'

const userModel = {
  email: '',
  password: ''
}

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
      registerForm: userModel
    }
  },
  methods: {
    ...mapActions({
      registerUser: REGISTER_USER
    }),
    resetForm () {
      this.registerForm = userModel
    },
    async submitForm () {
      try {
        await this.registerUser({
          client: this.$http,
          payload: this.registerForm
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="sass"></style>
