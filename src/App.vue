<template>
  <div>
    <base-form :price="price" :stars="stars" />
  </div>
</template>

<script>
import BaseForm from "@/components/BaseForm";
export default {
  name: "App",
  components: {
    BaseForm,
  },
  data: () => ({
    stars: 4.5,
    price: 298,
  }),
};
</script>

<style lang="scss" scoped></style>
