<script setup>
defineProps({
  value: {
    type: String,
    required: true
  }
})
</script>

<template>
  <code
    class="rounded bg-gray-100 px-2 py-2 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-300"
  >
    {{ value }}
  </code>
</template>
