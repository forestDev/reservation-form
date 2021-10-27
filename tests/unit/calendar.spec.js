import { mount } from "@vue/test-utils";
import Calendar from "@/components/calendar/index.vue";

describe("Mounted calendar", () => {
  const wrapper = mount(Calendar);
  test("Does a wrapper exist", () => {
    expect(wrapper.exists()).toBe(true);
  });
  test("Does calendar is open after click", async () => {
    await wrapper.find(".wrapper").trigger("click");
    expect(wrapper.find(".wrapper__calendar").exists()).toBe(true);
  });
  test("Does CheckIn/CheckOut is set after click in dates", async () => {
    await wrapper.find(".wrapper").trigger("click");
    const someDay1 = wrapper.findAll(".calendar-body__item--day").at(0);
    const someDay2 = wrapper.findAll(".calendar-body__item--day").at(10);
    await someDay1.trigger("click");
    await someDay2.trigger("click");
    expect(wrapper.vm.checkIn.length).not.toBeNull();
    expect(wrapper.vm.checkOut.length).not.toBeNull();
  });
});

describe("CheckIn/CheckOut values with format dates and 2 selected dates", () => {
  const wrapper = mount(Calendar, {
    propsData: {
      formatDates: "DD.MM.YYYY",
      selectedDates: ["01.12.2021", "05.12.2021"],
    },
  });
  test("Does CheckIn is equal with first selected date", () => {
    expect(wrapper.vm.checkIn).toBe("01.12.2021");
  });
  test("Does CheckOut is equal with second selected date", () => {
    expect(wrapper.vm.checkOut).toBe("05.12.2021");
  });
});

describe("CheckIn/Checkout values with format dates and more than 2 selected dates(not sorted)", () => {
  const wrapper = mount(Calendar, {
    propsData: {
      formatDates: "YYYY.MM.DD",
      selectedDates: ["2021.12.05", "2021.12.06", "2021.12.07", "2021.12.04"],
    },
  });
  test("Does CheckIn is the earliest date from selectedDates", () => {
    expect(wrapper.vm.checkIn).toBe("2021.12.04");
  });
  test("Does CheckOut is the latest date from selectedDates", () => {
    expect(wrapper.vm.checkOut).toBe("2021.12.07");
  });
});

describe("Disabled dates are not selectable", () => {
  const wrapper = mount(Calendar, {
    propsData: {
      formatDates: "DD.MM.YYYY",
      activeDatesFrom: "01.01.2021",
      activeDatesTo: "01.01.2021",
    },
  });
  test("Does checkIn/checkOut is null after selected disabled dates", async () => {
    await wrapper.find(".wrapper").trigger("click");
    const someDay1 = wrapper.findAll(".calendar-body__item--day").at(0);
    const someDay2 = wrapper.findAll(".calendar-body__item--day").at(10);
    await someDay1.trigger("click");
    await someDay2.trigger("click");
    expect(wrapper.vm.checkIn).toBeNull();
    expect(wrapper.vm.checkOut).toBeNull();
  });
});

describe("Set checkIn and previewDate variable without checkOut", () => {
  const wrapper = mount(Calendar);
  test("Does selected dates range is set after set checkIn and second preview date", () => {
    wrapper.setData({
      checkIn: "01.01.2021",
      previewDate: "01.03.2021",
    });
    expect(wrapper.vm.checkIn).toBe("01.01.2021");
    expect(wrapper.vm.previewDate).toBe("01.03.2021");
    expect(wrapper.vm.selectedRangeDates.length).toBe(2);
    expect(wrapper.vm.selectedRangeDates.at(0)).toBe("01.01.2021");
    expect(wrapper.vm.selectedRangeDates.at(1)).toBe("01.03.2021");
  });
});
describe("Set checkIn and previewDate and checkOut variable", () => {
  const wrapper = mount(Calendar);
  test("Does selected dates range includes checkIn and checkOut variables", () => {
    wrapper.setData({
      checkIn: "01.01.2021",
      checkOut: "01.02.2021",
      previewDate: "01.03.2021",
    });
    expect(wrapper.vm.checkIn).toBe("01.01.2021");
    expect(wrapper.vm.previewDate).toBe("01.03.2021");
    expect(wrapper.vm.checkOut).toBe("01.02.2021");
    expect(wrapper.vm.selectedRangeDates.length).toBe(2);
    expect(wrapper.vm.selectedRangeDates.at(0)).toBe("01.01.2021");
    expect(wrapper.vm.selectedRangeDates.at(1)).toBe("01.02.2021");
  });
});
