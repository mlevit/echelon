<script setup>
defineProps({
  buttonText: {
    type: String,
    required: true,
  },
  iconNameLeft: {
    type: String,
    default: null,
  },
  iconNameRight: {
    type: String,
    default: null,
  },
})
</script>

<script>
import { CalendarIcon } from '@heroicons/vue/24/outline'

export default {
  components: {
    CalendarIcon,
  },
}
</script>

<template>
  <button
    type="button"
    class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
  >
    <component :is="iconNameLeft" v-if="iconNameLeft" class="mr-2 h-5 w-5" />
    {{ buttonText }}
    <component :is="iconNameRight" v-if="iconNameRight" class="ml-2 h-5 w-5" />
  </button>
</template>
