<script setup>
defineProps({
  size: {
    type: String,
    default: 'small', // small | large
  },

  styleVariant: {
    type: String,
    default: 'primary', // primary | secondary | dark
  },

  iconOnly: Boolean,
});
</script>

<template>
  <button class="Button" :class="[`Button--${size}`, `Button--${styleVariant}`, iconOnly && 'Button--icon-only']">
    <slot/>
  </button>
</template>

<style lang="scss">
@import "@/styles/mixins.scss";

.Button {
  $this: &;
  @include button-transition-scale;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  background: var(--primary-color);
  color: var(--main-bg);
  border-radius: 7px;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  width: fit-content;
  gap: 8px;
  user-select: none;

  > .Icon {
    font-size: 20px;
  }

  &--icon-only {
    padding: 12px;
  }

  &--large {
    @include button-transition-scale(.95);
    width: 100%;
    padding: 16px 24px;
    border-radius: 16px;

    &#{ $this }--icon-only {
      width: fit-content;
      padding: 16px;
    }
  }

  &--secondary {
    background: var(--secondary-bg);
    color: var(--text-color-secondary);
  }

  &--dark {
    background: var(--dark-bg);
    color: var(--text-color-secondary);
  }
}
</style>
