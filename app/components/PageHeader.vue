<template>
  <div>
    <el-page-header @back="goBack" title="Back">
      <template v-slot:content>
        <h2>{{ title }}</h2>
      </template>
    </el-page-header>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.el-page-header__content {
  h2 {
    font-size: 18px;
    margin: 0;
  }
}
</style>
