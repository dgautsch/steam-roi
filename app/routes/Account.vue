<template>
  <el-container>
    <PageHeader :title="title" />
    <button type="button" @click="getAccount">
      Get Account Details
    </button>
    <pre>
      {{ accountData }}
    </pre>
  </el-container>
</template>

<script>
import PageHeader from '~components/PageHeader.vue'

export default {
  name: 'AccountPage',
  metaInfo: {
    title: 'Steam ROI - Account'
  },
  components: {
    PageHeader
  },
  data () {
    return {
      title: 'Account',
      accountData: {}
    }
  },
  mounted () {
    this.getAccount()
  },
  methods: {
    async getAccount () {
      const account = await this.$http.get('/api/account')
      this.accountData = account
    }
  }
}
</script>

<style lang="sass"></style>
