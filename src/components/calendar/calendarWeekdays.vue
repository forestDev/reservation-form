<template>
  <div>
    <ul class="calendar-body">
      <li
        class="calendar-body__item calendar-body__item--verbose-days"
        v-for="verboseDay in verboseDays"
        :key="verboseDay"
      >
        {{ verboseDay }}
      </li>
      <li
        class="calendar-body__item"
        :class="{ 'calendar-body__item--gray': !item.isCurrentMonth }"
        v-for="(item, idx) in days"
        :key="idx"
      >
        {{ asDay(item.date) }}
      </li>
    </ul>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    days: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    verboseDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  }),
  methods: {
    asDay(date) {
      return dayjs(date).get("date");
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-body {
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(7, 1fr);
  padding: 0.5 * $gap;
  background: $white;
  grid-gap: 20px;
  margin: 0;
  box-shadow: 0px 0 12px lighten($black, 80%);

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    &--gray {
      color: $gray;
    }
    &--verbose-days {
      color: $gray;
      font-size: 14px;
    }
  }
}
</style>
