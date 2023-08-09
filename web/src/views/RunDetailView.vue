<script setup>
import RunBread from "@/components/RunBread.vue";
import RunFlowTable from "@/components/RunFlowTable.vue";
import RunLogTable from "@/components/RunLogTable.vue";
import KpiCard from "@/components/KpiCard.vue";

import { useApiStore } from "@/stores/api";
import { useTitle } from "@vueuse/core";

import axios from "axios";
import _ from "lodash";
import moment from "moment";
</script>

<script>
export default {
  data() {
    return {
      apiStore: useApiStore(),
      liveIntervalId: [],
      rawRunData: null,
      rawFlowData: {},
      rawJobData: {},
    };
  },
  created() {
    this.getRunData();
    this.getJobData();
    this.getFlowData();

    const self = this;
    this.apiStore.$subscribe(() => {
      if (self.apiStore.isLive) {
        setTimeout(this.createInterval, 5000);
      } else {
        self.clearInterval();
      }
    });
  },
  unmounted() {
    this.clearInterval();
  },
  computed: {
    runId() {
      return this.$route.params.runId;
    },
    runEnd() {
      return _.get(this.rawRunData, "end");
    },
    runFlowCount() {
      return _.get(this.rawFlowData, "count");
    },
    runStatus() {
      return _.get(this.rawRunData, "status");
    },
    runStart() {
      return _.get(this.rawRunData, "start");
    },
    jobId() {
      return this.$route.params.jobId;
    },
    jobName() {
      return _.get(this.rawJobData, "name");
    },
  },
  methods: {
    getRunData() {
      const url = new URL(this.apiStore.run);
      url.searchParams.append("id", this.runId);
      axios
        .get(url.href)
        .then((response) => (this.rawRunData = response.data[0]));
    },
    getJobData() {
      const url = new URL(this.apiStore.job);
      url.searchParams.append("id", this.jobId);
      axios
        .get(url.href)
        .then((response) => (this.rawJobData = response.data[0]));
    },
    getFlowData() {
      const url = new URL(this.apiStore.runFlow);
      url.searchParams.append("id", this.runId);
      url.searchParams.append("jq", '.[] | select(.label == "source_count")');
      axios
        .get(url.href)
        .then((response) => (this.rawFlowData = response.data));
    },
    getDateDiff(dateFrom, dateTo) {
      var from = moment(dateFrom || moment());
      var to = moment(dateTo);
      return from.from(to, true).split(" ");
    },
    clearInterval() {
      if (this.liveIntervalId) {
        for (var id of this.liveIntervalId) {
          window.clearInterval(id);
        }
      }
    },
    createInterval() {
      if (_.get(this.rawRunData, "status") === "running") {
        this.liveIntervalId.push(window.setInterval(this.getRunData, 5000));
        this.liveIntervalId.push(window.setInterval(this.getJobData, 5000));
        this.liveIntervalId.push(window.setInterval(this.getFlowData, 5000));
      } else {
        this.clearInterval();
      }
    },
  },
  watch: {
    rawJobData() {
      useTitle(`${this.jobName} #${this.runId} | Echelon`);
    },
  },
};
</script>

<template>
  <div class="min-h-screen p-4 dark:bg-background-darker sm:ml-64">
    <div class="mb-4 flex h-fit items-center">
      <RunBread
        :jobName="jobName"
        :jobId="jobId"
        :runId="runId"
        v-if="jobName && jobId && runId"
      />
    </div>
    <div class="mb-4 grid grid-cols-3 gap-4">
      <div class="flex h-fit items-center justify-center rounded">
        <KpiCard
          title="Runtime"
          :value="getDateDiff(runEnd, runStart)[0]"
          :unit="getDateDiff(runEnd, runStart)[1]"
          v-if="runStart"
        />
      </div>
      <div class="flex h-fit items-center justify-center rounded">
        <KpiCard title="Status" :value="runStatus" unit="" v-if="runStatus" />
      </div>
      <div class="flex h-fit items-center justify-center rounded">
        <KpiCard
          title="Jobed"
          :value="runFlowCount"
          unit="records"
          v-if="runFlowCount"
        />
      </div>
    </div>
    <div class="mb-4 flex h-fit items-center justify-center rounded">
      <RunLogTable :runId="runId" :runStatus="runStatus" v-if="runStatus" />
    </div>
    <div class="mb-4 flex h-fit items-center justify-center rounded">
      <RunFlowTable :runId="runId" :runStatus="runStatus" v-if="runStatus" />
    </div>
  </div>
</template>
