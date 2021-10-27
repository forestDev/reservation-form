<template>
  <button
    :class="{ 'bttn--disabled': isDisabled, 'bttn--loading': isLoading }"
    :disabled="isDisabled || isLoading"
    class="bttn"
    @click="$emit('click')"
  >
    <span v-if="isLoading" />
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      defaul: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.bttn {
  outline: none;
  width: 100%;
  color: $white;
  height: 48px;
  background: $red;
  padding: 0.5 * $gap;
  display: flex;
  font-size: 18px;
  border: none;
  border-radius: $radius;

  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition-property: opacity, background-color;
  transition-duration: 0.3s;
  &:hover:not(.bttn--disabled):not(.bttn--loading) {
    background: darken($color: $red, $amount: 5%);
  }
  &--disabled {
    cursor: default;
    &:not(.bttn--loading) {
      opacity: 0.8;
    }
  }
  &--loading {
    cursor: default;
    span {
      width: 32px;
      height: 32px;
      border: 3px solid $white;
      border-radius: 50%;
      border-top-color: $black;
      animation: spin 1s ease-in-out infinite;
    }
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
