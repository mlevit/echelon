<script setup>
import EntityListTable from "@/components/EntityListTable.vue";

import { useTitle } from "@vueuse/core";

useTitle("Entity | Echelon");
</script>

<template>
  <div class="min-h-screen px-4 py-6 dark:bg-gray-900 sm:ml-64">
    <div class="mb-4 flex h-fit items-center justify-center rounded">
      <EntityListTable />
    </div>
  </div>
</template>
