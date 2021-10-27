<template>
  <div v-clickoutside="onOutsideClick">
    <label class="calendar-label" v-if="label">{{ label }}</label>
    <div class="wrapper" @click="isActive = true">
      <div class="wrapper__input">
        {{ checkIn ? checkIn : checkInPlaceholder }}
      </div>
      <img
        class="wrapper__img"
        src="@/assets/images/right-arrow.png"
        alt="arrow right"
      />
      <div class="wrapper__input">
        {{ checkOut ? checkOut : checkOutPlaceholder }}
      </div>
      <div class="wrapper__calendar" v-if="isActive">
        <calendar-header
          :month.sync="selectedMonth"
          :year.sync="selectedYear"
          @change="measureDaysToDisplay"
        />
        <calendar-weekdays
          :days="daysToDisplay"
          @select="onSelectDay"
          :selectedRangeDates="selectedRangeDates"
          :disabledDates="disabledDates"
          @hoverDay="setPreviewDate"
          :activeDatesFrom="activeDatesFrom"
          :activeDatesTo="activeDatesTo"
          :formatDates="formatDates"
        />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import calendarHeader from "./calendarHeader.vue";
import calendarWeekdays from "./calendarWeekdays.vue";

const weekday = require("dayjs/plugin/weekday");
const customParseFormat = require("dayjs/plugin/customParseFormat");

dayjs.extend(weekday);
dayjs.extend(customParseFormat);

