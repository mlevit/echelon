<script setup>
import { RouterLink } from "vue-router";
import { useMagicKeys } from "@vueuse/core";
import _ from "lodash";
import axios from "axios";
import MiniSearch from "minisearch";

import { useApiStore } from "@/stores/api";
import SvgIcon from "@/components/SvgIcon.vue";
</script>

<script>
export default {
  data() {
    return {
      apiStore: useApiStore(),
      miniSearch: null,
      searchShortcut: null,
      searchTerm: null,
      searchResults: null,
    };
  },
  created() {
    this.initialize();
    this.getSearchData();

    const keys = useMagicKeys();
    this.searchShortcut = keys["meta+k"];
  },
  methods: {
    clearSearch() {
      this.searchTerm = null;
    },
    initialize() {
      this.miniSearch = new MiniSearch({
        fields: ["name", "description", "type"], // fields to index for full-text search
        storeFields: ["title", "description", "type", "object"], // fields to return with search results
      });
    },
    getSearchData() {
      const url = new URL(this.apiStore.search);
      axios
        .get(url.href)
        .then((response) => this.miniSearch.addAll(response.data));
    },
    getUrl(id) {
      let idSplit = id.split("_");
      return `/${idSplit[0]}/${idSplit[1]}`;
    },
  },
  watch: {
    searchShortcut(value) {
      if (value) {
        document.getElementById("site-search").focus();
      }
    },
    searchTerm() {
      if (this.searchTerm) {
        this.searchResults = this.miniSearch
          .search(this.searchTerm, {
            boost: { title: 2 },
            fuzzy: (term) => (term.length >= 3 ? 0.2 : null),
            prefix: (term) => term.length >= 3,
          })
          .slice(0, 10);
      }
    },
  },
};
</script>

<template>
  <label for="site-search" class="sr-only">Search</label>
  <div class="relative w-full">
    <div
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
    >
      <SvgIcon icon="search" />
    </div>
    <input
      type="text"
      id="site-search"
      class="block w-36 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 duration-300 focus:w-[560px] focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      placeholder="Search"
      v-model="searchTerm"
      v-on:blur="_.delay(clearSearch, 150)"
    />
    <!-- <div class="absolute inset-y-0 right-0 flex items-center justify-center pr-3">
      <kbd
        class="flex items-center justify-center rounded-lg border border-gray-200 px-2 align-middle text-xs font-semibold text-gray-500 dark:border-gray-600 dark:text-gray-400"
      >
        <span class="mr-0.5 items-center justify-center text-base font-thin">⌘</span>
        <span>K</span>
      </kbd>
    </div> -->
    <div
      class="absolute mt-2 grid max-h-96 w-[560px] grid-cols-1 gap-2 overflow-auto rounded-lg border border-gray-300 bg-white p-4 duration-500 dark:border-gray-600 dark:bg-gray-900"
      v-if="searchTerm"
    >
      <div class="flex h-fit" v-for="result in searchResults" :key="result.id">
        <RouterLink
          :to="getUrl(result.id)"
          class="min-h-14 flex max-h-fit w-full rounded-lg border border-gray-200 bg-white p-2 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div class="mr-2 flex items-center">
            <SvgIcon :icon="result.object" color="black" />
          </div>
          <div class="block">
            <h5 class="text-sm text-gray-900 dark:text-white">
              {{ result.title }}
            </h5>
            <p class="text-[12px] text-gray-700 dark:text-gray-400">
              <span class="capitalize">{{
                result.type.split("_").join(" ")
              }}</span>
              <span v-if="result.description"> · {{ result.description }}</span>
            </p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>