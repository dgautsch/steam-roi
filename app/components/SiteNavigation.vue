<template>
  <div class="sroi-site-navigation">
    <el-button type="success" icon="el-icon-menu" circle @click="handleClick" />
    <el-drawer :visible.sync="drawerOpen" direction="ltr">
      <template v-slot:title>
        <h3>Navigation</h3>
      </template>
      <template v-slot:default>
        <el-menu
          :default-active="activeIndex"
          class="sroi-menu"
          @select="handleSelect"
        >
          <el-menu-item index="1">
            <NavLink to="/" />
          </el-menu-item>
          <el-menu-item index="2">
            <NavLink to="/login" />
          </el-menu-item>
          <el-menu-item index="3">
            <NavLink to="/register" />
          </el-menu-item>
        </el-menu>
      </template>
    </el-drawer>
  </div>
</template>

<script>
import NavLink from '~components/NavLink'

export default {
  name: 'SiteNavigation',
  components: {
    NavLink
  },
  data () {
    return {
      activeIndex: this.$router.activeIndex,
      drawerOpen: false
    }
  },
  methods: {
    handleClick () {
      this.drawerOpen = !this.drawerOpen
    },
    handleSelect () {
      this.drawerOpen = false
    }
  }
}
</script>

<style lang="scss">
@import '~sass/_variables';
.sroi-site-navigation {
  text-align: left;
}
.sroi-menu {
  a:visited,
  a {
    display: inline-block;
    height: 100%;
    width: 100%;
  }
  a:focus {
    outline: 1px solid red;
  }
}
</style>
