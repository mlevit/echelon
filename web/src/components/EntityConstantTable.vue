<script setup>
import BooleanFlag from "@/components/BooleanFlag.vue";
import CodeBadge from "@/components/CodeBadge.vue";
import { useApiStore } from "@/stores/api";

import axios from "axios";
import { initFlowbite } from "flowbite";
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
    return {
      apiStore: useApiStore(),
      rawEntityConstantData: null,
      rawEntityConstantDescriptionData: null,
    };
  },
  created() {
    this.getEntityConstantData();
    this.getEntityConstantDescriptionData();
  },
  mounted() {
    _.delay(initFlowbite, 500);
  },
  methods: {
    getEntityConstantData() {
      if (this.entityName) {
        const url = new URL(this.apiStore.entityConstant);
        url.searchParams.append("name", this.entityName);
        axios
          .get(url.href)
          .then((response) => (this.rawEntityConstantData = response.data));
      }
    },
    getEntityConstantDescriptionData() {
      const url = new URL(this.apiStore.query);
      url.searchParams.append(
        "sql",
        "select * from constraint_entity_constant_name"
      );
      url.searchParams.append(
        "jq",
        "map({(.value): {cast, required, comment}}) | add"
      );
      axios
        .get(url.href)
        .then(
          (response) => (this.rawEntityConstantDescriptionData = response.data)
        );
    },
    getConstantPopoverData(constantName) {
      return this.rawEntityConstantDescriptionData[constantName];
    },
  },
};
</script>

<template>
  <div class="w-full">
    <div>
      <h6 class="mb-4 text-lg font-bold dark:text-white">Constants</h6>
    </div>
    <div
      class="overflow-x-auto border border-border dark:border-gray-600 sm:rounded-lg"
      v-if="!_.isEmpty(rawEntityConstantData)"
    >
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="bg-background text-xs uppercase text-textSecondary dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b bg-white hover:bg-background dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            v-for="record in rawEntityConstantData"
            :key="record.entity_constant_id"
          >
            <th
              scope="row"
              class="items-center whitespace-nowrap px-6 py-4 font-medium text-textPrimary dark:text-white"
            >
              <span
                :data-popover-target="
                  'popover-' + record.name.replaceAll('_', '-')
                "
                data-popover-placement="right"
              >
                {{ record.name }}
              </span>
              <div
                data-popover
                :id="'popover-' + record.name.replaceAll('_', '-')"
                role="tooltip"
                class="invisible absolute z-10 inline-block w-fit rounded-lg border border-gray-200 bg-white text-sm text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
              >
                <div
                  class="overflow-x-auto border border-border dark:border-gray-600 sm:rounded-lg"
                  v-if="!_.isEmpty(rawEntityConstantDescriptionData)"
                >
                  <table
                    class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
                  >
                    <tbody>
                      <tr
                        class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                        v-for="(value, key) in getConstantPopoverData(
                          record.name
                        )"
                        :key="key"
                      >
                        <th
                          scope="row"
                          class="items-center whitespace-nowrap px-6 py-4 font-medium capitalize text-textPrimary dark:text-white"
                        >
                          {{ key }}
                        </th>
                        <th
                          scope="row"
                          class="max-w-xs items-center whitespace-normal px-6 py-4 font-medium text-textPrimary dark:text-white"
                          v-if="_.isBoolean(value)"
                        >
                          <BooleanFlag :value="value" />
                        </th>
                        <th
                          scope="row"
                          class="max-w-xs items-center whitespace-normal px-6 py-4 font-medium text-textPrimary dark:text-white"
                          v-else-if="key === 'cast'"
                        >
                          <CodeBadge :value="value" />
                        </th>
                        <th
                          scope="row"
                          class="max-w-xs items-center whitespace-normal px-6 py-4 font-medium text-textPrimary dark:text-white"
                          v-else
                        >
                          {{ value }}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div data-popper-arrow></div>
              </div>
            </th>
            <td class="px-6 py-4"><CodeBadge :value="record.value" /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p class="text-gray-400 dark:text-gray-500">No constants defined.</p>
    </div>
  </div>
</template>
