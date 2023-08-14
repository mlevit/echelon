<script setup>
import CodeBadge from "@/components/CodeBadge.vue";
import { useApiStore } from "@/stores/api";

import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { RouterLink } from "vue-router";

defineProps({
  entityId: {
    type: String,
    required: true,
  },
});
</script>

<script>
export default {
  data() {
    return { apiStore: useApiStore(), rawEntitySourceData: null };
  },
  created() {
    this.getEntitySourceData();
  },
  computed: {},
  methods: {
    getEntitySourceData() {
      const url = new URL(this.apiStore.query);
      url.searchParams.append(
        "sql",
        `select distinct job.job_id, job.name, job.type 
         from job 
         join job_entity_rel on job.job_id = job_entity_rel.job_id 
         where job_entity_rel.source_entity_id = ${this.entityId}`
      );
      axios
        .get(url.href)
        .then((response) => (this.rawEntitySourceData = response.data));
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
        Source for
      </h6>
    </div>
    <div
      class="overflow-x-auto border border-tableBorder dark:border-tableBorder-dark sm:rounded-lg"
      v-if="!_.isEmpty(rawEntitySourceData)"
    >
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="bg-tableHeadBg text-xs uppercase text-textSecondary dark:bg-tableHeadBg-dark dark:text-textSecondary-dark"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Type</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="record in rawEntitySourceData"
            :key="record.job_id"
            class="border-b bg-tableTrBg hover:bg-tableTrBgHover dark:border-tableBorder-dark dark:bg-tableTrBg-dark dark:hover:bg-tableTrBgHover-dark"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-textPrimary dark:text-textPrimary-dark"
            >
              <RouterLink :to="'/job/' + record.job_id">{{
                record.name
              }}</RouterLink>
            </th>
            <td class="px-6 py-4"><CodeBadge :value="record.type" /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p class="text-gray-400 dark:text-gray-500">Not a source for any jobs.</p>
    </div>
  </div>
</template>
