import { mount } from "@vue/test-utils";
import ReusableModal from "@/components/ReusableModal.vue";

describe("ReusableModal.vue", () => {
  it("Renders modal header defualt slot values of the modal mounted", () => {
    const header = "Modal Header";

    const wrapper = mount(ReusableModal);
    expect(wrapper.text()).toMatch(header);
  });
  it("Renders modal body defualt slot values of the modal mounted", () => {
    const body = "Modal Body";

    const wrapper = mount(ReusableModal, {});
    expect(wrapper.text()).toMatch(body);
  });
});
