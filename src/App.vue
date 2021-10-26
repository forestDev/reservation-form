<template>
  <div>
    <base-form
      :price="price"
      :stars="stars"
      :currency="currency"
      :selectedDates="selectedDates"
      :disabledDates="disabledDates"
    />
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
    // TODO: Handle different format
    selectedDates: ["2021.10.20", "2021.10.13"],
    disabledDates: ["2021.10.08"],
  }),
};
</script>

<style lang="scss" scoped></style>
