<template>
  <el-container>
    <PageHeader :title="title" />
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
      title: 'Register'
    }
  }
}
</script>

<style lang="sass"></style>
