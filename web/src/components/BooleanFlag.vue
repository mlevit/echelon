<script setup>
defineProps({
  value: {
    type: Boolean,
    required: true,
  },
})
</script>


<script>
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'

export default {
  components: {
    CheckIcon,
    XMarkIcon,
  },
}
</script>

<template>
  <div v-if="value">
    <CheckIcon class="text-green-500 h-5 w-5" />
  </div>
  <div v-else>
    <XMarkIcon class="text-red-500 h-5 w-5" />
  </div>
</template>
