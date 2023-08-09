<script setup>
defineProps({
  status: {
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
        completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        running: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      }
    }
  }
}
</script>

<template>
  <span class="rounded px-2 py-2 capitalize" :class="colorMap[status]">{{ status }}</span>
</template>
