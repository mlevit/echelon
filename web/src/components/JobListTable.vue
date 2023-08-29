<script setup>
import CodeBadge from "@/components/CodeBadge.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { useApiStore } from "@/stores/api";
import { initDropdowns } from "flowbite";
import { RouterLink } from "vue-router";

import axios from "axios";
import _ from "lodash";
import moment from "moment";
</script>

<script>
export default {
  data() {
    return {
      apiStore: useApiStore(),
      page: 1,
      perPage: 50,
      rawJobData: null,
      rawJobTypeData: null,
      searchTerm: "",
      typeTerm: "",
    };
  },
  created() {
    this.getJobData();
    this.getJobTypeData();
  },
  mounted() {
    _.delay(initDropdowns, 1000);
  },
  computed: {
    jobData() {
      if (this.rawJobData) {
        // Filter the data based on the search term
        let data = this.rawJobData.filter((item) => {
          if (this.typeTerm === "") {
            // Return true to include all items when this.typeTerm is empty
            return (
              item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >
              -1
            );
          } else {
            // Include only items that match both search and type terms
            return (
              item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >
                -1 && item.type.toLowerCase() === this.typeTerm.toLowerCase()
            );
          }
        });

        // Paginate the data
        return data.slice(this.startIndex, this.endIndex);
      } else {
        return null;
      }
    },
    dataLength() {
      if (this.rawJobData) {
        return this.searchTerm ? this.jobData.length : this.rawJobData.length;
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
    getJobData() {
      const url = new URL(this.apiStore.job);
      url.searchParams.append("limit", 10000);
      axios.get(url.href).then((response) => (this.rawJobData = response.data));
    },
    getJobTypeData() {
      const url = new URL(this.apiStore.job);
      url.searchParams.append("jq", "[.[] | .type] | unique | sort");
      axios
        .get(url.href)
        .then((response) => (this.rawJobTypeData = response.data));
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
};
</script>

<template>
  <div class="overflow-x-autosm:rounded-lg relative w-full">
    <div>
      <h6 class="mb-4 text-lg font-bold dark:text-textPrimary-dark">Jobs</h6>
    </div>
    <div class="flex items-center justify-between pb-4">
      <div>
        <button
          id="dropdownRadioButton"
          data-dropdown-toggle="dropdownRadio"
          class="inline-flex items-center rounded-lg border border-border bg-background-lightest px-3 py-2 text-sm font-medium text-gray-500 hover:bg-hover focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-background-darker dark:text-textPrimary-dark dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          type="button"
        >
          <SvgIcon icon="filter" class="mr-2" />
          {{ typeTerm || "Type" }}
          <SvgIcon icon="chevronDown" class="ml-2" />
        </button>
        <!-- Dropdown menu -->
        <div
          id="dropdownRadio"
          class="z-50 hidden w-fit divide-y divide-gray-100 rounded-lg border border-border bg-background-lightest shadow dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-700"
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
            class="space-y-1 p-3 text-sm text-textSecondary dark:text-gray-200"
            aria-labelledby="dropdownRadioButton"
          >
            <li>
              <div
                class="flex items-center rounded-lg p-2 hover:bg-hover dark:hover:bg-gray-600"
              >
                <input
                  checked=""
                  id="filter-radio-all"
                  type="radio"
                  value=""
                  name="filter-radio"
                  class="h-4 w-4 border-border bg-gray-100 text-blue-600 focus:ring-0 focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  v-model="typeTerm"
                />
                <label
                  for="filter-radio-all"
                  class="ml-2 w-full rounded text-sm font-medium text-textPrimary dark:text-gray-300"
                >
                  All
                </label>
              </div>
            </li>
            <li>
              <div
                class="flex items-center rounded-lg p-2 hover:bg-hover dark:hover:bg-gray-600"
                v-for="record in rawJobTypeData"
                :key="record"
              >
                <input
                  :id="'filter-radio-' + record"
                  type="radio"
                  :value="record"
                  name="filter-radio"
                  class="h-4 w-4 border-border bg-gray-100 text-blue-600 focus:ring-0 focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  v-model="typeTerm"
                />
                <label
                  :for="'filter-radio-' + record"
                  class="ml-2 w-full rounded text-sm font-medium text-textPrimary dark:text-gray-300"
                >
                  {{ record }}
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
          class="block w-80 rounded-lg border border-inputBorder bg-inputBg p-2 pl-10 text-sm text-textPrimary focus:border-accent-dark focus:ring-accent-dark dark:border-inputBorder-dark dark:bg-inputBg-dark dark:text-textPrimary-dark dark:placeholder-gray-400 dark:focus:border-accent-dark dark:focus:ring-accent-dark"
          placeholder="Search"
          v-model="searchTerm"
        />
      </div>
    </div>
    <div
      class="overflow-x-auto border border-tableBorder dark:border-tableBorder-dark sm:rounded-lg"
    >
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="bg-background text-xs uppercase text-textSecondary dark:bg-background-dark dark:text-textSecondary-dark"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Description</th>
            <th scope="col" class="px-6 py-3">Type</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="record in jobData"
            :key="record.run_id"
            class="border-b bg-tableTrBg hover:bg-tableTrBgHover dark:border-tableBorder-dark dark:bg-tableTrBg-dark dark:hover:bg-tableTrBgHover-dark"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-textPrimary dark:text-textPrimary-dark"
            >
              <RouterLink :to="'/job/' + record.job_id">{{
                record.name
              }}</RouterLink>
            </th>
            <td class="px-6 py-4">{{ record.description }}</td>
            <td class="px-6 py-4"><CodeBadge :value="record.type" /></td>
            <td class="px-6 py-4">
              <RouterLink
                :to="'/job/' + record.job_id"
                class="font-medium text-accent hover:underline dark:text-accent-dark"
                >View</RouterLink
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav
      class="flex items-center justify-between pt-4"
      aria-label="Table navigation"
    >
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400"
        >Showing
        <span class="font-semibold text-textPrimary dark:text-textPrimary-dark"
          >{{ startIndex + 1 }}-{{ endIndex }}</span
        >
        of
        <span
          class="font-semibold text-textPrimary dark:text-textPrimary-dark"
          v-if="rawJobData"
          >{{ dataLength }}</span
        ></span
      >
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
</template>
