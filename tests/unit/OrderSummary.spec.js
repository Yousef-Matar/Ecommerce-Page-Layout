import { mount } from "@vue/test-utils";
import OrderSummary from "@/components/OrderSummary.vue";

describe("Order Summary Component Tests", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(OrderSummary);
  });
  it("Renders order summary header", () => {
    const header = "Order Summary";

    const headerElement = wrapper.get('[data-test="OrderSummaryHeader"]');
    expect(headerElement.text()).toBe(header);
  });
  it("Does not render the order breakdown if cart is empty", () => {
    const orderSummary = wrapper.find('[data-test="OrderBreakdown"]');
    expect(orderSummary.exists()).toBe(false);
  });
});
