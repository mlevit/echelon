<script setup>
import SvgIcon from '@/components/SvgIcon.vue'

defineProps({
  value: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div v-if="value">
    <SvgIcon icon="tick" color="green" />
  </div>
  <div v-else>
    <SvgIcon icon="cross" color="red" />
  </div>
</template>
