<template>
  <router-link v-slot="{ href, isActive, navigate, route }" :to="to">
    <PageLink :active="isActive" :href="href" v-bind="$attrs" @click="navigate">
      {{ route.name }}
    </PageLink>
  </router-link>
</template>

<script>
import PageLink from '~components/PageLink'

export default {
  name: 'NavLink',
  components: {
    PageLink
  },
  props: {
    to: {
      required: true,
      type: String
    }
  }
}
</script>
