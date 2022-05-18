<template>
  <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
    <div
      v-for="(product, index) in state.products"
      :key="index"
      class="text-left"
    >
      <img
        :src="product.image"
        :alt="product.id"
        class="rounded-3xl w-40 h-auto cursor-pointer"
        @click="openModal(index)"
      />
      <span class="text-black">Price: {{ product.Price }} SAR</span>
    </div>
  </div>
  <teleport to="body">
    <ReusableModal
      v-if="isProductModalOpen"
      @closeModal="isProductModalOpen = false"
    >
      <template #ModalHeader>
        <div class="flex justify-between">
          <h1>
            {{ targetProduct.name }}
          </h1>
          <img
            :src="targetProduct.image"
            :alt="targetProduct.id"
            class="rounded-full w-14 h-auto"
          />
        </div>
      </template>
      <template #ModalBody>
        <ul>
          <li>
            <span class="underline"> Price</span>: {{ targetProduct.Price }} SAR
          </li>
          <li>
            <span class="underline"> Description</span>:
            {{ targetProduct.description }}
          </li>
        </ul>
        <div class="flex justify-between">
          <div class="border border-silver rounded bg-white p-1 max-w-fit">
            <span class="underline inline-block"> Quantity</span>:
            <div
              class="inline-block py-1 px-3 cursor-pointer rounded hover:bg-zinc-300"
              v-on:click="removeQuantity()"
            >
              -
            </div>
            <div class="inline-block">
              <input
                class="text-center w-10 p-1 border-none text-base"
                type="number"
                v-model="selectedQuantity"
                disabled
              />
            </div>
            <div
              class="inline-block py-1 px-3 cursor-pointer rounded hover:bg-zinc-300"
              v-on:click="addQuantity()"
            >
              +
            </div>
          </div>

          <button
            class="p-2 rounded-full border text-white bg-black hover:scale-105 disabled:bg-gray-600 disabled:hover:scale-100"
            @click="addToCart()"
            :disabled="selectedQuantity <= 0"
          >
            Add to cart
          </button>
        </div>
      </template>
    </ReusableModal>
  </teleport>
</template>

<script>
import { onMounted, ref, reactive } from "@vue/runtime-core";
import ReusableModal from "./ReusableModal.vue";
import axios from "../plugins/axios";
export default {
  components: { ReusableModal },
  setup(_, { emit }) {
    const isProductModalOpen = ref(false);
    const targetProduct = ref({});
    const selectedQuantity = ref(0);
    const state = reactive({
      products: [],
    });
    onMounted(async () => {
      try {
        const { data } = await axios.get(`/products`);
        state.products = data;
      } catch (error) {
        console.log(error);
      }
    });
    function openModal(itemIndex) {
      isProductModalOpen.value = true;
      targetProduct.value = state.products[itemIndex];
    }
    function addQuantity() {
      selectedQuantity.value = selectedQuantity.value + 1;
    }
    function removeQuantity() {
      if (selectedQuantity.value > 0) {
        selectedQuantity.value = selectedQuantity.value - 1;
      }
    }
    async function addToCart() {
      const quantity = selectedQuantity.value;
      const product = targetProduct.value;
      await emit("AddItemToCart", product, quantity);
      isProductModalOpen.value = false;
      selectedQuantity.value = 0;
      targetProduct.value = {};
    }
    return {
      isProductModalOpen,
      targetProduct,
      state,
      selectedQuantity,
      openModal,
      removeQuantity,
      addQuantity,
      addToCart,
    };
  },
};
</script>

<style></style>
