<script setup>
import CodeBadge from "@/components/CodeBadge.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { useApiStore } from "@/stores/api";
import { initDropdowns } from "flowbite";

import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { RouterLink } from "vue-router";
</script>

<script>
export default {
  data() {
    return {
      apiStore: useApiStore(),
      page: 1,
      perPage: 50,
      rawEntityData: null,
      rawEntityTypeData: null,
      rawEntitySourceData: null,
      searchTerm: "",
      typeTerm: "",
      sourceTerm: "",
    };
  },
  mounted() {
    _.delay(initDropdowns, 1000);
  },
  created() {
    this.getEntityData();
    this.getEntityTypeData();
    this.getEntitySourceData();
  },
  computed: {
    entityData() {
      if (this.rawEntityData) {
        let data = this.rawEntityData;

        if (this.searchTerm) {
          data = data.filter((item) => {
            return (
              item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >
              -1
            );
          });
        }

        if (this.typeTerm) {
          data = data.filter((item) => {
            return item.type.toLowerCase() === this.typeTerm.toLowerCase();
          });
        }

        if (this.sourceTerm) {
          data = data.filter((item) => {
            return item.source.toLowerCase() === this.sourceTerm.toLowerCase();
          });
        }

        // Paginate the data
        return data.slice(this.startIndex, this.endIndex);
      } else {
        return null;
      }
    },
    dataLength() {
      if (this.rawEntityData) {
        return this.searchTerm
          ? this.entityData.length
          : this.rawEntityData.length;
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
    getEntityData() {
      const url = new URL(this.apiStore.entity);
      url.searchParams.append("limit", 10000);
      axios
        .get(url.href)
        .then((response) => (this.rawEntityData = response.data));
    },
    getEntityTypeData() {
      const url = new URL(this.apiStore.entity);
      url.searchParams.append("jq", "[.[] | .type] | unique | sort");
      axios
        .get(url.href)
        .then((response) => (this.rawEntityTypeData = response.data));
    },
    getEntitySourceData() {
      const url = new URL(this.apiStore.entity);
      url.searchParams.append(
        "jq",
        "[.[] | .source | select(length > 0)] | unique | sort"
      );
      axios
        .get(url.href)
        .then((response) => (this.rawEntitySourceData = response.data));
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
      <h6 class="mb-4 text-lg font-bold dark:text-textPrimary-dark">
        Entities
      </h6>
    </div>
    <div class="flex items-center justify-between pb-4">
      <div class="item-center flex justify-center">
        <button
          id="dropdownTypeButton"
          data-dropdown-toggle="dropdownType"
          class="inline-flex items-center rounded-l-lg border border-border bg-background-lightest px-3 py-2 text-sm font-medium text-gray-500 hover:bg-hover dark:border-gray-600 dark:bg-background-darker dark:text-textPrimary-dark dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          type="button"
        >
          <SvgIcon icon="filter" class="mr-2" />
          {{ typeTerm || "Type" }}
          <SvgIcon icon="chevronDown" class="ml-2" />
        </button>
        <button
          id="dropdownSourceButton"
          data-dropdown-toggle="dropdownSource"
          class="inline-flex items-center rounded-r-lg border border-l-0 border-border bg-background-lightest px-3 py-2 text-sm font-medium text-gray-500 hover:bg-hover dark:border-gray-600 dark:bg-background-darker dark:text-textPrimary-dark dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          type="button"
        >
          {{ sourceTerm || "Source" }}
          <SvgIcon icon="chevronDown" class="ml-2" />
        </button>
        <!-- Dropdown menu -->
        <div
          id="dropdownType"
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
            aria-labelledby="dropdownTypeButton"
          >
            <li>
              <div
                class="flex items-center rounded-lg p-2 hover:bg-hover dark:hover:bg-gray-600"
              >
                <input
                  checked=""
                  id="filter-type-all"
                  type="radio"
                  value=""
                  name="filter-type"
                  class="h-4 w-4 border-border bg-gray-100 text-blue-600 focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  v-model="typeTerm"
                />
                <label
                  for="filter-type-all"
                  class="ml-2 w-full rounded text-sm font-medium text-textPrimary dark:text-gray-300"
                >
                  All
                </label>
              </div>
            </li>
            <li>
              <div
                class="flex items-center rounded-lg p-2 hover:bg-hover dark:hover:bg-gray-600"
                v-for="record in rawEntityTypeData"
                :key="record"
              >
                <input
                  :id="'filter-type-' + record"
                  type="radio"
                  :value="record"
                  name="filter-type"
                  class="h-4 w-4 border-border bg-gray-100 text-blue-600 focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  v-model="typeTerm"
                />
                <label
                  :for="'filter-type-' + record"
                  class="ml-2 w-full rounded text-sm font-medium text-textPrimary dark:text-gray-300"
                >
                  {{ record }}
                </label>
              </div>
            </li>
          </ul>
        </div>
        <!-- Dropdown menu -->
        <div
          id="dropdownSource"
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
            aria-labelledby="dropdownSourceButton"
          >
            <li>
              <div
                class="flex items-center rounded p-2 hover:bg-hover dark:hover:bg-gray-600"
              >
                <input
                  checked=""
                  id="filter-source-all"
                  type="radio"
                  value=""
                  name="filter-source"
                  class="h-4 w-4 border-border bg-gray-100 text-blue-600 focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  v-model="sourceTerm"
                />
                <label
                  for="filter-source-all"
                  class="ml-2 w-full rounded text-sm font-medium text-textPrimary dark:text-gray-300"
                >
                  All
                </label>
              </div>
            </li>
            <li>
              <div
                class="flex items-center rounded p-2 hover:bg-hover dark:hover:bg-gray-600"
                v-for="record in rawEntitySourceData"
                :key="record"
              >
                <input
                  :id="'filter-source-' + record"
                  type="radio"
                  :value="record"
                  name="filter-source"
                  class="h-4 w-4 border-border bg-gray-100 text-blue-600 focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  v-model="sourceTerm"
                />
                <label
                  :for="'filter-source-' + record"
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
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Description</th>
            <th scope="col" class="px-6 py-3">Type</th>
            <th scope="col" class="px-6 py-3">Source</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b bg-background-lightest hover:bg-background dark:border-border-darker dark:bg-background-darker dark:hover:bg-gray-600"
            v-for="record in entityData"
            :key="record.entity_id"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-textPrimary dark:text-textPrimary-dark"
            >
              <RouterLink :to="'/entity/' + record.entity_id">{{
                record.name
              }}</RouterLink>
            </th>
            <td class="px-6 py-4">{{ record.description }}</td>
            <td class="px-6 py-4"><CodeBadge :value="record.type" /></td>
            <td class="px-6 py-4">{{ record.source }}</td>
            <td class="px-6 py-4">
              <RouterLink
                :to="'/entity/' + record.entity_id"
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
          v-if="!_.isEmpty(rawEntityData)"
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
</template>
