<template>
  <el-container>
    <PageHeader :title="title" />
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
      title: 'Account'
    }
  }
}
</script>

<style lang="sass"></style>
