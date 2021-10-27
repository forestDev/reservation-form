<template>
  <div class="app">
    <base-form
      v-if="!showControls"
      class="reservation-form"
      :userName="userName"
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
      :userNameLabel="userNameLabel"
      @selectedDates="onSelectDates"
      @submit="handleReservation"
      @inputName="handleInputName"
      :isLoading="isSending"
    />
    <button class="controls-bttn" @click="showControls = !showControls">
      {{ showControls ? "Hide controls" : "Show controls" }}
    </button>
    <div class="controls" v-if="showControls">
      Control props:
      <input-text v-model="currency" label="Currency" />
      <input-text v-model="formatDates" label="Date format:" />
      <input-text
        :placeholder="formatDates"
        v-model="activeDatesFrom"
        label="Active dates from:"
      />
      <input-text
        :placeholder="formatDates"
        v-model="activeDatesTo"
        label="Active dates to:"
      />
      <input-text v-model="calendarLabel" label="Calendar label" />
      <input-text v-model="userNameLabel" label="User name label" />
      <input-text
        :placeholder="formatDates"
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
      <p>User name:</p>
      <pre> {{ userName }}</pre>
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
    userName: "",
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
    userNameLabel: "Name",
    isSending: false,
    disabledDateToAdd: "",
    showControls: false,
  }),
  methods: {
    handleInputName(name) {
      this.userName = name;
    },
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
    async handleReservation() {
      console.log("username", this.userName);
      console.log("selectedDates", this.selectedDates);
      this.isSending = true;
      const response = await this.mockApiCall();
      console.log(response);
      this.isSending = false;
    },
    mockApiCall() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Done");
        }, 2000);
      });
    },
  },
  watch: {
    activeDatesFrom() {
      this.selectedDates = [];
    },
    activeDatesTo() {
      this.selectedDates = [];
    },
    disabledDates: {
      deep: true,
      handler() {
        this.selectedDates = [];
      },
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
  @media (max-width: 768px) {
    display: none;
  }
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
  @media (max-width: 768px) {
    display: none;
  }
  position: fixed;
  top: 10px;
  left: 10px;
}
</style>
