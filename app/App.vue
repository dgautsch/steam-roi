<template>
  <el-container class="sroi-container">
    <el-header class="sroi-header">
      <el-row :gutter="20">
        <el-col :span="8">
          <SiteNavigation />
        </el-col>
        <el-col :span="8">
          <h1 class="sroi-site-title">
            <router-link to="/">
              Site
            </router-link>
          </h1>
        </el-col>
        <el-col :span="8" class="sroi-logout">
          <NavLink to="/login" />
          /
          <NavLink to="/register" />
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-main>
        <router-view />
      </el-main>
      <el-footer class="sroi-footer"> Copyright {{ getYear }} </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import NavLink from '~components/NavLink'
import SiteNavigation from '~components/SiteNavigation'

export default {
  name: 'AppRoot',
  components: {
    NavLink,
    SiteNavigation
  },
  computed: {
    getYear () {
      return new Date().getFullYear()
    }
  },
  mounted () {
    this.$logger.log('App mounted')
  }
}
</script>

<style lang="scss">
@import '~sass/main.scss';
.sroi-header {
  border-bottom: 1px solid $--border-color-base;
  text-align: center;
  h1 {
    margin: 0.5em 0 0 0;
  }
  .sroi-logout {
    text-align: right;
  }
}
.sroi-footer {
  font-size: $--font-size-extra-small;
  padding-top: 1em;
  text-align: center;
  border-top: 1px solid $--border-color-base;
}
.sroi-site-title {
  a,
  a:hover,
  a:visited {
    color: $--color-primary;
    text-decoration: none;
  }
}
</style>
