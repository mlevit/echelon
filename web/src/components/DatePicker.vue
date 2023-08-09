<script setup>
import { useApiStore } from "@/stores/api";
import { useDateStore } from "@/stores/date";
import SvgIcon from "@/components/SvgIcon.vue";

import axios from "axios";
import DateRangePicker from "flowbite-datepicker/DateRangePicker";
import _ from "lodash";
import moment from "moment";
</script>

<script>
export default {
  data() {
    return {
      apiStore: useApiStore(),
      dateStore: useDateStore(),
      datePicker: null,
    };
  },
  created() {
    this.setRunDates();
  },
  mounted() {
    this.initializeDatePicker();
    this.setEventListeners();
  },
  methods: {
    initializeDatePicker() {
      const dateRangePickerEl = document.getElementById("dateRangePicker");
      this.datePicker = new DateRangePicker(dateRangePickerEl, {
        format: "yyyy-mm-dd",
        weekStart: 1,
      });
    },
    setEventListeners() {
      const startEl = document.getElementById("startDate");
      const endEl = document.getElementById("endDate");

      startEl.addEventListener(
        "changeDate",
        (e) =>
          (this.dateStore.startDate = moment(e.detail.date).format(
            "YYYY-MM-DD"
          ))
      );
      endEl.addEventListener(
        "changeDate",
        (e) =>
          (this.dateStore.endDate = moment(e.detail.date).format("YYYY-MM-DD"))
      );
    },
    setRunDates() {
      if (!this.dateStore.startDate || !this.dateStore.endDate) {
        const url = new URL(this.apiStore.run);
        url.searchParams.append("limit", 1);
        axios.get(url.href).then((response) => {
          const result = response.data[0] || {};
          const start = moment(_.get(result, "start")).subtract(7, "days");

          this.dateStore.startDate = start.format("YYYY-MM-DD");
          this.dateStore.endDate = start.add(7, "days").format("YYYY-MM-DD");

          this.datePicker.setDates(
            this.dateStore.startDate,
            this.dateStore.endDate
          );
        });
      }
    },
  },
  watch: {},
};
</script>

<template>
  <div date-rangepicker id="dateRangePicker" class="flex w-80 items-center">
    <div class="relative">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <SvgIcon icon="calendar" class="mr-2" />
      </div>
      <input
        name="start"
        id="startDate"
        type="text"
        class="block w-36 rounded-lg border border-border bg-background p-2 pl-10 text-sm text-textPrimary focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-textPrimary-dark dark:placeholder-gray-400 dark:focus:border-primary-dark dark:focus:ring-primary-dark"
        placeholder="Start date"
        @input="(event) => (text = event.target.value)"
      />
    </div>
    <span class="flex-auto select-none text-center text-gray-500">to</span>
    <div class="relative max-w-sm">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <SvgIcon icon="calendar" class="mr-2" />
      </div>
      <input
        name="end"
        id="endDate"
        type="text"
        class="block w-36 rounded-lg border border-border bg-background p-2 pl-10 text-sm text-textPrimary focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-textPrimary-dark dark:placeholder-gray-400 dark:focus:border-primary-dark dark:focus:ring-primary-dark"
        placeholder="End date"
        @input="(event) => (text = event.target.value)"
      />
    </div>
  </div>
</template>
