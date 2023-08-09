<script setup>
import { computed } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { RouterLink, RouterView } from "vue-router";

import CodeBadge from "@/components/CodeBadge.vue";
import DatePicker from "@/components/DatePicker.vue";
import SiteSearch from "@/components/SiteSearch.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { useApiStore } from "@/stores/api";
import { useDateStore } from "@/stores/date";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<script>
export default {
  data() {
    return { apiStore: useApiStore(), dateStore: useDateStore() };
  },
  methods: {
    toggleLive() {
      this.apiStore.isLive = !this.apiStore.isLive;
    },
  },
};
</script>

<template>
  <nav
    class="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
  >
    <div class="px-3 py-3 lg:px-4 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex select-none items-center justify-start">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-hover focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <a href="/" class="ml-2 flex md:mr-4">
            <SvgIcon
              icon="eye"
              size="2xl"
              color="custom"
              class="mr-3 h-8 text-primary dark:text-white"
            />
            <span
              class="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl"
            >
              Echelon
            </span>
          </a>
          <div
            class="inline-flex rounded-lg border border-border bg-white px-2 py-2 text-center text-sm font-normal text-textSecondary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
          >
            {{ apiStore.env }}
          </div>
        </div>
        <div class="flex items-center">
          <div class="ml-3 flex items-center">
            <div class="inline-flex gap-x-4 rounded-md" role="group">
              <div><SiteSearch /></div>
              <div>
                <button
                  type="button"
                  class="inline-flex select-none items-center rounded-l-lg border border-border bg-white px-4 py-2 text-sm font-medium text-textPrimary hover:bg-hover hover:text-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white"
                  @click="toggleLive()"
                >
                  <SvgIcon
                    icon="reload"
                    color="black"
                    class="mr-2"
                    :class="apiStore.isLive ? 'animate-spin' : 'animate-name'"
                  />
                  {{ apiStore.isLive ? "Live" : "Static" }}
                </button>
                <!-- <button
                  type="button"
                  class="inline-flex items-center rounded-r-lg border-t border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-textPrimary hover:bg-hover hover:text-primary focus:z-10 focus:text-primary focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-primary"
                >
                  <svg
                    aria-hidden="true"
                    class="mr-2 h-4 w-4 fill-current"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
                    ></path>
                  </svg>
                  Settings
                </button> -->
                <button
                  type="button"
                  class="inline-flex items-center rounded-r-md border border-l-0 border-border bg-white px-4 py-2 text-sm font-medium text-textPrimary hover:bg-hover hover:text-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white"
                  @click="toggleDark()"
                >
                  <SvgIcon
                    icon="sun"
                    color="black"
                    class="mr-2"
                    v-if="isDark"
                  />
                  <SvgIcon icon="moon" color="black" class="mr-2" v-else />
                  {{ isDark ? "Light" : "Dark" }}
                </button>
              </div>
              <div><DatePicker /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <aside
    id="logo-sidebar"
    class="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full select-none border-r border-gray-200 bg-white pt-20 transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
      <ul class="space-y-2">
        <li>
          <RouterLink
            to="/"
            class="flex items-center rounded-lg p-2 text-base font-normal text-textPrimary hover:bg-hover dark:text-white dark:hover:bg-gray-700"
          >
            <SvgIcon icon="dashboard" size="lg" color="black" />
            <span class="ml-3">Dashboard</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/run"
            class="flex items-center rounded-lg p-2 text-base font-normal text-textPrimary hover:bg-hover dark:text-white dark:hover:bg-gray-700"
          >
            <SvgIcon icon="run" size="lg" color="black" />
            <span class="ml-3 flex-1 whitespace-nowrap">Runs</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/job"
            class="flex items-center rounded-lg p-2 text-base font-normal text-textPrimary hover:bg-hover dark:text-white dark:hover:bg-gray-700"
          >
            <SvgIcon icon="job" size="lg" color="black" />
            <span class="ml-3 flex-1 whitespace-nowrap">Jobs</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/data"
            class="flex items-center rounded-lg p-2 text-base font-normal text-textPrimary hover:bg-hover dark:text-white dark:hover:bg-gray-700"
          >
            <SvgIcon icon="data" size="lg" color="black" />
            <span class="ml-3 flex-1 whitespace-nowrap">Entities</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
  <RouterView :key="$route.path" class="mt-14" v-if="dateStore.isReady" />
</template>
