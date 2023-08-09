<script setup>
import RunStatusBadge from "@/components/RunStatusBadge.vue";
import { useApiStore } from "@/stores/api";
import { useDateStore } from "@/stores/date";
import axios from "axios";
import { initDropdowns } from "flowbite";
import _ from "lodash";
import moment from "moment";
import { RouterLink } from "vue-router";
import SvgIcon from "./SvgIcon.vue";

defineProps({
  jobName: {
    type: String,
    required: false,
  },
});
</script>

<script>
export default {
  data() {
    return {
      apiStore: useApiStore(),
      dateStore: useDateStore(),
      page: 1,
      perPage: 50,
      rawRunData: null,
      rawRunData: null,
      searchTerm: "",
      statusTerm: "",
    };
  },
  created() {
    this.getRunData();
    this.dateStore.$subscribe(this.getRunData);
  },
  mounted() {
    _.delay(initDropdowns, 1000);
  },
  computed: {
    runData() {
      if (this.rawRunData) {
        let data = this.rawRunData;

        // Filter the data based on the search term and status term
        data = data.filter((item) => {
          return (
            item.job_name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >
              -1 &&
            item.status.toLowerCase().indexOf(this.statusTerm.toLowerCase()) >
              -1
          );
        });

        // Paginate the data
        return data.slice(this.startIndex, this.endIndex);
      } else {
        return null;
      }
    },
    dataLength() {
      if (this.rawRunData) {
        if (this.searchTerm || this.statusTerm) {
          return this.runData.length;
        } else {
          return this.rawRunData.length;
        }
      } else {
        return 0;
      }
    },
    startIndex() {
      return (this.page - 1) * this.perPage;
    },
    endIndex() {
      return Math.min(this.startIndex + this.perPage, this.dataLength);
    },
  },
  methods: {
    getRunData() {
      const url = new URL(this.apiStore.run);
      if (_.isEmpty(this.jobName)) {
        url.searchParams.append("start", this.dateStore.startTimestamp);
        url.searchParams.append("end", this.dateStore.endTimestamp);
      } else {
        url.searchParams.append("name", this.jobName);
      }
      url.searchParams.append("limit", 1000);
      axios.get(url.href).then((response) => (this.rawRunData = response.data));
    },
    formatDate(date) {
      if (date) {
        return moment(date).format("MMMM Do YYYY, h:mm:ss a");
      }
    },
    nextPage() {
      if (this.endIndex <= this.dataLength - 1) {
        this.page = this.page + 1;
      }
    },
    previousPage() {
      if (this.page > 1) {
        this.page = this.page - 1;
      }
    },
  },
  watch: { rawRunData() {} },
};
</script>

<template>
  <div
    v-if="!_.isEmpty(rawRunData)"
    class="overflow-x-autosm:rounded-lg relative w-full"
  >
    <div>
      <h6
        class="mb-4 text-lg font-bold dark:text-white"
        v-if="_.isEmpty(this.jobName)"
      >
        Recent Runs
      </h6>
    </div>
    <div class="flex items-center justify-between pb-4">
      <div>
        <button
          id="dropdownRadioButton"
          data-dropdown-toggle="dropdownRadio"
          class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium capitalize text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          type="button"
        >
          <SvgIcon icon="filter" class="mr-2" />
          {{ statusTerm || "Status" }}
          <SvgIcon icon="chevronDown" class="ml-2" />
        </button>
        <!-- Dropdown menu -->
        <div
          id="dropdownRadio"
          class="z-50 hidden w-fit divide-y divide-gray-100 rounded-lg border border-gray-300 bg-white shadow dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-700"
          data-popper-reference-hidden=""
          data-popper-escaped=""
          data-popper-placement="top"
          style="
            position: absolute;
            inset: auto auto 0px 0px;
            margin: 0px;
            transform: translate3d(522.5px, 3847.5px, 0px);
          "
        >
          <ul
            class="space-y-1 p-3 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownRadioButton"
          >
            <li>
              <div
                class="flex items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <input
                  checked=""
                  id="filter-radio-all"
                  type="radio"
                  value=""
                  name="filter-radio"
                  class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  v-model="statusTerm"
                />
                <label
                  for="filter-radio-all"
                  class="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  All
                </label>
              </div>
            </li>
            <li>
              <div
                class="flex items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <input
                  id="filter-radio-running"
                  type="radio"
                  value="running"
                  name="filter-radio"
                  class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  v-model="statusTerm"
                />
                <label
                  for="filter-radio-running"
                  class="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Running
                </label>
              </div>
            </li>
            <li>
              <div
                class="flex items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <input
                  id="filter-radio-failed"
                  type="radio"
                  value="failed"
                  name="filter-radio"
                  class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  v-model="statusTerm"
                />
                <label
                  for="filter-radio-failed"
                  class="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Failed
                </label>
              </div>
            </li>
            <li>
              <div
                class="flex items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <input
                  id="filter-radio-completed"
                  type="radio"
                  value="completed"
                  name="filter-radio"
                  class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  v-model="statusTerm"
                />
                <label
                  for="filter-radio-completed"
                  class="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Completed
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <SvgIcon icon="search" />
        </div>
        <input
          type="text"
          id="table-search"
          class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search"
          v-model="searchTerm"
        />
      </div>
    </div>
    <div
      class="overflow-x-auto border border-gray-300 dark:border-gray-600 sm:rounded-lg"
    >
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Run #</th>
            <th scope="col" class="px-6 py-3">Start Time</th>
            <th scope="col" class="px-6 py-3">End Time</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="record in runData"
            :key="record.run_id"
            class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              <RouterLink :to="'/job/' + record.job_id">
                {{ record.job_name }}
              </RouterLink>
            </th>
            <td class="px-6 py-4">{{ record.run_id }}</td>
            <td class="whitespace-nowrap px-6 py-4">
              {{ formatDate(record.start) }}
            </td>
            <td class="whitespace-nowrap px-6 py-4">
              {{ formatDate(record.end) }}
            </td>
            <td class="px-6 py-4">
              <RunStatusBadge :status="record.status" />
            </td>
            <td class="px-6 py-4">
              <RouterLink
                :to="'/job/' + record.job_id + '/run/' + record.run_id"
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                View
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav
      class="flex items-center justify-between pt-4"
      aria-label="Table navigation"
    >
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span class="font-semibold text-gray-900 dark:text-white">
          {{ startIndex + 1 }}-{{ endIndex }}
        </span>
        of
        <span
          class="font-semibold text-gray-900 dark:text-white"
          v-if="!_.isEmpty(rawRunData)"
        >
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
  <div v-else class="w-full">
    <div>
      <h6 class="mb-4 text-lg font-bold dark:text-white" v-if="_.isEmpty(this.jobName)">Recent Runs</h6>
    </div>
    <p class="text-gray-400 dark:text-gray-500">No recent jobs found.</p>
  </div>
</template>
