<script setup>
import SvgIcon from "@/components/SvgIcon.vue";

import { RouterLink } from "vue-router";

defineProps({
  jobName: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <nav
    class="flex w-full select-none rounded-lg border border-border-lighter bg-background px-5 py-3 text-textSecondary dark:border-border-darker dark:bg-background-darker"
    aria-label="Breadcrumb"
  >
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li aria-current="page">
        <div class="flex items-center">
          <span
            class="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2"
          >
            <RouterLink
              to="/job"
              class="inline-flex items-center text-sm font-medium text-textSecondary hover:text-blue-600 dark:text-gray-400 dark:hover:text-textPrimary-dark"
            >
              Job
            </RouterLink>
          </span>
        </div>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <SvgIcon icon="chevronRight" />
          <span
            class="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2"
          >
            {{ jobName }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>
