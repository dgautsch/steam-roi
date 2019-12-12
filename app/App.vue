<template>
  <el-container class="sroi-container">
    <el-header class="sroi-header">
      <el-row :gutter="20">
        <el-col :span="8">
          <SiteNavigation />
        </el-col>
        <el-col :span="8">
          <h1>Steam ROI</h1>
        </el-col>
        <el-col :span="8" class="sroi-logout">
          <router-link to="/login" v-slot="{ href, navigate, route }">
            <el-link :href="href" @click="navigate">{{ route.name }}</el-link>
          </router-link>
          /
          <router-link to="/register" v-slot="{ href, navigate, route }">
            <el-link :href="href" @click="navigate">{{ route.name }}</el-link>
          </router-link>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-main>
        <router-view />
      </el-main>
      <el-footer class="sroi-footer">Copyright {{ getYear }}</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import SiteNavigation from '~components/SiteNavigation'

export default {
  name: 'AppRoot',
  components: {
    SiteNavigation
  },
  computed: {
    getYear () {
      return new Date().getFullYear()
    }
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
</style>
