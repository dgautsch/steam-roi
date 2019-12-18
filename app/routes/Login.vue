<template>
  <el-container>
    <PageHeader :title="title" />
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
      title: 'Login'
    }
  }
}
</script>

<style lang="sass"></style>
