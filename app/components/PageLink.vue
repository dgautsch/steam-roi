<template>
  <a
    :class="[
      'el-link',
      type ? `el-link--${type}` : '',
      disabled && 'is-disabled',
      underline && !disabled && 'is-underline'
    ]"
    :href="disabled ? null : href"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <i v-if="icon.length > 0" :class="icon" />
    <span v-if="$slots.default" class="el-link--inner">
      <slot />
    </span>

    <template v-if="$slots.icon">
      <slot v-if="$slots.icon" name="icon" />
    </template>
  </a>
</template>

<script>
export default {
  name: 'PageLink',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    underline: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    href: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
