<template>
  <el-container>
    <el-header>
      <el-container>
        <PageHeader :title="title" />
      </el-container>
    </el-header>
    <el-main>
      <h2>Welcome to the site, {{ userName }}</h2>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
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
      title: 'Account'
    }
  },
  computed: {
    ...mapGetters([
      'userName'
    ])
  }
}
</script>

<style lang="sass"></style>
