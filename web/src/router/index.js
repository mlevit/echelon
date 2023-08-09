import { createRouter, createWebHistory } from "vue-router";

import EntityDetailView from "@/views/EntityDetailView.vue";
import EntityListView from "@/views/EntityListView.vue";
import RunDetailView from "@/views/RunDetailView.vue";
import RunListView from "@/views/RunListView.vue";
import DashboardView from "@/views/DashboardView.vue";
import JobDetailView from "@/views/JobDetailView.vue";
import JobListView from "@/views/JobListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/data",
      name: "data-list",
      component: EntityListView,
    },
    {
      path: "/data/:entityId",
      props: true,
      name: "data-detail",
      component: EntityDetailView,
    },
    {
      path: "/job",
      name: "job-list",
      component: JobListView,
    },
    {
      path: "/job/:jobId",
      props: true,
      name: "job-detail",
      component: JobDetailView,
    },
    {
      path: "/run",
      name: "run-list",
      component: RunListView,
    },
    {
      path: "/job/:jobId/run/:runId",
      props: true,
      name: "run-detail",
      component: RunDetailView,
    },
  ],
});

export default router;
