<script setup>
import ArtefactListTable from "@/components/ArtefactListTable.vue";

import { useTitle } from "@vueuse/core";

useTitle("Data | Echelon");
</script>

<template>
  <div class="min-h-screen px-4 py-6 dark:bg-gray-900 sm:ml-64">
    <div class="mb-4 flex h-fit items-center justify-center rounded">
      <ArtefactListTable />
    </div>
  </div>
</template>
