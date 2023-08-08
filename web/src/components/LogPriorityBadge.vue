<script setup>
defineProps({
  priority: {
    type: String,
    required: true
  }
})
</script>

<script>
export default {
  data() {
    return {
      colorMap: {
        DEBUG: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        INFO: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        WARN: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        ERROR: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        FATAL: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      }
    }
  }
}
</script>

<template>
  <span class="rounded px-2 py-2 text-xs" :class="colorMap[priority]">{{ priority }}</span>
</template>
