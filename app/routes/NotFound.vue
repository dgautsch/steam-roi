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
export default {
  metaInfo: {
    title: '404 - Not found'
  },
  data () {
    return {
      title: '404 - Not found'
    }
  }
}
</script>

<style lang="sass"></style>
