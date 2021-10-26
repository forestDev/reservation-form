import { mount } from "@vue/test-utils";
import BaseButton from "@/components/BaseButton";

describe("Mounted button", () => {
  const wrapper = mount(BaseButton);
  test("Does button exist", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
describe("Button emit", () => {
  const wrapper = mount(BaseButton);
  test("Does button emit click event", () => {
    wrapper.trigger("click");
    expect(wrapper.emitted().click.length).toBe(1);
  });
});
