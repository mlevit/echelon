<script setup>
import { useApiStore } from "@/stores/api";

import BooleanFlag from "@/components/BooleanFlag.vue";
import axios from "axios";
import _ from "lodash";

defineProps({
  entityName: {
    type: String,
    required: true,
  },
});
</script>

<script>
export default {
  data() {
    return { apiStore: useApiStore(), rawFieldData: null };
  },
  created() {
    this.getFieldData();
  },
  computed: {},
  methods: {
    getFieldData() {
      if (this.entityName) {
        const url = new URL(this.apiStore.entityField);
        url.searchParams.append("name", this.entityName);
        axios
          .get(url.href)
          .then((response) => (this.rawFieldData = response.data));
      }
    },
  },
};
</script>

<template>
  <div class="w-full">
    <div>
      <h6 class="mb-4 text-lg font-bold dark:text-textPrimary-dark">Fields</h6>
    </div>
    <div class="relative w-full overflow-x-auto sm:rounded-lg">
      <div
        class="overflow-x-auto border border-tableBorder dark:border-tableBorder-dark sm:rounded-lg"
        v-if="!_.isEmpty(rawFieldData)"
      >
        <table
          class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        >
          <thead
            class="bg-tableHeadBg text-xs uppercase text-textSecondary dark:bg-tableHeadBg-dark dark:text-textSecondary-dark"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Type</th>
              <th scope="col" class="px-6 py-3">Length</th>
              <th scope="col" class="px-6 py-3">Precision</th>
              <th scope="col" class="px-6 py-3">Scale</th>
              <th scope="col" class="px-6 py-3">Description</th>
              <th scope="col" class="px-6 py-3">Classification</th>
              <th scope="col" class="px-6 py-3">Required</th>
              <th scope="col" class="px-6 py-3">Computed</th>
              <th scope="col" class="px-6 py-3">Sequence</th>
              <th scope="col" class="px-6 py-3">Hash Key</th>
              <th scope="col" class="px-6 py-3">Hash Diff</th>
              <th scope="col" class="px-6 py-3">Record Source</th>
              <th scope="col" class="px-6 py-3">Business Date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b bg-tableTrBg hover:bg-tableTrBgHover dark:border-tableBorder-dark dark:bg-tableTrBg-dark dark:hover:bg-tableTrBgHover-dark"
              v-for="record in rawFieldData"
              :key="record.entity_id"
            >
              <th
                scope="row"
                class="whitespace-nowrap px-6 py-4 font-medium text-textPrimary dark:text-textPrimary-dark"
              >
                {{ record.physical_name }}
              </th>
              <td class="px-6 py-4">{{ record.data_type }}</td>
              <td class="px-6 py-4">{{ record.length }}</td>
              <td class="px-6 py-4">{{ record.precision }}</td>
              <td class="px-6 py-4">{{ record.scale }}</td>
              <td class="px-6 py-4">{{ record.description }}</td>
              <td class="px-6 py-4">{{ record.classification }}</td>
              <td class="px-6 py-4">
                <BooleanFlag :value="record.required_flag" />
              </td>
              <td class="px-6 py-4">
                <BooleanFlag :value="record.computed_flag" />
              </td>
              <td class="px-6 py-4">
                <BooleanFlag :value="record.sequence_flag" />
              </td>
              <td class="px-6 py-4">
                <BooleanFlag :value="record.hash_key_flag" />
              </td>
              <td class="px-6 py-4">
                <BooleanFlag :value="record.hash_diff_flag" />
              </td>
              <td class="px-6 py-4">
                <BooleanFlag :value="record.record_source_flag" />
              </td>
              <td class="px-6 py-4">
                <BooleanFlag :value="record.business_date_flag" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p class="text-gray-400 dark:text-gray-500">No fields defined.</p>
      </div>
    </div>
  </div>
</template>
