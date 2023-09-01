<script>
defineProps({
  buttonText: {
    type: String,
    required: true,
  },
  iconLeftName: {
    type: String,
  },
  iconRightName: {
    type: String,
  },
})
</script>

<script>
import { CalendarIcon } from "@heroicons/vue/24/outline"

export default {
  components: {
    CalendarIcon,
  },
}
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    <component :is="iconLeftName" v-if="iconLeftName" class="mr-2 h-5 w-5" />
    {{ buttonText }}
    <component :is="iconRightName" v-if="iconLeftName" class="ml-2 h-5 w-5" />
  </button>
</template>
