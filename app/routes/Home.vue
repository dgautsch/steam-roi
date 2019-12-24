<template>
  <el-row :gutter="16">
    <el-col :span="16">
      <div class="grid-content">
        <div class="el-page-header__content">
          <h1>{{ title }}</h1>
        </div>
      </div>
    </el-col>
  </el-row>
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
