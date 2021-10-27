<template>
  <div>
    <label class="label" for="input-text">{{ label }}</label>
    <input
      :placeholder="placeholder"
      type="text"
      id="input-text"
      :value="value"
      @blur="$emit('input', $event.target.value)"
    />
    <button v-if="withBttn" @click="$emit('clickBtn')">{{ bttnText }}</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
    },
    bttnText: {
      type: String,
      default: "Click",
    },
    withBttn: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.label {
  margin-right: 0.5 * $gap;
}
</style>
