<template>
  <div>
    <h1>{{ title }}</h1>
    <img :src="logo" />
  </div>
</template>

<script>
import logo from '../assets/logo.png'

export default {
  metaInfo: {
    title: 'Steam ROI - Home'
  },
  data () {
    return {
      logo,
      title: 'Welcome'
    }
  }
}
</script>

<style lang="sass"></style>
