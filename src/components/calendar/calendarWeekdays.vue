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
  },
  data: () => ({
    verboseDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  }),
  methods: {
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
      this.$emit("select", item);
    },
    onHover(item) {
      this.$emit("hoverDay", item);
    },
    asDay(date) {
      return dayjs(date).get("date");
    },
    isToday(date) {
      return dayjs(date).isSame(dayjs().format("YYYY-MM-DD", "day"));
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
  margin: 0;
  box-shadow: 0px 0 12px lighten($black, 80%);

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2vw;
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
    &--selected-range {
      background-color: $highlight;
      color: $primary;
    }
    &--day {
      position: relative;
      &:hover {
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
    &--verbose-days {
      color: $gray;
      font-size: 14px;
    }
  }
}
</style>
