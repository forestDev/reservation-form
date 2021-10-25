<template>
  <div>
    <base-form :price="price" :stars="stars" :currency="currency" />
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
    currency: "zł",
  }),
};
</script>

<style lang="scss" scoped></style>
