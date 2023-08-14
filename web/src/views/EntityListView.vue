<script setup>
import EntityListTable from "@/components/EntityListTable.vue";

import { useTitle } from "@vueuse/core";

useTitle("Entities | Echelon");
</script>

<template>
  <div class="min-h-screen px-4 py-6 dark:bg-background-darker sm:ml-64">
    <div class="mb-4 flex h-fit items-center justify-center rounded">
      <EntityListTable />
    </div>
  </div>
</template>
