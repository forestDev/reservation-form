<template>
  <div class="calendar-header">
    <img
      class="calendar-header__arrow calendar-header__arrow--left"
      src="@/assets/images/arrow-small-right.png"
      alt="arrow right"
      @click="prevMonth"
    />
    <div>{{ verboseHeader }}</div>
    <img
      class="calendar-header__arrow"
      src="@/assets/images/arrow-small-right.png"
      alt="arrow right"
      @click="nextMonth"
    />
  </div>
</template>

<script>
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default {
  props: {
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  computed: {
    verboseHeader() {
      return `${MONTHS[this.month]} ${this.year}`;
    },
  },
  methods: {
    prevMonth() {
      if (this.month === 0) {
        this.$emit("update:month", 11);
        this.$emit("update:year", this.year - 1);
      } else {
        this.$emit("update:month", this.month - 1);
      }
      this.$emit("change");
    },
    nextMonth() {
      if (this.month === 11) {
        this.$emit("update:year", this.year + 1);
        this.$emit("update:month", 0);
      } else {
        this.$emit("update:month", this.month + 1);
      }
      this.$emit("change");
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-header {
  display: flex;
  justify-content: space-between;
  height: 48px;
  padding: 12px;
  box-sizing: border-box;
  background: $primary;
  align-items: center;
  color: $white;
  &__arrow {
    height: 16px;
    margin: auto 0;
    &--left {
      transform: rotate(180deg);
    }
  }
}
</style>
