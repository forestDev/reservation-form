<template>
  <div class="app">
    <base-form
      v-if="!showControls"
      ref="form"
      class="reservation-form"
      :price="price"
      :stars="stars"
      :currency="currency"
      :selectedDates="selectedDates"
      :disabledDates="disabledDates"
      :activeDatesFrom="activeDatesFrom"
      :activeDatesTo="activeDatesTo"
      :opinionsNumber="opinionsNumber"
      :formatDates="formatDates"
    />
    <button class="controls-bttn" @click="showControls = !showControls">
      {{ showControls ? "Hide controls" : "Show controls" }}
    </button>
    <div class="controls" v-if="showControls">
      Control props:
      <input-text v-model="currency" label="Currency" />
      <input-text v-model="formatDates" label="date format:" />
      <input-text v-model="activeDatesFrom" label="active dates from:" />
      <input-text v-model="activeDatesTo" label="active dates to:" />
      <input-text
        @clickBtn="addDisabledDateToList"
        with-bttn
        v-model="disabledDateToAdd"
        label="Add disabled date:"
      />
      <div>
        Disabled dates <br />
        (Remove disabled date by click):
        <span
          v-for="(item, idx) in disabledDates"
          :key="idx"
          @click="deleteDisabledDateFormList(item)"
          ><br />{{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import BaseForm from "@/components/BaseForm";
import InputText from "@/components/controls/InputText";
export default {
  name: "App",
  components: {
    BaseForm,
    InputText,
  },
  data: () => ({
    isVisible: true,
    formatDates: "DD.MM.YYYY",
    stars: 4.5,
    price: 298,
    currency: "zł",
    selectedDates: [],
    activeDatesFrom: undefined,
    opinionsNumber: 298,
    activeDatesTo: undefined,
    disabledDates: [],

    disabledDateToAdd: "",
    showControls: false,
  }),
  methods: {
    deleteDisabledDateFormList(item) {
      const idxItem = this.disabledDates.indexOf((date) => date === item);
      this.disabledDates.splice(idxItem, 1);
    },
    addDisabledDateToList() {
      this.disabledDates.push(this.disabledDateToAdd);
      this.disabledDateToAdd = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.reservation-form {
  max-width: 480px;
  margin-top: 2 * $gap;
  margin-left: auto;
  margin-right: auto;
}
.controls {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid $gray;
  padding: 0.25 * $gap;
  div {
    margin-bottom: 0.5 * $gap;
    margin-top: 0.5 * $gap;
  }
}
.app {
  height: 100vh;
}
.controls-bttn {
  position: fixed;
  top: 10px;
  left: 10px;
}
</style>