export default {
  components: {
    calendarHeader,
    calendarWeekdays,
  },
  data: () => ({
    checkInPlaceholder: "Check In",
    checkOutPlaceholder: "Check Out",
    selectedMonth: dayjs().month(),
    selectedYear: dayjs().year(),
    daysToDisplay: [],
    checkIn: null,
    checkOut: null,
    previewDate: null,
    isActive: false,
  }),
  props: {
    label: {
      type: String,
      default: "",
    },
    selectedDates: {
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
  created() {
    this.measureDaysToDisplay();
    this.setSelectedDates();
  },
  methods: {
    onOutsideClick() {
      if (this.isActive) {
        this.isActive = false;
      }
    },
    setPreviewDate(item) {
      this.previewDate = item.date;
    },
    setSelectedDates() {
      if (this.selectedDates.length) {
        const sortedDates = this.sortDates(this.selectedDates);
        this.checkIn = sortedDates[0];
        this.checkOut = sortedDates[sortedDates.length - 1];
        this.handleSelectedRange();
      }
    },
    onSelectDay(item) {
      if (!this.checkIn) {
        this.checkIn = item.date;
      } else if (!this.checkOut) {
        this.checkOut = item.date;
        this.handleSelectedRange();
      } else {
        this.checkIn = item.date;
        this.checkOut = null;
      }
    },
    handleSelectedRange(firstDate = this.checkIn, secondDate = this.checkOut) {
      if (
        dayjs(firstDate, this.formatDates).isAfter(
          dayjs(secondDate, this.formatDates)
        )
      ) {
        this.checkIn = secondDate;
        this.checkOut = firstDate;
      } else {
        this.checkIn = firstDate;
        this.checkOut = secondDate;
      }
      this.$emit("selectedDates", [this.checkIn, this.checkOut]);
    },
    measureDaysToDisplay() {
      this.daysToDisplay = this.getDaysToDisplay().slice(0, 35);
    },
    getFirstDateOfSelectedMonth() {
      return dayjs()
        .date(1)
        .month(this.selectedMonth)
        .year(this.selectedYear)
        .format(this.formatDates);
    },
    getNumberOfPrevMonthDaysToDisplay() {
      const weekdayFirstDayOfSelectedMonth = dayjs(
        this.getFirstDateOfSelectedMonth(),
        this.formatDates
      ).weekday();

      return weekdayFirstDayOfSelectedMonth;
    },
    getPrevMonthDays() {
      const prevDays = [];
      const numberPrevMonthDaysToDisplay =
        this.getNumberOfPrevMonthDaysToDisplay();
      if (numberPrevMonthDaysToDisplay) {
        const numberDaysOfPrevMonth = dayjs()
          .month(this.prevMonth)
          .year(this.yearOfPrevMonth)
          .daysInMonth();
        for (
          let i = numberDaysOfPrevMonth - numberPrevMonthDaysToDisplay + 1;
          i <= numberDaysOfPrevMonth;
          i++
        ) {
          prevDays.push({
            date: dayjs()
              .date(i)
              .month(this.prevMonth)
              .year(this.yearOfPrevMonth)
              .format(this.formatDates),
            isCurrentMonth: false,
          });
        }
      }
      return prevDays;
    },
    getCurrentMonthDays() {
      const currentMonthDays = [];
      const numberOfCurrentMonthDays = dayjs()
        .month(this.selectedMonth)
        .year(this.selectedYear)
        .daysInMonth();
      for (let i = 1; i <= numberOfCurrentMonthDays; i++) {
        currentMonthDays.push({
          date: dayjs()
            .date(i)
            .month(this.selectedMonth)
            .year(this.selectedYear)
            .format(this.formatDates),
          isCurrentMonth: true,
        });
      }
      return currentMonthDays;
    },
    getNextMonthDays() {
      const nextMonthDays = [];
      // Get first 10 days of next month
      for (let i = 1; i <= 10; i++) {
        nextMonthDays.push({
          date: dayjs()
            .date(i)
            .month(this.nextMonth)
            .year(this.yearOfNextMonth)
            .format(this.formatDates),
          isCurrentMonth: false,
        });
      }
      return nextMonthDays;
    },
    getDaysToDisplay() {
      return [
        ...this.getPrevMonthDays(),
        ...this.getCurrentMonthDays(),
        ...this.getNextMonthDays(),
      ];
    },
    sortDates(datesList) {
      return datesList.sort((a, b) => {
        return dayjs(b, this.formatDates).isAfter(dayjs(a, this.formatDates))
          ? -1
          : 1;
      });
    },
  },
  directives: {
    clickoutside: {
      inserted: (el, binding, vnode) => {
        el.clickOutsideEvent = function (event) {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
        document.body.addEventListener("touchstart", el.clickOutsideEvent);
      },
      unbind: function (el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
        document.body.removeEventListener("touchstart", el.clickOutsideEvent);
      },
      stopProp(event) {
        event.stopPropagation();
      },
    },
  },
  computed: {
    selectedRangeDates() {
      const ranges = [];
      if (this.checkIn) {
        ranges.push(this.checkIn);
      }
      if (this.checkIn && !this.checkOut && this.previewDate) {
        ranges.push(this.previewDate);
      } else if (this.checkOut) {
        ranges.push(this.checkOut);
      }
      return this.sortDates(ranges);
    },
    prevMonth() {
      return this.selectedMonth === 0 ? 11 : this.selectedMonth - 1;
    },
    yearOfPrevMonth() {
      return this.selectedMonth === 0
        ? this.selectedYear - 1
        : this.selectedYear;
    },
    nextMonth() {
      return this.selectedMonth === 11 ? 0 : this.selectedMonth + 1;
    },
    yearOfNextMonth() {
      return this.selectedMonth === 11
        ? this.selectedYear + 1
        : this.selectedYear;
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-label {
  @include input-label;
}
.wrapper {
  position: relative;
  display: flex;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  border: 1px solid $gray;
  padding: 0.5 * $gap;
  border-radius: $radius;
  align-items: center;
  cursor: pointer;
  &__img {
    margin: 0 0.5 * $gap;
  }
  &__input {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  &__calendar {
    position: absolute;
    min-width: 260px;
    width: 100%;
    top: 48px;
    left: 0;
    width: 100%;
    z-index: 10;
  }
}
</style>
