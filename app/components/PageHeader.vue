<template>
  <div>
    <el-page-header
      @back="goBack"
      title="Back"
      :content="title"
    ></el-page-header>
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
