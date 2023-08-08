<script setup>
import CodeBadge from '@/components/CodeBadge.vue'
import SvgIcon from '@/components/SvgIcon.vue'

import { useApiStore } from '@/stores/api'

import axios from 'axios'
import { initFlowbite } from 'flowbite'
import _ from 'lodash'
import moment from 'moment'

defineProps({
  auditId: {
    type: String,
    required: true
  },
  auditStatus: {
    type: String,
    required: true
  }
})
</script>

<script>
export default {
  data() {
    return { apiStore: useApiStore(), rawAuditFlowData: null, liveIntervalId: null }
  },
  created() {
    this.getAuditFlowData()
    this.createInterval()
  },
  mounted() {
    initFlowbite()
  },
  unmounted() {
    this.clearInterval()
  },
  computed: {},
  methods: {
    getAuditFlowData() {
      const url = new URL(this.apiStore.processAuditFlow)
      url.searchParams.append('id', this.auditId)
      axios.get(url.href).then((response) => (this.rawAuditFlowData = response.data))
    },
    formatDate(date) {
      if (date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a')
      }
    },
    clearInterval() {
      if (this.liveIntervalId) {
        window.clearInterval(this.liveIntervalId)
      }
    },
    copyData() {
      navigator.clipboard.writeText(JSON.stringify(this.rawAuditFlowData, null, 2))
    },
    createInterval() {
      if (this.auditStatus === 'running') {
        this.liveIntervalId = window.setInterval(this.getAuditFlowData, 5000)
      } else {
        this.clearInterval()
      }
    }
  }
}
</script>

<template>
  <div class="grid w-full gap-y-4">
    <div class="flex items-center">
      <h6 class="text-lg font-bold dark:text-white">Metrics</h6>
      <SvgIcon
        icon="clipboard"
        color="black"
        class="ml-2 cursor-pointer"
        @click="copyData"
        data-tooltip-target="tooltip-copy"
        data-tooltip-placement="right"
      />
      <div
        id="tooltip-copy"
        role="tooltip"
        class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm dark:bg-gray-700"
      >
        Copy
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
    <div>
      <div
        class="overflow-x-auto border border-gray-300 dark:border-gray-600 sm:rounded-lg"
        v-if="!_.isEmpty(rawAuditFlowData)"
      >
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead
            class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Job</th>
              <th scope="col" class="px-6 py-3">Function</th>
              <th scope="col" class="px-6 py-3">Label</th>
              <th scope="col" class="px-6 py-3">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              v-for="record in rawAuditFlowData"
              :key="record.flow_id"
            >
              <td class="px-6 py-4"><CodeBadge :value="record.job" /></td>
              <td class="px-6 py-4"><CodeBadge :value="record.function" /></td>
              <td class="px-6 py-4"><CodeBadge :value="record.label" /></td>
              <td class="px-6 py-4">{{ record.count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else><p class="text-gray-400 dark:text-gray-500">No metrics captured.</p></div>
    </div>
  </div>
</template>
