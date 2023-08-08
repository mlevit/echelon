<script setup>
defineProps({
  status: {
    type: String,
    required: true
  }
})
</script>

<template>
  <span
    v-if="status === 'completed'"
    class="ml-2 mr-2 rounded bg-green-100 px-2 py-2 text-2xl font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
    >Completed</span
  >
  <span
    v-if="status === 'running'"
    class="ml-2 mr-2 rounded bg-yellow-100 px-2 py-2 text-2xl font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    >Running</span
  >
  <span
    v-if="status === 'failed'"
    class="ml-2 mr-2 rounded bg-red-100 px-2 py-2 text-2xl font-medium text-red-800 dark:bg-red-900 dark:text-red-300"
    >Failed</span
  >
</template>
