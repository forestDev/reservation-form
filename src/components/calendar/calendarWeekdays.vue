<template>
  <div>
    <ul
      class="calendar-body"
      :class="{ 'calendar-body--error': isDisabledDateInRangeDates }"
    >
      <li
        class="calendar-body__item calendar-body__item--verbose-days"
        v-for="verboseDay in verboseDays"
        :key="verboseDay"
      >
        {{ verboseDay }}
      </li>
      <li
        class="calendar-body__item calendar-body__item--day"
        :class="{
          'calendar-body__item--gray': !item.isCurrentMonth,
          'calendar-body__item--current-day': isToday(item.date),
          'calendar-body__item--selected-first-day': isFirstSelectedDate(
            item.date
          ),
          'calendar-body__item--selected-second-day': isSecondSelectedDate(
            item.date
          ),
          'calendar-body__item--selected-range': isBetweenSelectedDates(
            item.date
          ),
          'calendar-body__item--disabled': isDisabled(item.date),
        }"
        v-for="(item, idx) in days"
        :key="idx"
        @click="onSelect(item)"
        @mouseover="onHover(item)"
      >
        <span>
          {{ asDay(item.date) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import dayjs from "dayjs";

const isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

export default {
  props: {
    days: {
      type: Array,
      required: true,
    },
    selectedRangeDates: {
      type: Array,
      default: () => [],
    },
    disabledDates: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    verboseDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  }),
  methods: {
    isDisabled(date) {
      return this.disabledDates.includes(date);
    },
    isFirstSelectedDate(date) {
      return dayjs(this.selectedRangeDates[0]).isSame(dayjs(date));
    },
    isSecondSelectedDate(date) {
      return dayjs(this.selectedRangeDates[1]).isSame(dayjs(date));
    },
    isBetweenSelectedDates(date) {
      return dayjs(date).isBetween(
        this.selectedRangeDates[0],
        this.selectedRangeDates[1]
      );
    },
    onSelect(item) {
      if (!this.isDisabled(item.date) && !this.isDisabledDateInRangeDates) {
        this.$emit("select", item);
      }
    },
    onHover(item) {
      this.$emit("hoverDay", item);
    },
    asDay(date) {
      return dayjs(date).get("date");
    },
    isToday(date) {
      return dayjs(date).isSame(dayjs().format("YYYY.MM.DD"));
    },
  },
  computed: {
    isDisabledDateInRangeDates() {
      return this.disabledDates.some((date) =>
        this.isBetweenSelectedDates(date)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
// TODO: Refactor styles
.calendar-body {
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(7, 1fr);
  padding: 0.5 * $gap;
  background: $white;
  margin: 0;
  box-shadow: 0px 0 12px lighten($black, 80%);
  &--error {
    .calendar-body__item--selected-range,
    .calendar-body__item--selected-first-day::after,
    .calendar-body__item--selected-second-day::after {
      background-color: $highlight-red !important;
      z-index: 0;
      color: $red;
    }
    .calendar-body__item--selected-first-day::before,
    .calendar-body__item--selected-second-day::before {
      background-color: $red;
      border-color: $red;
    }
    .calendar-body__item--day:hover::before {
      background-color: $red !important;
      border-color: $highlight-red !important;
    }
  }
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    @media (min-width: 768px) {
      padding: 18px;
    }
    &--gray {
      color: $gray;
    }
    &--current-day {
      &::before {
        @include day-circle;
        content: "";
        position: absolute;
      }
      color: $primary;
    }
    &--selected-first-day,
    &--selected-second-day {
      position: relative;
      &::before {
        @include day-circle;
        content: "";
        position: absolute;
        background-color: $primary;
      }
      span {
        color: $white;
        z-index: 2;
      }
    }
    &--selected-first-day:not(.calendar-body__item--selected-second-day) {
      &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 50%;
        background-color: $highlight;
      }
    }
    &--selected-second-day:not(.calendar-body__item--selected-first-day) {
      &::after {
        content: "";
        position: absolute;
        right: 0;
        left: 0;
        height: 100%;
        width: 50%;
        background-color: $highlight;
      }
    }
    &--disabled {
      color: $red;
    }
    &--selected-range {
      background-color: $highlight;
      color: $primary;
    }
    &--day {
      position: relative;
      margin-bottom: 0.5 * $gap;
      max-height: 48px;
      &:hover:not(.calendar-body__item--disabled) {
        &::before {
          @include day-circle;
          content: "";
          position: absolute;
          background-color: $primary;
        }
        span {
          color: $white;
          z-index: 2;
        }
      }
    }
    &--disabled {
      cursor: not-allowed;
    }
    &--verbose-days {
      color: $gray;
      font-size: 14px;
    }
  }
}
</style>
