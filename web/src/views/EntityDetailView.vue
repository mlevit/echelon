<script setup>
import EntityBread from "@/components/EntityBread.vue";
import EntityConstantTable from "@/components/EntityConstantTable.vue";
import EntityLineage from "@/components/EntityLineage.vue";
import EntitySourceTable from "@/components/EntitySourceTable.vue";
import EntityTargetTable from "@/components/EntityTargetTable.vue";
import FieldListTable from "@/components/FieldListTable.vue";
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
    return { apiStore: useApiStore(), runData: {}, rawEntityData: {} };
  },
  created() {
    this.getEntityData();
  },
  mounted() {
    // initFlowbite()
  },
  computed: {
    entityId() {
      return this.$route.params.entityId;
    },
    entityName() {
      return _.get(this.rawEntityData, "name");
    },
    entityDescription() {
      return _.get(this.rawEntityData, "description");
    },
    entityType() {
      return _.get(this.rawEntityData, "type");
    },
    entitySource() {
      return _.get(this.rawEntityData, "source");
    },
  },
  methods: {
    getEntityData() {
      const url = new URL(this.apiStore.entity);
      url.searchParams.append("id", this.entityId);
      axios
        .get(url.href)
        .then((response) => (this.rawEntityData = response.data[0]));
    },
  },
  watch: {
    rawEntityData() {
      useTitle(`${this.entityName} | Echelon`);
    },
  },
};
</script>

<template>
  <div class="min-h-screen px-4 py-6 dark:bg-gray-900 sm:ml-64">
    <div class="mb-4 flex h-fit items-center">
      <EntityBread :entityName="entityName" v-if="entityName" />
    </div>
    <div class="mb-4 grid grid-cols-3 gap-4">
      <div
        class="flex h-full items-center justify-center rounded bg-gray-50 dark:bg-gray-800"
      >
        <DetailCard title="Description" :value="entityDescription" />
      </div>
      <div
        class="flex h-full items-center justify-center rounded bg-gray-50 dark:bg-gray-800"
      >
        <DetailCard title="Type" :value="entityType" />
      </div>
      <div
        class="flex h-full items-center justify-center rounded bg-gray-50 dark:bg-gray-800"
      >
        <DetailCard title="Source" :value="entitySource" />
      </div>
    </div>
    <div class="mb-4 flex h-full items-center justify-center">
      <FieldListTable :entityName="entityName" v-if="entityName" />
    </div>
    <div class="mb-4 flex h-full items-center justify-center">
      <EntityConstantTable :entityName="entityName" v-if="entityName" />
    </div>
    <div class="mb-4 grid grid-cols-9 gap-4">
      <div class="col-span-4 flex h-full justify-center rounded">
        <EntityTargetTable :entityId="entityId" v-if="entityId" />
      </div>
      <div class="flex h-full items-center justify-center pt-[46px]">
        <p class="text-2xl text-gray-400 dark:text-gray-500">
          <SvgIcon icon="chevronRight" />
        </p>
      </div>
      <div class="col-span-4 flex h-full justify-center rounded">
        <EntitySourceTable :entityId="entityId" v-if="entityId" />
      </div>
    </div>
    <div class="mb-4 flex h-fit items-center justify-center">
      <EntityLineage
        :entityName="entityName"
        :entityId="entityId"
        v-if="entityName"
      />
    </div>
    <!-- <div class="mb-4 flex h-fit items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
      <RunList :entityName="entityData.name" v-if="entityData.name" />
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
