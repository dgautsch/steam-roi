<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu"
    background-color="#282828"
    text-color="#FFFFFF"
  >
    <el-menu-item index="1">
      <router-link to="/">
        Home
      </router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/login">
        Login
      </router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <router-link to="/register">
        Register
      </router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'SiteNavigation',
  props: {
    displayType: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      activeIndex: '1'
    }
  }
}
</script>

<style lang="scss">
@import '~sass/_variables';
.el-menu {
  a:visited,
  a {
    display: inline-block;
    color: $color-white;
    height: 100%;
    width: 100%;
  }
  a:hover {
    color: $color-highlight;
  }
}
</style>
