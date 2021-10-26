import { mount } from "@vue/test-utils";
import BaseInput from "@/components/BaseInput";

describe("Mounted input", () => {
  const wrapper = mount(BaseInput);
  test("Does input exist", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
describe("Input emit", () => {
  const wrapper = mount(BaseInput);
  test("Does input emit input event", () => {
    wrapper.find("input").setValue("test value");
    expect(wrapper.emitted().input.length).toBe(1);
    expect(wrapper.emitted().input[0]).toContain("test value");
  });
});
