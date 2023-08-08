<script setup>
import SvgIcon from '@/components/SvgIcon.vue'
import { useApiStore } from '@/stores/api'
import AuditStatusBadge from './AuditStatusBadge.vue'

import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'
import { RouterLink } from 'vue-router'

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
    return { apiStore: useApiStore(), page: 1, perPage: 10, rawAuditData: null, searchTerm: '' }
  },
  created() {
    this.getAuditData()
  },
  computed: {
    auditData() {
      if (this.rawAuditData) {
        // Filter the data based on the search term
        let data = this.rawAuditData.filter((item) => {
          return item.process_name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
        })

        // Paginate the data
        return data.slice(this.startIndex, this.endIndex)
      } else {
        return null
      }
    },
    dataLength() {
      if (this.rawAuditData) {
        return this.searchTerm ? this.auditData.length : this.rawAuditData.length
      } else {
        return 0
      }
    },
    startIndex() {
      return (this.page - 1) * this.perPage
    },
    endIndex() {
      return Math.min(this.startIndex + this.perPage, this.dataLength)
    }
  },
  methods: {
    getAuditData() {
      const url = new URL(this.apiStore.processAudit)
      url.searchParams.append('name', this.processName)
      url.searchParams.append('limit', 1000)
      axios.get(url.href).then((response) => (this.rawAuditData = response.data))
    },
    formatDate(date) {
      if (date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a')
      }
    },
    nextPage() {
      if (this.endIndex <= this.dataLength - 1) {
        this.page = this.page + 1
      }
    },
    previousPage() {
      if (this.page > 1) {
        this.page = this.page - 1
      }
    }
  }
}
</script>

<template>
  <div class="grid w-full gap-y-4 dark:bg-gray-900">
    <!-- <div>
      <h6 class="text-lg font-bold dark:text-white">Runs</h6>
    </div> -->
    <div>
      <div
        class="overflow-x-auto border border-gray-300 dark:border-gray-600 sm:rounded-lg"
        v-if="!_.isEmpty(rawAuditData)"
      >
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead
            class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Run #</th>
              <th scope="col" class="px-6 py-3">Start Time</th>
              <th scope="col" class="px-6 py-3">End Time</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              v-for="record in auditData"
              :key="record.process_audit_id"
            >
              <th
                scope="row"
                class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                <RouterLink :to="'/job/' + record.process_id + '/run/' + record.process_audit_id">
                  {{ record.process_audit_id }}
                </RouterLink>
              </th>
              <td class="px-6 py-4">{{ formatDate(record.start) }}</td>
              <td class="px-6 py-4">{{ formatDate(record.end) }}</td>
              <td class="px-6 py-4"><AuditStatusBadge :status="record.status" /></td>
              <td class="px-6 py-4">
                <RouterLink
                  :to="'/job/' + record.process_id + '/run/' + record.process_audit_id"
                  class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  View
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else><p class="text-gray-400 dark:text-gray-500">No runs found.</p></div>
      <nav
        class="flex items-center justify-between pt-4"
        aria-label="Table navigation"
        v-if="!_.isEmpty(auditData)"
      >
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing
          <span class="font-semibold text-gray-900 dark:text-white">
            {{ startIndex + 1 }}-{{ endIndex }}</span
          >
          of
          <span class="font-semibold text-gray-900 dark:text-white" v-if="!_.isEmpty(auditData)">
            {{ dataLength }}
          </span>
        </span>
        <ul class="inline-flex items-center -space-x-px">
          <li>
            <a
              href="#!"
              class="ml-0 block rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              @click="previousPage"
            >
              <span class="sr-only">Previous</span>
              <SvgIcon icon="chevronLeft" />
            </a>
          </li>
          <li>
            <a
              href="#!"
              class="block rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              @click="nextPage"
            >
              <span class="sr-only">Next</span>
              <SvgIcon icon="chevronRight" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
