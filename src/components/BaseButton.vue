<template>
  <button class="bttn" @click="emit('click')">
    <slot />
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bttn {
  outline: none;
  width: 100%;
  color: $white;
  background: $red;
  padding: 0.5 * $gap;
  display: flex;
  font-size: 18px;
  border: none;
  border-radius: $radius;
  align-content: center;
  justify-content: center;
}
</style>
