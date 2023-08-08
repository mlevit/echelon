<script setup>
import ProcessAttributeMap from "@/components/ProcessAttributeMap.vue";
import AuditChart from "@/components/AuditChart.vue";
import DetailCard from "@/components/DetailCard.vue";
import ProcessAuditListTable from "@/components/ProcessAuditListTable.vue";
import ProcessBread from "@/components/ProcessBread.vue";
import ProcessConstantTable from "@/components/ProcessConstantTable.vue";
import ProcessLineage from "@/components/ProcessLineage.vue";
import ProcessSourceTable from "@/components/ProcessSourceTable.vue";
import ProcessTargetTable from "@/components/ProcessTargetTable.vue";
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
    return { apiStore: useApiStore(), rawProcessData: {} };
  },
  async created() {
    this.getData();
  },
  computed: {
    detailsObject() {
      return [
        { title: "Description", value: this.processDescription },
        { title: "Type", value: this.processType },
        { title: "Priority", value: this.processPriority },
        { title: "Dependency Logic", value: this.processDependencyLogic },
      ];
    },
    processId() {
      return this.$route.params.processId;
    },
    processDescription() {
      return _.get(this.rawProcessData, "description");
    },
    processDependencyLogic() {
      return _.get(this.rawProcessData, "dependency_logic");
    },
    processName() {
      return _.get(this.rawProcessData, "name");
    },
    processPriority() {
      return _.get(this.rawProcessData, "priority");
    },
    processType() {
      return _.get(this.rawProcessData, "type");
    },
    statsObject() {
      return [
        { title: "Average Runtime", value: "10 minutes" },
        { title: "Run Frequency", value: "12 hours" },
        { title: "Average Records Processed", value: "12312" },
      ];
    },
  },
  methods: {
    getData() {
      const url = new URL(this.apiStore.process);
      url.searchParams.append("id", this.processId);
      axios
        .get(url.href)
        .then((response) => (this.rawProcessData = response.data[0]));
    },
    getDateDiff(dateFrom, dateTo) {
      var from = moment(dateFrom || moment());
      var to = moment(dateTo);
      return from.from(to, true).split(" ");
    },
  },
  watch: {
    rawProcessData() {
      useTitle(`${this.processName} | Echelon`);
    },
  },
};
</script>

<template>
  <div class="min-h-screen px-4 py-6 dark:bg-gray-900 sm:ml-64">
    <div class="mb-4 flex h-fit items-center">
      <ProcessBread :processName="processName" v-if="processName" />
    </div>
    <div class="mb-4 grid grid-cols-4 gap-4">
      <div
        class="flex h-full items-center justify-center rounded bg-gray-50 dark:bg-gray-800"
        v-for="detail of detailsObject"
        :key="detail.title"
      >
        <DetailCard :title="detail.title" :value="detail.value" />
      </div>
    </div>
    <!-- <div class="mb-4 grid grid-cols-4 gap-4">
      <div class="flex h-full items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
        <DetailCard title="Description" :value="data.description" v-if="data.description" />
      </div>
      <div class="flex h-full items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
        <DetailCard title="Type" :value="data.type" v-if="data.type" />
      </div>
      <div class="flex h-full items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
        <DetailCard title="Priority" :value="data.priority" v-if="data.priority" />
      </div>
      <div class="flex h-full items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
        <DetailCard
          title="Dependency Logic"
          :value="data.dependency_logic"
          v-if="data.dependency_logic"
        />
      </div>
    </div> -->
    <div class="mb-4 grid grid-cols-9 gap-4">
      <div class="col-span-4 flex h-full justify-center rounded">
        <ProcessSourceTable
          :processName="rawProcessData.name"
          v-if="rawProcessData.name"
        />
      </div>
      <div class="flex h-full items-center justify-center pt-[46px]">
        <p class="text-2xl text-gray-400 dark:text-gray-500">
          <SvgIcon icon="chevronRight" />
        </p>
      </div>
      <div class="col-span-4 flex h-full justify-center rounded">
        <ProcessTargetTable
          :processName="rawProcessData.name"
          v-if="rawProcessData.name"
        />
      </div>
    </div>
    <div class="mb-4 flex h-full items-center justify-center">
      <ProcessAttributeMap
        :processName="rawProcessData.name"
        v-if="rawProcessData.name"
      />
    </div>
    <div class="mb-4 flex h-full items-center justify-center">
      <ProcessConstantTable
        :processName="rawProcessData.name"
        v-if="rawProcessData.name"
      />
    </div>
    <div class="mb-4 flex h-fit items-center justify-center">
      <ProcessLineage
        :processName="rawProcessData.name"
        :processId="processId"
        v-if="rawProcessData.name"
      />
    </div>
    <div class="grid w-full gap-y-4 dark:bg-gray-900">
      <div>
        <h6 class="text-lg font-bold dark:text-white">Runs</h6>
      </div>
      <div class="mb-4 flex h-fit items-center justify-center rounded">
        <AuditChart
          :processName="rawProcessData.name"
          v-if="rawProcessData.name"
        />
      </div>
      <div class="mb-4 flex h-fit items-center justify-center rounded">
        <ProcessAuditListTable
          :processName="rawProcessData.name"
          v-if="rawProcessData.name"
        />
      </div>
    </div>
  </div>
</template>
