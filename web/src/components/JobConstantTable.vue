<script setup>
import BooleanFlag from "@/components/BooleanFlag.vue";
import CodeBadge from "@/components/CodeBadge.vue";
import { useApiStore } from "@/stores/api";

import axios from "axios";
import { initFlowbite } from "flowbite";
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
    return {
      apiStore: useApiStore(),
      rawJobConstantData: null,
      rawJobConstantDescriptionData: null,
    };
  },
  created() {
    this.getJobConstantData(), this.getJobConstantDescriptionData();
  },
  mounted() {
    _.delay(initFlowbite, 500);
  },
  computed: {},
  methods: {
    getJobConstantData() {
      const url = new URL(this.apiStore.jobConstant);
      url.searchParams.append("name", this.jobName);
      axios
        .get(url.href)
        .then((response) => (this.rawJobConstantData = response.data));
    },
    getJobConstantDescriptionData() {
      const url = new URL(this.apiStore.query);
      url.searchParams.append(
        "sql",
        "select * from constraint_job_constant_name"
      );
      url.searchParams.append(
        "jq",
        "map({(.value): {cast, required, comment}}) | add"
      );
      axios
        .get(url.href)
        .then(
          (response) => (this.rawJobConstantDescriptionData = response.data)
        );
    },
    getConstantPopoverData(constantName) {
      return this.rawJobConstantDescriptionData[constantName];
    },
  },
};
</script>

<template>
  <div class="w-full">
    <div>
      <h6 class="mb-4 text-lg font-bold dark:text-textPrimary-dark">
        Constants
      </h6>
    </div>
    <div
      class="overflow-x-auto border border-tableBorder dark:border-tableBorder-dark sm:rounded-lg"
      v-if="!_.isEmpty(rawJobConstantData)"
    >
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="bg-tableHeadBg text-xs uppercase text-textSecondary dark:bg-tableHeadBg-dark dark:text-textSecondary-dark"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b bg-tableTrBg hover:bg-tableTrBgHover dark:border-tableBorder-dark dark:bg-tableTrBg-dark dark:hover:bg-tableTrBgHover-dark"
            v-for="record in rawJobConstantData"
            :key="record.job_constant_id"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-textPrimary dark:text-textPrimary-dark"
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
                class="invisible absolute z-10 inline-block w-fit rounded-lg border border-border-lighter bg-background-lightest text-sm text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-background-darker dark:text-gray-400"
              >
                <div
                  class="overflow-x-auto border border-tableBorder dark:border-tableBorder-dark sm:rounded-lg"
                  v-if="!_.isEmpty(rawJobConstantDescriptionData)"
                >
                  <table
                    class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
                  >
                    <tbody>
                      <tr
                        class="border-b bg-background-lightest dark:border-border-darker dark:bg-background-darker"
                        v-for="(value, key) in getConstantPopoverData(
                          record.name
                        )"
                        :key="key"
                      >
                        <th
                          scope="row"
                          class="items-center whitespace-nowrap px-6 py-4 font-medium capitalize text-textPrimary dark:text-textPrimary-dark"
                        >
                          {{ key }}
                        </th>
                        <th
                          scope="row"
                          class="max-w-xs items-center whitespace-normal px-6 py-4 font-medium text-textPrimary dark:text-textPrimary-dark"
                          v-if="_.isBoolean(value)"
                        >
                          <BooleanFlag :value="value" />
                        </th>
                        <th
                          scope="row"
                          class="max-w-xs items-center whitespace-normal px-6 py-4 font-medium text-textPrimary dark:text-textPrimary-dark"
                          v-else-if="key === 'cast'"
                        >
                          <CodeBadge :value="value" />
                        </th>
                        <th
                          scope="row"
                          class="max-w-xs items-center whitespace-normal px-6 py-4 font-medium text-textPrimary dark:text-textPrimary-dark"
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
