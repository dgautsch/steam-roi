<template>
  <el-container>
    <el-aside width="200px">
      <SiteNavigation />
    </el-aside>
    <el-container>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import SiteNavigation from '~components/SiteNavigation'

export default {
  name: 'AppRoot',
  components: {
    SiteNavigation
  }
}
</script>

<style lang="scss">
@import '~sass/main.scss';
</style>
