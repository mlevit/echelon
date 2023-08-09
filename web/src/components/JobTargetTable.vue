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
      class="overflow-x-auto border border-border dark:border-gray-600 sm:rounded-lg"
    >
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="bg-background text-xs uppercase text-textSecondary dark:bg-gray-700 dark:text-gray-400"
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
            class="border-b bg-background-lightest hover:bg-background dark:border-border-darker dark:bg-background-darker dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-textPrimary dark:text-textPrimary-dark"
            >
              <RouterLink :to="'/data/' + record.entity_id">{{
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
