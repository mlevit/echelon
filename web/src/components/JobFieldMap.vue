<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
import { useApiStore } from "@/stores/api";

import axios from "axios";
import _ from "lodash";

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
    return { apiStore: useApiStore(), rawMapData: null };
  },
  created() {
    this.getMapData();
  },
  computed: {},
  methods: {
    getMapData() {
      const url = new URL(this.apiStore.jobFieldMap);
      url.searchParams.append("name", this.jobName);
      axios.get(url.href).then((response) => (this.rawMapData = response.data));
    },
  },
};
</script>

<template>
  <div class="w-full">
    <div>
      <h6 class="mb-4 text-lg font-bold dark:text-textPrimary-dark">
        Field Mapping
      </h6>
    </div>
    <div
      class="overflow-x-auto border border-border dark:border-gray-600 sm:rounded-lg"
      v-if="!_.isEmpty(rawMapData)"
    >
      <table
        class="w-full table-fixed text-left text-sm text-gray-500 dark:text-gray-400"
      >
        <thead
          class="bg-background text-xs uppercase text-textSecondary dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3 text-right">Source Entity</th>
            <th scope="col" class="px-6 py-3 text-right">Source Field</th>
            <th scope="col" class="px-6 py-3"></th>
            <th scope="col" class="px-6 py-3">Target Field</th>
            <th scope="col" class="px-6 py-3">Target Entity</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b bg-background-lightest hover:bg-background dark:border-border-darker dark:bg-background-darker dark:hover:bg-gray-600"
            v-for="record in rawMapData"
            :key="record.run_id"
          >
            <td class="px-6 py-4 text-right">
              <RouterLink :to="'/entity/' + record.source_entity_id">{{
                record.source_entity_name
              }}</RouterLink>
            </td>
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 text-right font-medium text-textPrimary dark:text-textPrimary-dark"
            >
              {{ record.source_field_name }}
            </th>
            <td class="flex justify-center px-6 py-4">
              <SvgIcon icon="chevronRight" />
            </td>
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-textPrimary dark:text-textPrimary-dark"
            >
              {{ record.target_field_name }}
            </th>

            <td class="px-6 py-4">
              <RouterLink :to="'/entity/' + record.target_entity_id">{{
                record.target_entity_name
              }}</RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="w-full">
      <p class="text-gray-400 dark:text-gray-500">No field mappings defined.</p>
    </div>
  </div>
</template>
