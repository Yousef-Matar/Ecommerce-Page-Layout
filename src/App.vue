<template>
  <HomeLayout></HomeLayout>
</template>

<script>
import HomeLayout from "@/pages/HomeLayout.vue";

export default {
  name: "App",
  components: {
    HomeLayout,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
