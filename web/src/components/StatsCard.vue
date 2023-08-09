<script setup>
import { initTabs } from "flowbite";

defineProps({
  details: {
    type: Object,
    required: false,
  },
  stats: {
    type: Object,
    required: false,
  },
});
</script>

<script>
export default {
  mounted() {
    initTabs();
  },
};
</script>

<template>
  <div
    class="w-full rounded-lg border border-border-lighter bg-background-lightest shadow dark:border-border-darker dark:bg-background-darker"
  >
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select tab</label>
      <select
        id="tabs"
        class="block w-full rounded-t-lg border-0 border-b border-border-lighter bg-background p-2.5 text-sm text-textPrimary focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-textPrimary-dark dark:placeholder-gray-400 dark:focus:border-primary-dark dark:focus:ring-primary-dark"
      >
        <option>Details</option>
        <option>Statistics</option>
      </select>
    </div>
    <ul
      class="hidden divide-x divide-gray-200 rounded-lg text-center text-sm font-medium text-gray-500 dark:divide-gray-600 dark:text-gray-400 sm:flex"
      id="fullWidthTab"
      data-tabs-toggle="#fullWidthTabContent"
      role="tablist"
    >
      <li class="w-full">
        <button
          id="details-tab"
          data-tabs-target="#details"
          type="button"
          role="tab"
          aria-controls="details"
          aria-selected="true"
          class="inline-block w-full rounded-tl-lg bg-background p-4 hover:bg-hover focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Details
        </button>
      </li>
      <li class="w-full">
        <button
          id="stats-tab"
          data-tabs-target="#stats"
          type="button"
          role="tab"
          aria-controls="stats"
          aria-selected="false"
          class="inline-block w-full bg-background p-4 hover:bg-hover focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Statistics
        </button>
      </li>
    </ul>
    <div
      id="fullWidthTabContent"
      class="border-t border-border-lighter dark:border-gray-600"
    >
      <div
        class="hidden rounded-lg bg-background-lightest dark:bg-background-darker"
        id="details"
        role="tabpanel"
        aria-labelledby="details-tab"
      >
        <dl
          class="mx-auto grid max-w-screen-xl grid-cols-2 gap-8 p-4 text-textPrimary dark:text-textPrimary-dark sm:grid-cols-3 sm:p-8 xl:grid-cols-4"
        >
          <div
            v-for="record in details"
            :key="record.title"
            class="flex flex-col items-center justify-center"
          >
            <dt class="mb-2 text-center text-3xl font-extrabold">
              {{ record.value }}
            </dt>
            <dd class="text-center font-light text-gray-500 dark:text-gray-400">
              {{ record.title }}
            </dd>
          </div>
        </dl>
      </div>
      <div
        class="hidden rounded-lg bg-background-lightest dark:bg-background-darker"
        id="stats"
        role="tabpanel"
        aria-labelledby="stats-tab"
      >
        <dl
          class="mx-auto grid max-w-screen-xl grid-cols-2 gap-8 p-4 text-textPrimary dark:text-textPrimary-dark sm:grid-cols-3 sm:p-8 xl:grid-cols-3"
        >
          <div
            v-for="record in stats"
            :key="record.title"
            class="flex flex-col items-center justify-center"
          >
            <dt class="mb-2 text-center text-3xl font-extrabold">
              {{ record.value }}
            </dt>
            <dd class="text-center font-light text-gray-500 dark:text-gray-400">
              {{ record.title }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
