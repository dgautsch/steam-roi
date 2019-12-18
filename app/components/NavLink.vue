<template>
  <router-link :to="to" v-slot="{ href, isActive, navigate, route }">
    <PageLink
      :active="isActive"
      :href="href"
      @click="navigate"
      v-bind="$attrs"
      >{{ route.name }}</PageLink
    >
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
