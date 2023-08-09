<script setup>
import JobListTable from "@/components/JobListTable.vue";

import { useTitle } from "@vueuse/core";

useTitle("Jobs | Echelon");
</script>

<template>
  <div class="min-h-screen px-4 py-6 dark:bg-background-darker sm:ml-64">
    <div class="mb-4 flex h-fit items-center justify-center rounded">
      <JobListTable />
    </div>
  </div>
</template>
