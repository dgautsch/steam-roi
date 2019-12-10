<template>
  <el-container>
    <el-aside width="200px">
      <el-menu :default-active="activeIndex" class="el-menu">
        <el-menu-item index="1">
          <router-link to="/">
            Home
          </router-link>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">Account</template>
          <el-menu-item index="2-1">
            <router-link to="/account">
              My Account
            </router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <router-link to="/login">
              Login
            </router-link>
          </el-menu-item>
          <el-menu-item index="2-3">
            Logout
          </el-menu-item>
          <el-menu-item index="2-4">
            My Games
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <router-view />
      </el-main>
      <el-footer> Footer {{ hello }} </el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'AppRoot',
  data () {
    return {
      activeIndex: '1',
      hello: 'hello world'
    }
  }
}
</script>

<style lang="scss">
@import '~sass/main.scss';
</style>
