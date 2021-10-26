<template>
  <form class="form">
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
    <calendar :selectedDates="selectedDates" :disabledDates="disabledDates" />
    <base-button class="form__bttn" @click="submit"> Rezerwuj </base-button>
  </form>
</template>

<script>
import Calendar from "@/components/calendar/index";
import BaseButton from "@/components/BaseButton";

const MAX_STARS = 5;

export default {
  components: {
    Calendar,
    BaseButton,
  },
  data: () => ({}),
  props: {
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
    submit() {
      console.log("todo");
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin-top: 2 * $gap;
  margin-left: auto;
  margin-right: auto;
  max-width: 720px;
  border: 1px solid $gray;
  border-radius: $radius;
  padding: $gap;
  &__line {
    @include horizontal-line;
    margin: 0.5 * $gap 0;
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
}
</style>
