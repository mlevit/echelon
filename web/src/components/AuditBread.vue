<script setup>
import SvgIcon from '@/components/SvgIcon.vue'
import { useApiStore } from '@/stores/api'

import axios from 'axios'
import { initDropdowns } from 'flowbite'
import { RouterLink } from 'vue-router'

defineProps({
  processName: {
    type: String,
    required: true
  },
  processId: {
    type: String,
    required: true
  },
  auditId: {
    type: String,
    required: true
  }
})
</script>

<script>
export default {
  data() {
    return { apiStore: useApiStore(), rawAuditData: null }
  },
  created() {
    this.getAuditData()
  },
  mounted() {
    initDropdowns()
  },
  methods: {
    getAuditData() {
      const url = new URL(this.apiStore.processAudit)
      url.searchParams.append('name', this.processName)
      url.searchParams.append('jq', `map(select(.process_audit_id != ${this.auditId}))`)
      axios.get(url.href).then((response) => (this.rawAuditData = response.data))
    }
  }
}
</script>

<template>
  <nav
    class="flex w-full select-none rounded-lg border border-gray-200 bg-gray-50 px-5 py-3 text-gray-700 dark:border-gray-700 dark:bg-gray-800"
    aria-label="Breadcrumb"
  >
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <RouterLink
          to="/job"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
        >
          Job
        </RouterLink>
      </li>
      <li>
        <div class="flex items-center">
          <SvgIcon icon="chevronRight" />
          <RouterLink
            :to="'/job/' + processId"
            class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white md:ml-2"
            >{{ processName }}</RouterLink
          >
        </div>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <SvgIcon icon="chevronRight" />
          <span class="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">
            <RouterLink
              to="/run"
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              Run
            </RouterLink></span
          >
        </div>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <SvgIcon icon="chevronRight" class="mr-2" />
          <button
            id="dropdownaudit"
            data-dropdown-toggle="dropdown-audit"
            class="inline-flex rounded-lg border border-gray-300 bg-white px-2 py-2 text-center text-sm font-normal text-gray-700 hover:bg-gray-100  dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:focus:ring-gray-700"
          >
            #{{ auditId }}
            <SvgIcon icon="chevronDown" class="ml-2" />
          </button>
          <div
            id="dropdown-audit"
            class="z-10 hidden w-fit divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white shadow dark:border-gray-600 dark:bg-gray-700"
          >
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefault"
            >
              <li v-for="record in rawAuditData" :key="record.process_audit_id">
                <RouterLink
                  :to="'/job/' + processId + '/run/' + record.process_audit_id"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  #{{ record.process_audit_id }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ol>
  </nav>
</template>
