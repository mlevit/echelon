<script setup>
import RunListTable from "@/components/RunListTable.vue";

import { useTitle } from "@vueuse/core";

useTitle("Runs | Echelon");
</script>

<template>
  <div
    class="min-h-[calc(100vh-56px)] px-4 py-6 dark:bg-background-darker sm:ml-64"
  >
    <div class="mb-4 flex h-fit items-center justify-center rounded">
      <RunListTable />
    </div>
  </div>
</template>
