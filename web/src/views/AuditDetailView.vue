<script setup>
import AuditBread from "@/components/AuditBread.vue";
import AuditFlowTable from "@/components/AuditFlowTable.vue";
import AuditLogTable from "@/components/AuditLogTable.vue";
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
      rawAuditData: null,
      rawFlowData: {},
      rawProcessData: {},
    };
  },
  created() {
    this.getAuditData();
    this.getProcessData();
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
    auditId() {
      return this.$route.params.auditId;
    },
    auditEnd() {
      return _.get(this.rawAuditData, "end");
    },
    auditFlowCount() {
      return _.get(this.rawFlowData, "count");
    },
    auditStatus() {
      return _.get(this.rawAuditData, "status");
    },
    auditStart() {
      return _.get(this.rawAuditData, "start");
    },
    processId() {
      return this.$route.params.processId;
    },
    processName() {
      return _.get(this.rawProcessData, "name");
    },
  },
  methods: {
    getAuditData() {
      const url = new URL(this.apiStore.processAudit);
      url.searchParams.append("id", this.auditId);
      axios
        .get(url.href)
        .then((response) => (this.rawAuditData = response.data[0]));
    },
    getProcessData() {
      const url = new URL(this.apiStore.process);
      url.searchParams.append("id", this.processId);
      axios
        .get(url.href)
        .then((response) => (this.rawProcessData = response.data[0]));
    },
    getFlowData() {
      const url = new URL(this.apiStore.processAuditFlow);
      url.searchParams.append("id", this.auditId);
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
      if (_.get(this.rawAuditData, "status") === "running") {
        this.liveIntervalId.push(window.setInterval(this.getAuditData, 5000));
        this.liveIntervalId.push(window.setInterval(this.getProcessData, 5000));
        this.liveIntervalId.push(window.setInterval(this.getFlowData, 5000));
      } else {
        this.clearInterval();
      }
    },
  },
  watch: {
    rawProcessData() {
      useTitle(`${this.processName} #${this.auditId} | Echelon`);
    },
  },
};
</script>

<template>
  <div class="min-h-screen p-4 dark:bg-gray-900 sm:ml-64">
    <div class="mb-4 flex h-fit items-center">
      <AuditBread
        :processName="processName"
        :processId="processId"
        :auditId="auditId"
        v-if="processName && processId && auditId"
      />
    </div>
    <div class="mb-4 grid grid-cols-3 gap-4">
      <div class="flex h-fit items-center justify-center rounded">
        <KpiCard
          title="Runtime"
          :value="getDateDiff(auditEnd, auditStart)[0]"
          :unit="getDateDiff(auditEnd, auditStart)[1]"
          v-if="auditStart"
        />
      </div>
      <div class="flex h-fit items-center justify-center rounded">
        <KpiCard
          title="Status"
          :value="auditStatus"
          unit=""
          v-if="auditStatus"
        />
      </div>
      <div class="flex h-fit items-center justify-center rounded">
        <KpiCard
          title="Processed"
          :value="auditFlowCount"
          unit="records"
          v-if="auditFlowCount"
        />
      </div>
    </div>
    <div class="mb-4 flex h-fit items-center justify-center rounded">
      <AuditLogTable
        :auditId="auditId"
        :auditStatus="auditStatus"
        v-if="auditStatus"
      />
    </div>
    <div class="mb-4 flex h-fit items-center justify-center rounded">
      <AuditFlowTable
        :auditId="auditId"
        :auditStatus="auditStatus"
        v-if="auditStatus"
      />
    </div>
  </div>
</template>
