<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    required: true,
  },
  unit: {
    type: String,
    required: false,
  },
  textColor: {
    type: String,
    default: "text-textPrimary dark:text-textPrimary-dark",
    required: false,
  },
  bgColor: {
    type: String,
    default: "bg-background-lightest dark:bg-background-darker",
    required: false,
  },
});
</script>

<template>
  <div
    class="flex w-full select-none flex-col items-center rounded-lg border border-border-lighter p-4 shadow dark:border-border-darker sm:p-8"
    :class="bgColor"
  >
    <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
      {{ title }}
    </h5>
    <div class="flex items-baseline" :class="textColor">
      <span class="text-7xl font-extrabold capitalize tracking-tight">
        {{ value || 0 }}
      </span>
      <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">{{
        unit
      }}</span>
    </div>
  </div>
</template>
