<script setup>
import SvgIcon from '@/components/SvgIcon.vue'

import { RouterLink } from 'vue-router'

defineProps({
  artefactName: {
    type: String,
    required: true
  }
})
</script>

<template>
  <nav
    class="flex w-full select-none rounded-lg border border-gray-200 bg-gray-50 px-5 py-3 text-gray-700 dark:border-gray-700 dark:bg-gray-800"
    aria-label="Breadcrumb"
  >
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li aria-current="page">
        <div class="flex items-center">
          <span class="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">
            <RouterLink
              to="/data"
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              Data
            </RouterLink>
          </span>
        </div>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <SvgIcon icon="chevronRight" />
          <span class="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">
            {{ artefactName }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>
