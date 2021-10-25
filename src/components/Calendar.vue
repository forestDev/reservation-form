<template>
  <div>
    <pre>
          {{ now }}
      </pre
    >
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
        <div class="calendar-header">
          <img
            class="calendar-header__arrow calendar-header__arrow--left"
            src="@/assets/images/arrow-small-right.png"
            alt="arrow right"
          />
          <div>{{ calendarHeader }}</div>
          <img
            class="calendar-header__arrow"
            src="@/assets/images/arrow-small-right.png"
            alt="arrow right"
          />
        </div>
        <div class="calendar-body">
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  data: () => ({
    checkIn: "Check In",
    checkOut: "Check Out",
    calendarHeader: "March 2017",
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
}
</style>
