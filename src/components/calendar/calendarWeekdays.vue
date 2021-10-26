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
        :class="getDayClasses(item)"
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
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

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
    activeDatesFrom: {
      type: String,
      default: "",
    },
    activeDatesTo: {
      type: String,
      default: "",
    },
    formatDates: {
      type: String,
      default: "YYYY.MM.DD",
    },
  },
  data: () => ({
    verboseDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  }),
  methods: {
    parseDate(date) {
      return dayjs(date, this.formatDates);
    },
    isDisabled(date) {
      return (
        this.disabledDates.includes(date) ||
        this.isEarlierThanActiveDatesFrom(date) ||
        this.isLaterThanActiveDatesTo(date)
      );
    },
    isEarlierThanActiveDatesFrom(date) {
      if (this.activeDatesFrom) {
        return this.parseDate(date).isBefore(
          this.parseDate(this.activeDatesFrom)
        );
      }
      return false;
    },
    isLaterThanActiveDatesTo(date) {
      if (this.activeDatesTo) {
        return this.parseDate(date).isAfter(this.parseDate(this.activeDatesTo));
      }
      return false;
    },
    isFirstSelectedDate(date) {
      return this.parseDate(this.selectedRangeDates[0]).isSame(
        this.parseDate(date)
      );
    },
    isSecondSelectedDate(date) {
      return this.parseDate(this.selectedRangeDates[1]).isSame(
        this.parseDate(date)
      );
    },
    isBetweenSelectedDates(date) {
      return this.parseDate(date).isBetween(
        this.parseDate(this.selectedRangeDates[0]),
        this.parseDate(this.selectedRangeDates[1])
      );
    },
    onSelect(item) {
      if (!this.isDisabled(item.date) && !this.isDisabledDateInRangeDates) {
        this.$emit("select", item);
      }
    },
    onHover(item) {
      if (!this.isDisabled(item.date)) {
        this.$emit("hoverDay", item);
      }
    },
    asDay(date) {
      return this.parseDate(date).get("date");
    },
    isToday(date) {
      return this.parseDate(date).isSame(dayjs());
    },
    getDayClasses(item) {
      return {
        "calendar-body__item--gray": !item.isCurrentMonth,
        "calendar-body__item--current-day": this.isToday(item.date),
        "calendar-body__item--selected-first-day": this.isFirstSelectedDate(
          item.date
        ),
        "calendar-body__item--selected-second-day": this.isSecondSelectedDate(
          item.date
        ),
        "calendar-body__item--selected-range": this.isBetweenSelectedDates(
          item.date
        ),
        "calendar-body__item--disabled": this.isDisabled(item.date),
      };
    },
  },
  computed: {
    isDisabledDateInRangeDates() {
      return this.disabledDates.some((date) => {
        return this.isBetweenSelectedDates(date);
      });
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
      color: $red !important;
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
    &--selected-first-day:not(.calendar-body__item--selected-second-day):not(.calendar-body__item--disabled) {
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
    &--selected-second-day:not(.calendar-body__item--selected-first-day):not(.calendar-body__item--disabled) {
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
      opacity: 0.5;
    }
    &--selected-range:not(.calendar-body__item--disabled) {
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
