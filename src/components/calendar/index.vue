<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <div class="wrapper">
      <div class="wrapper__input">{{ checkIn }}</div>
      <img
        class="wrapper__img"
        src="@/assets/images/right-arrow.png"
        alt="arrow right"
      />
      <div class="wrapper__input">{{ checkOut }}</div>
      <div class="calendar">
        <calendar-header
          :month.sync="selectedMonth"
          :year.sync="selectedYear"
          @change="measureDaysToDisplay"
        />
        <calendar-weekdays :days="daysToDisplay" />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import calendarHeader from "./calendarHeader.vue";
import calendarWeekdays from "./calendarWeekdays.vue";

var weekday = require("dayjs/plugin/weekday");
dayjs.extend(weekday);

export default {
  components: {
    calendarHeader,
    calendarWeekdays,
  },
  data: () => ({
    checkIn: "Check In",
    checkOut: "Check Out",
    selectedMonth: dayjs().month(),
    selectedYear: dayjs().year(),
    daysToDisplay: [],
    now: null,
  }),
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  created() {
    this.now = dayjs();
    this.measureDaysToDisplay();
  },
  methods: {
    measureDaysToDisplay() {
      this.daysToDisplay = this.getDaysToDisplay().slice(0, 35);
    },
    getFirstDateOfSelectedMonth() {
      return dayjs(`01.${this.selectedMonth + 1}.${this.selectedYear}`).format(
        "DD.MM.YYYY"
      );
    },
    getNumberOfPrevMonthDaysToDisplay() {
      return dayjs(this.getFirstDateOfSelectedMonth()).weekday();
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
          let i = numberDaysOfPrevMonth;
          i > numberDaysOfPrevMonth - numberPrevMonthDaysToDisplay;
          i--
        ) {
          prevDays.push({
            date: dayjs()
              .date(i)
              .month(this.prevMonth)
              .year(this.yearOfPrevMonth)
              .format("YYYY.MM.DD"),
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
            .format("YYYY.MM.DD"),
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
            .format("YYYY.MM.DD"),
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
  },
  computed: {
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
  .calendar {
    position: absolute;
    top: 48px;
    left: 0;
    width: 100%;
  }
}
</style>
