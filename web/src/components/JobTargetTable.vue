<script setup>
import CodeBadge from "@/components/CodeBadge.vue";
import { useApiStore } from "@/stores/api";

import axios from "axios";
import moment from "moment";
import { RouterLink } from "vue-router";

defineProps({
  jobName: {
    type: String,
    required: true,
  },
});
</script>

<script>
export default {
  data() {
    return { apiStore: useApiStore(), rawJobTargetData: null };
  },
  created() {
    this.getJobTargetData();
  },
  computed: {},
  methods: {
    getJobTargetData() {
      const url = new URL(this.apiStore.jobTarget);
      url.searchParams.append("name", this.jobName);
      axios
        .get(url.href)
        .then((response) => (this.rawJobTargetData = response.data));
    },
    formatDate(date) {
      if (date) {
        return moment(date).format("MMMM Do YYYY, h:mm:ss a");
      }
    },
  },
};
</script>

<template>
  <div class="w-full">
    <div>
      <h6 class="mb-4 text-lg font-bold dark:text-textPrimary-dark">
        Target Entity
      </h6>
    </div>
    <div
      class="overflow-x-auto border border-tableBorder dark:border-tableBorder-dark sm:rounded-lg"
    >
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="bg-tableHeadBg text-xs uppercase text-textSecondary dark:bg-tableHeadBg-dark dark:text-textSecondary-dark"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Type</th>
            <th scope="col" class="px-6 py-3">Source</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="record in rawJobTargetData"
            :key="record.entity_id"
            class="border-b bg-tableTrBg hover:bg-tableTrBgHover dark:border-tableBorder-dark dark:bg-tableTrBg-dark dark:hover:bg-tableTrBgHover-dark"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-textPrimary dark:text-textPrimary-dark"
            >
              <RouterLink :to="'/entity/' + record.entity_id">{{
                record.name
              }}</RouterLink>
            </th>
            <td class="px-6 py-4"><CodeBadge :value="record.type" /></td>
            <td class="px-6 py-4">{{ record.source }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
