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
      :calendarLabel="calendarLabel"
      @selectedDates="onSelectDates"
    />
    <button class="controls-bttn" @click="showControls = !showControls">
      {{ showControls ? "Hide controls" : "Show controls" }}
    </button>
    <div class="controls" v-if="showControls">
      Control props:
      <input-text v-model="currency" label="Currency" />
      <input-text v-model="formatDates" label="Date format:" />
      <input-text v-model="activeDatesFrom" label="Active dates from:" />
      <input-text v-model="activeDatesTo" label="Active dates to:" />
      <input-text v-model="calendarLabel" label="Calendar label" />
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
      <p>Selected dates:</p>
      <pre>{{ selectedDates }} </pre>
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
    calendarLabel: "Dates",

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
    onSelectDates(dates) {
      this.selectedDates = dates;
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
