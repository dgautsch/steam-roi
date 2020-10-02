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
        <el-col v-if="!isAuthenticated" :span="8" class="sroi-logout">
          <NavLink to="/login" />
          /
          <NavLink to="/register" />
        </el-col>
        <el-col v-if="isAuthenticated" :span="8" class="sroi-logout">
          <PageLink href="/api/logout">
            Logout
          </PageLink>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-main>
        <router-view />
      </el-main>
      <el-footer class="sroi-footer">
        Copyright {{ getYear }}
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import NavLink from '~components/NavLink'
import PageLink from '~components/PageLink'
import SiteNavigation from '~components/SiteNavigation'
import { LOGIN_USER, SET_AUTH_STATE } from '~store'

export default {
  name: 'AppRoot',
  components: {
    NavLink,
    PageLink,
    SiteNavigation
  },
  computed: {
    ...mapGetters([
      'isAuthenticated'
    ]),
    getYear () {
      return new Date().getFullYear()
    }
  },
  mounted () {
    if (!this.isAuthenticated) {
      this.$logger.log('Checking authentication status.')
      this.checkAuthenticationStatus()
    }
  },
  methods: {
    ...mapActions({
      setAuthState: SET_AUTH_STATE,
      loginUser: LOGIN_USER
    }),
    async checkAuthenticationStatus () {
      try {
        const { data } = await this.$http.get('/api/account')
        this.$logger.log('User Authorized', data)
        return this.setAuthState({ user: data.userName, authState: true })
      } catch (error) {
        if (error.response &&
          error.response.data.code === 'UNAUTHORIZED') {
          this.$logger.warn('User Unauthorized, disabling registered features.')
          return this.setAuthState({ user: null, authState: false })
        } else {
          this.$logger.warn('Could not check auth status:', error.message)
        }
      }
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
.sroi-site-title {
  a,
  a:hover,
  a:visited {
    color: $--color-primary;
    text-decoration: none;
  }
}
</style>
