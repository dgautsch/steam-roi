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
    title: 'Steam ROI - Account'
  },
  data () {
    return {
      logo,
      title: 'Account'
    }
  }
}
</script>

<style lang="sass"></style>
