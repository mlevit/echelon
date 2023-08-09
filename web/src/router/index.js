import { createRouter, createWebHistory } from "vue-router";

import ArtefactDetailView from "@/views/ArtefactDetailView.vue";
import ArtefactListView from "@/views/ArtefactListView.vue";
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
      component: ArtefactListView,
    },
    {
      path: "/data/:artefactId",
      props: true,
      name: "data-detail",
      component: ArtefactDetailView,
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
