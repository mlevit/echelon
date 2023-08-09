<script setup>
defineProps({
  title: {
    required: true,
  },
  value: {
    required: true,
  },
});
</script>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    cleanValue() {
      if (typeof this.value === "string" || this.value instanceof String) {
        return this.value.split("_").join(" ");
      } else {
        return this.value;
      }
    },
  },
};
</script>

<template>
  <div
    class="flex h-full w-full flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8"
  >
    <p class="text-center font-normal text-textSecondary dark:text-gray-400">
      {{ title }}
    </p>
    <h5
      class="mb-2 text-center text-2xl font-bold capitalize tracking-tight text-textPrimary dark:text-white"
    >
      {{ cleanValue }}
    </h5>
  </div>
</template>
