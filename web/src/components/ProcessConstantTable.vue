<script setup>
import BooleanFlag from '@/components/BooleanFlag.vue'
import CodeBadge from '@/components/CodeBadge.vue'
import { useApiStore } from '@/stores/api'

import axios from 'axios'
import { initFlowbite } from 'flowbite'
import _ from 'lodash'

defineProps({
  processName: {
    type: String,
    required: true
  }
})
</script>

<script>
export default {
  data() {
    return {
      apiStore: useApiStore(),
      rawProcessConstantData: null,
      rawProcessConstantDescriptionData: null
    }
  },
  created() {
    this.getProcessConstantData(), this.getProcessConstantDescriptionData()
  },
  mounted() {
    _.delay(initFlowbite, 500)
  },
  computed: {},
  methods: {
    getProcessConstantData() {
      const url = new URL(this.apiStore.processConstant)
      url.searchParams.append('name', this.processName)
      axios.get(url.href).then((response) => (this.rawProcessConstantData = response.data))
    },
    getProcessConstantDescriptionData() {
      const url = new URL(this.apiStore.query)
      url.searchParams.append('sql', 'select * from constraint_process_constant_name')
      url.searchParams.append('jq', 'map({(.value): {cast, required, comment}}) | add')
      axios
        .get(url.href)
        .then((response) => (this.rawProcessConstantDescriptionData = response.data))
    },
    getConstantPopoverData(constantName) {
      return this.rawProcessConstantDescriptionData[constantName]
    }
  }
}
</script>

<template>
  <div class="w-full">
    <div>
      <h6 class="mb-4 text-lg font-bold dark:text-white">Constants</h6>
    </div>
    <div
      class="overflow-x-auto border border-gray-300 dark:border-gray-600 sm:rounded-lg"
      v-if="!_.isEmpty(rawProcessConstantData)"
    >
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            v-for="record in rawProcessConstantData"
            :key="record.process_constant_id"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              <span
                :data-popover-target="'popover-' + record.name.replaceAll('_', '-')"
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
                  class="overflow-x-auto border border-gray-300 dark:border-gray-600 sm:rounded-lg"
                  v-if="!_.isEmpty(rawProcessConstantDescriptionData)"
                >
                  <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <tbody>
                      <tr
                        class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                        v-for="(value, key) in getConstantPopoverData(record.name)"
                        :key="key"
                      >
                        <th
                          scope="row"
                          class="items-center whitespace-nowrap px-6 py-4 font-medium capitalize text-gray-900 dark:text-white"
                        >
                          {{ key }}
                        </th>
                        <th
                          scope="row"
                          class="max-w-xs items-center whitespace-normal px-6 py-4 font-medium text-gray-900 dark:text-white"
                          v-if="_.isBoolean(value)"
                        >
                          <BooleanFlag :value="value" />
                        </th>
                        <th
                          scope="row"
                          class="max-w-xs items-center whitespace-normal px-6 py-4 font-medium text-gray-900 dark:text-white"
                          v-else-if="key === 'cast'"
                        >
                          <CodeBadge :value="value" />
                        </th>
                        <th
                          scope="row"
                          class="max-w-xs items-center whitespace-normal px-6 py-4 font-medium text-gray-900 dark:text-white"
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
    <div v-else><p class="text-gray-400 dark:text-gray-500">No constants defined.</p></div>
  </div>
</template>
