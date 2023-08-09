<script setup>
import { useApiStore } from "@/stores/api";
import { useDateStore } from "@/stores/date";
import SvgIcon from "./SvgIcon.vue";

import axios from "axios";
import { initDropdowns } from "flowbite";
import _ from "lodash";
import moment from "moment";
import { RouterLink } from "vue-router";
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
    jobRunData() {
      if (this.rawRunData) {
        let data = this.rawRunData;

        // Filter the data based on the search term and status term
        data = data.filter((item) => {
          return (
            item.job_name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >
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
          return this.jobRunData.length;
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
      const url = new URL(this.apiStore.jobNext);
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
      <h6 class="mb-4 text-lg font-bold dark:text-textPrimary-dark">
        Upcoming Runs
      </h6>
    </div>
    <div class="flex hidden items-center justify-between pb-4">
      <div></div>
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
          class="block w-80 rounded-lg border border-border bg-background p-2 pl-10 text-sm text-textPrimary focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-textPrimary-dark dark:placeholder-gray-400 dark:focus:border-primary-dark dark:focus:ring-primary-dark"
          placeholder="Search"
          v-model="searchTerm"
        />
      </div>
    </div>
    <div
      class="overflow-x-auto border border-border dark:border-gray-600 sm:rounded-lg"
    >
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="bg-background text-xs uppercase text-textSecondary dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Job</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="record in jobRunData"
            :key="record.job_id"
            class="border-b bg-background-lightest hover:bg-background dark:border-border-darker dark:bg-background-darker dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-textPrimary dark:text-textPrimary-dark"
            >
              <RouterLink :to="'/job/' + record.job_id">
                {{ record.job_name }}
              </RouterLink>
            </th>
            <td class="px-6 py-4">
              <RouterLink
                :to="'/job/' + record.job_id"
                class="font-medium text-primary hover:underline dark:text-primary-dark"
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
        <span class="font-semibold text-textPrimary dark:text-textPrimary-dark">
          {{ startIndex + 1 }}-{{ endIndex }}
        </span>
        of
        <span
          class="font-semibold text-textPrimary dark:text-textPrimary-dark"
          v-if="!_.isEmpty(rawRunData)"
        >
          {{ dataLength }}
        </span>
      </span>
      <ul class="inline-flex items-center -space-x-px">
        <li>
          <a
            href="#!"
            class="ml-0 block rounded-l-lg border border-border bg-background-lightest px-3 py-2 leading-tight text-gray-500 hover:bg-hover hover:text-textSecondary dark:border-border-darker dark:bg-background-darker dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-textPrimary-dark"
            @click="previousPage"
          >
            <span class="sr-only">Previous</span>
            <SvgIcon icon="chevronLeft" />
          </a>
        </li>
        <li>
          <a
            href="#!"
            class="block rounded-r-lg border border-border bg-background-lightest px-3 py-2 leading-tight text-gray-500 hover:bg-hover hover:text-textSecondary dark:border-border-darker dark:bg-background-darker dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-textPrimary-dark"
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
      <h6 class="mb-4 text-lg font-bold dark:text-textPrimary-dark">
        Upcoming Runs
      </h6>
    </div>
    <p class="text-gray-400 dark:text-gray-500">No upcoming jobs found.</p>
  </div>
</template>
