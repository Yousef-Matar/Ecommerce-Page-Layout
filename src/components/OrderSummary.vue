<template>
  <div class="flex justify-evenly flex-wrap">
    <div
      class="flex-initial w-10/12 bg-slate-300 rounded-3xl h-fit m-4 order-last md:w-3/12 md:m-0 md:order-first"
    >
      <div class="text-black divide-y divide-solid divide-black border-black">
        <h1 class="text-3xl p-2 mt-5" data-test="OrderSummaryHeader">
          Order Summary
        </h1>
        <div v-if="cartItems.length > 0" data-test="OrderBreakdown">
          <ul>
            <li
              class="flex justify-between p-4 px-7 mt-5"
              v-for="product in cartItems"
              :key="product.Product.name"
            >
              <span>
                {{ product.ProductQuantity }}X {{ product.Product.name }}
              </span>
              <span
                >{{ product.Product.Price * product.ProductQuantity }} SAR</span
              >
            </li>
          </ul>
        </div>
        <div class="text-xl p-4 px-7 mt-5 font-semibold flex justify-between">
          <h2>Total</h2>
          <h2>{{ total }} SAR</h2>
        </div>
      </div>
      <button
        class="flex-end text-white bg-green-500 rounded-3xl w-full py-5 hover:scale-105 disabled:bg-gray-600 disabled:hover:scale-100"
        :disabled="cartItems.length === 0"
        @click="PlaceOrder"
      >
        Place Order
      </button>
    </div>
    <div
      class="flex-initial w-10/12 bg-slate-300 rounded-3xl p-6 m-4 md:w-6/12 md:m-0"
    >
      <Products @AddItemToCart="AddToCart"></Products>
    </div>
  </div>
  <teleport to="body">
    <ReusableModal v-if="orderPlaced" @closeModal="orderPlaced = false">
      <template #ModalHeader>
        <h1>Your Order Has Been Placed</h1>
      </template>
      <template #ModalBody>
        <p>Your order should be delivered to your door within 2 minutes.</p>
      </template>
    </ReusableModal>
  </teleport>
</template>

<script>
import Products from "@/components/ProductsLayout.vue";
import ReusableModal from "@/components/ReusableModal.vue";
import axios from "../plugins/axios";
export default {
  components: { Products, ReusableModal },
  data() {
    return {
      cartItems: [],
      orderPlaced: false,
      postData: {
        payload: {
          products: [],
        },
      },
    };
  },
  methods: {
    AddToCart(item, quantity) {
      var found = false;
      var foundIndex = 0;
      for (var index = 0; index < this.cartItems.length; index++) {
        if (this.cartItems[index].Product.name === item.name) {
          found = true;
          foundIndex = index;
          break;
        }
      }
      if (!found) {
        this.cartItems.push({ Product: item, ProductQuantity: quantity });
        this.postData.payload.products.push({
          id: item.id,
          quantity: quantity,
        });
      } else {
        this.cartItems[foundIndex] = {
          Product: item,
          ProductQuantity: quantity,
        };
        this.postData.payload.products[foundIndex] = {
          id: item.id,
          quantity: quantity,
        };
      }
    },
    PlaceOrder() {
      axios
        .post(`/orders`, this.postData)
        .then(() => {
          this.orderPlaced = true;
          this.cartItems = [];
          this.postData = {
            payload: {
              products: [],
            },
          };
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  computed: {
    total() {
      var subtotal = 0.0;
      for (var index = 0; index < this.cartItems.length; index++) {
        subtotal =
          subtotal +
          this.cartItems[index].Product.Price *
            this.cartItems[index].ProductQuantity;
      }
      return subtotal;
    },
  },
};
</script>

<style></style>
