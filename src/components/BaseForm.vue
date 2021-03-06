<template>
  <form class="form" @submit.prevent>
    <p class="form__price">{{ price }} {{ currency }}</p>
    <div class="form__opinions">
      <img
        src="@/assets/svg/star-full.svg?data"
        v-for="(_, idx) in fullStars"
        :key="`${idx}-full`"
      />
      <img
        src="@/assets/svg/star-half.svg?data"
        v-for="(_, idx) in halfStars"
        :key="`${idx}-half`"
      />
      <img
        src="@/assets/svg/star-empty.svg?data"
        v-for="(_, idx) in emptyStars"
        :key="`${idx}-empty`"
      />
      <span class="form__opinions-number">
        {{ opinionsNumber }}
      </span>
    </div>
    <div class="form__line"></div>
    <calendar
      class="form__calendar"
      :label="calendarLabel"
      :selectedDates="selectedDates"
      :disabledDates="disabledDates"
      :activeDatesFrom="activeDatesFrom"
      :activeDatesTo="activeDatesTo"
      :formatDates="formatDates"
      @selectedDates="$emit('selectedDates', $event)"
    />
    <base-input
      class="form__name"
      :value="userName"
      :label="userNameLabel"
      placeholder="Type name"
      @input="$emit('inputName', $event)"
    />
    <base-button
      class="form__bttn"
      @click="onSubmit"
      :is-loading="isLoading"
      :isDisabled="!selectedDates.length || !userName"
    >
      Send
    </base-button>
  </form>
</template>

<script>
import Calendar from "@/components/calendar/index";
import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";
import dayjs from "dayjs";

const MAX_STARS = 5;

export default {
  components: {
    Calendar,
    BaseButton,
    BaseInput,
  },
  props: {
    userNameLabel: {
      type: String,
      default: "",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
      default: "",
    },
    calendarLabel: {
      type: String,
      default: "",
    },
    formatDates: {
      type: String,
      default: "YYYY.MM.DD",
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "zł",
    },
    opinionsNumber: {
      type: Number,
      default: 0,
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
      default: function () {
        return dayjs().format(this.formatDates);
      },
    },
    activeDatesTo: {
      type: String,
      default: function () {
        return dayjs().add(1, "year").format(this.formatDates);
      },
    },
    stars: {
      type: Number,
      default: 0,
      validator: (value) => {
        const availableStars = [];
        for (let i = 0; i <= MAX_STARS; i += 0.5) {
          availableStars.push(i);
        }
        return availableStars.includes(value);
      },
    },
  },
  computed: {
    fullStars() {
      return Math.floor(this.stars);
    },
    halfStars() {
      return Math.round(this.stars - this.fullStars);
    },
    emptyStars() {
      return MAX_STARS - (this.fullStars + this.halfStars);
    },
  },
  methods: {
    onSubmit() {
      this.$emit("submit");
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  border: 1px solid $gray;
  border-radius: $radius;
  padding: $gap;
  &__line {
    @include horizontal-line;
    margin: $gap 0;
  }
  &__price {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
  }
  &__star {
    fill: $dark-green;
    height: 20px;
  }
  &__opinions {
    display: flex;
    align-items: center;
    height: 12px;
    margin-top: 0.25 * $gap;
  }
  &__opinions-number {
    margin-left: 0.25 * $gap;
    font-size: 12px;
  }
  &__bttn {
    margin-top: $gap;
  }
  &__calendar {
    margin-top: $gap;
  }
  &__name {
    margin-top: $gap;
  }
}
</style>
