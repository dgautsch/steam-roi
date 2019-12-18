<template>
  <el-container>
    <div class="el-page-header__title">
      <h1>{{ title }}</h1>
    </div>
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
