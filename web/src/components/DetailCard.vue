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
    class="flex h-full w-full flex-col items-center rounded-lg border border-border-lighter bg-background-lightest p-4 shadow dark:border-border-darker dark:bg-background-darker sm:p-8"
  >
    <p
      class="text-center font-normal text-textSecondary dark:text-textSecondary-dark"
    >
      {{ title }}
    </p>
    <h5
      class="mb-2 text-center text-2xl font-bold capitalize tracking-tight text-textPrimary dark:text-textPrimary-dark"
    >
      {{ cleanValue }}
    </h5>
  </div>
</template>
