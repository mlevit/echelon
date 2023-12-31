<script setup>
import DetailCard from "@/components/DetailCard.vue";
import JobFieldMap from "@/components/JobFieldMap.vue";
import JobBread from "@/components/JobBread.vue";
import JobConstantTable from "@/components/JobConstantTable.vue";
import JobLineage from "@/components/JobLineage.vue";
import JobSourceTable from "@/components/JobSourceTable.vue";
import JobTargetTable from "@/components/JobTargetTable.vue";
import RunChart from "@/components/RunChart.vue";
import RunListTable from "@/components/RunListTable.vue";
import SvgIcon from "@/components/SvgIcon.vue";

import { useApiStore } from "@/stores/api";
import { useTitle } from "@vueuse/core";

import axios from "axios";
import _ from "lodash";
import moment from "moment";
</script>

<script>
export default {
  data() {
    return { apiStore: useApiStore(), rawJobData: {} };
  },
  async created() {
    this.getData();
  },
  computed: {
    detailsObject() {
      return [
        { title: "Description", value: this.jobDescription },
        { title: "Type", value: this.jobType },
        { title: "Priority", value: this.jobPriority },
        { title: "Dependency Logic", value: this.jobDependencyLogic },
      ];
    },
    jobId() {
      return this.$route.params.jobId;
    },
    jobDescription() {
      return _.get(this.rawJobData, "description");
    },
    jobDependencyLogic() {
      return _.get(this.rawJobData, "dependency_logic");
    },
    jobName() {
      return _.get(this.rawJobData, "name");
    },
    jobPriority() {
      return _.get(this.rawJobData, "priority");
    },
    jobType() {
      return _.get(this.rawJobData, "type");
    },
    statsObject() {
      return [
        { title: "Average Runtime", value: "10 minutes" },
        { title: "Run Frequency", value: "12 hours" },
        { title: "Average Entries Processed", value: "12312" },
      ];
    },
  },
  methods: {
    getData() {
      const url = new URL(this.apiStore.job);
      url.searchParams.append("id", this.jobId);
      axios
        .get(url.href)
        .then((response) => (this.rawJobData = response.data[0]));
    },
    getDateDiff(dateFrom, dateTo) {
      var from = moment(dateFrom || moment());
      var to = moment(dateTo);
      return from.from(to, true).split(" ");
    },
  },
  watch: {
    rawJobData() {
      useTitle(`${this.jobName} | Echelon`);
    },
  },
};
</script>

<template>
  <div
    class="min-h-[calc(100vh-56px)] px-4 py-6 dark:bg-background-darker sm:ml-64"
  >
    <div class="mb-4 flex h-fit items-center">
      <JobBread :jobName="jobName" v-if="jobName" />
    </div>
    <div class="mb-4 grid grid-cols-4 gap-4">
      <div
        class="flex h-full items-center justify-center rounded bg-background dark:bg-background-darker"
        v-for="detail of detailsObject"
        :key="detail.title"
      >
        <DetailCard :title="detail.title" :value="detail.value" />
      </div>
    </div>
    <!-- <div class="mb-4 grid grid-cols-4 gap-4">
      <div class="flex h-full items-center justify-center rounded bg-background dark:bg-background-darker">
        <DetailCard title="Description" :value="data.description" v-if="data.description" />
      </div>
      <div class="flex h-full items-center justify-center rounded bg-background dark:bg-background-darker">
        <DetailCard title="Type" :value="data.type" v-if="data.type" />
      </div>
      <div class="flex h-full items-center justify-center rounded bg-background dark:bg-background-darker">
        <DetailCard title="Priority" :value="data.priority" v-if="data.priority" />
      </div>
      <div class="flex h-full items-center justify-center rounded bg-background dark:bg-background-darker">
        <DetailCard
          title="Dependency Logic"
          :value="data.dependency_logic"
          v-if="data.dependency_logic"
        />
      </div>
    </div> -->
    <div class="mb-4 grid grid-cols-9 gap-4">
      <div class="col-span-4 flex h-full justify-center rounded">
        <JobSourceTable :jobName="rawJobData.name" v-if="rawJobData.name" />
      </div>
      <div class="flex h-full items-center justify-center pt-[46px]">
        <p class="text-2xl text-gray-400 dark:text-gray-500">
          <SvgIcon icon="chevronRight" />
        </p>
      </div>
      <div class="col-span-4 flex h-full justify-center rounded">
        <JobTargetTable :jobName="rawJobData.name" v-if="rawJobData.name" />
      </div>
    </div>
    <div class="mb-4 flex h-full items-center justify-center">
      <JobFieldMap :jobName="rawJobData.name" v-if="rawJobData.name" />
    </div>
    <div class="mb-4 flex h-full items-center justify-center">
      <JobConstantTable :jobName="rawJobData.name" v-if="rawJobData.name" />
    </div>
    <div class="mb-4 flex h-fit items-center justify-center">
      <JobLineage
        :jobName="rawJobData.name"
        :jobId="jobId"
        v-if="rawJobData.name"
      />
    </div>
    <div class="grid w-full gap-y-4 dark:bg-background-darker">
      <div>
        <h6 class="text-lg font-bold dark:text-textPrimary-dark">Runs</h6>
      </div>
      <div class="mb-4 flex h-fit items-center justify-center rounded">
        <RunChart :jobName="rawJobData.name" v-if="rawJobData.name" />
      </div>
      <div class="mb-4 flex h-fit items-center justify-center rounded">
        <RunListTable :jobName="rawJobData.name" v-if="rawJobData.name" />
      </div>
    </div>
  </div>
</template>
