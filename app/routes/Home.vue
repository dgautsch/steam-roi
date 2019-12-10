<template>
  <el-container>
    <PageHeader :title="title" />
  </el-container>
</template>

<script>
import PageHeader from '~components/PageHeader.vue'

export default {
  metaInfo: {
    title: 'Steam ROI - Home'
  },
  components: {
    PageHeader
  },
  data () {
    return {
      title: 'Home'
    }
  }
}
</script>

<style lang="sass"></style>
