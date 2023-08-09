<script setup>
import ArtefactBread from "@/components/ArtefactBread.vue";
import ArtefactConstantTable from "@/components/ArtefactConstantTable.vue";
import ArtefactLineage from "@/components/ArtefactLineage.vue";
import ArtefactSourceTable from "@/components/ArtefactSourceTable.vue";
import ArtefactTargetTable from "@/components/ArtefactTargetTable.vue";
import AttributeListTable from "@/components/AttributeListTable.vue";
import DetailCard from "@/components/DetailCard.vue";
import SvgIcon from "@/components/SvgIcon.vue";

import { useApiStore } from "@/stores/api";
import { useTitle } from "@vueuse/core";

import axios from "axios";
import { initFlowbite } from "flowbite";
import _ from "lodash";
</script>

<script>
export default {
  data() {
    return { apiStore: useApiStore(), runData: {}, rawArtefactData: {} };
  },
  created() {
    this.getArtefactData();
  },
  mounted() {
    // initFlowbite()
  },
  computed: {
    artefactId() {
      return this.$route.params.artefactId;
    },
    artefactName() {
      return _.get(this.rawArtefactData, "name");
    },
    artefactDescription() {
      return _.get(this.rawArtefactData, "description");
    },
    artefactType() {
      return _.get(this.rawArtefactData, "type");
    },
    artefactSource() {
      return _.get(this.rawArtefactData, "source");
    },
  },
  methods: {
    getArtefactData() {
      const url = new URL(this.apiStore.artefact);
      url.searchParams.append("id", this.artefactId);
      axios
        .get(url.href)
        .then((response) => (this.rawArtefactData = response.data[0]));
    },
  },
  watch: {
    rawArtefactData() {
      useTitle(`${this.artefactName} | Echelon`);
    },
  },
};
</script>

<template>
  <div class="min-h-screen px-4 py-6 dark:bg-gray-900 sm:ml-64">
    <div class="mb-4 flex h-fit items-center">
      <ArtefactBread :artefactName="artefactName" v-if="artefactName" />
    </div>
    <div class="mb-4 grid grid-cols-3 gap-4">
      <div
        class="flex h-full items-center justify-center rounded bg-gray-50 dark:bg-gray-800"
      >
        <DetailCard title="Description" :value="artefactDescription" />
      </div>
      <div
        class="flex h-full items-center justify-center rounded bg-gray-50 dark:bg-gray-800"
      >
        <DetailCard title="Type" :value="artefactType" />
      </div>
      <div
        class="flex h-full items-center justify-center rounded bg-gray-50 dark:bg-gray-800"
      >
        <DetailCard title="Source" :value="artefactSource" />
      </div>
    </div>
    <div class="mb-4 flex h-full items-center justify-center">
      <AttributeListTable :artefactName="artefactName" v-if="artefactName" />
    </div>
    <div class="mb-4 flex h-full items-center justify-center">
      <ArtefactConstantTable :artefactName="artefactName" v-if="artefactName" />
    </div>
    <div class="mb-4 grid grid-cols-9 gap-4">
      <div class="col-span-4 flex h-full justify-center rounded">
        <ArtefactTargetTable :artefactId="artefactId" v-if="artefactId" />
      </div>
      <div class="flex h-full items-center justify-center pt-[46px]">
        <p class="text-2xl text-gray-400 dark:text-gray-500">
          <SvgIcon icon="chevronRight" />
        </p>
      </div>
      <div class="col-span-4 flex h-full justify-center rounded">
        <ArtefactSourceTable :artefactId="artefactId" v-if="artefactId" />
      </div>
    </div>
    <div class="mb-4 flex h-fit items-center justify-center">
      <ArtefactLineage
        :artefactName="artefactName"
        :artefactId="artefactId"
        v-if="artefactName"
      />
    </div>
    <!-- <div class="mb-4 flex h-fit items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
      <RunList :artefactName="artefactData.name" v-if="artefactData.name" />
    </div> -->
    <!-- <div class="mb-4 flex h-48 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
        <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
          <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div class="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
          <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div class="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
          <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div class="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
          <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
      </div> -->
  </div>
</template>
