<template>
  <div>
    <label class="input-label" v-if="label">{{ label }}</label>
    <input
      class="input"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :type="inputType"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    inputType: {
      type: String,
      default: "text",
    },
  },
};
</script>

<style lang="scss" scoped>
.input-label {
  @include input-label;
}
.input {
  width: 100%;
  border: 1px solid $gray;
  border-radius: $radius;
  height: 48px;
  outline: none;
  padding: 0.5 * $gap;
}
</style>
