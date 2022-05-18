<template>
  <section
    @click="closeModal()"
    class="h-screen w-screen bg-gray-500 fixed top-0 left-0 opacity-50 z-20"
  ></section>
  <div class="absolute inset-0">
    <div class="flex h-full">
      <div
        class="m-auto bg-white p-2 rounded shadow z-30 w-full md:w-2/3 lg:w-1/3"
      >
        <div class="p-2 border divide-y divide-solid divide-black border-black">
          <h1 class="text-2xl">
            <slot name="ModalHeader">
              Modal Header
            </slot>
          </h1>

          <main class="my-2 py-3">
            <slot name="ModalBody">
              Modal Body
            </slot>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(_, { emit }) {
    function closeModal() {
      emit("closeModal");
    }
    return { closeModal };
  },
};
</script>

<style></style>
