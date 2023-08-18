<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
import ExportTree from "@/components/ExportTree.vue";
import { useApiStore } from "@/stores/api";
import axios from "axios";

import Treeselect from "vue3-treeselect";
import "vue3-treeselect/dist/vue3-treeselect.css";
</script>

<template>
  <div class="min-h-screen p-4 dark:bg-background-darker sm:ml-64">
    <ExportTree />
  </div>
</template>
